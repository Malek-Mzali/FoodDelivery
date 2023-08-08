import React, {useState} from "react";
import {Alert, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View,} from "react-native";
import tailwind from "tailwind-react-native-classnames";
import {auth, db} from "../configs/firebase";
import Loader from "./Loader";


const EditUser = ({setModalVisible, props}) => {

    const [load, setLoad] = useState(false);

    const [name, setName] = useState(props.title);
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [password, setPassword] = useState(props.password);
    const [home, setHome] = useState(props.home);
    const [work, setWork] = useState(props.work);

    const [restaurantID, setRestaurantID] = useState(props.restaurantID);
    const [restaurantName, setRestaurantName] = useState(props.restaurantName);

    const changingRestaurantID = (id) => {
        const YELP_API_KEY =
            "X6Lusgt0QnnwQe_Xg6YfePxdOn7GFiQ8kMHxeKBklO2mMnXTM_dRkCCzdt98FFlS_qmOBNmmJcMdTJGKo8Mb9buQgzO4Fz0Mtt9DS3MZe8Md6zUCxrWe7wUsW81aYnYx";

        const yelpUrl = `https://api.yelp.com/v3/businesses/${id}`;

        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        };
        fetch(yelpUrl, apiOptions)
            .then((res) => res.json())
            .then((json) => {
                if (json.name === undefined) {
                    setRestaurantName("undefined")

                } else {
                    setRestaurantName(json.name)
                }
            })
    }

    const UpdateUser = () =>
    {
        setLoad(true)
        const Url = `https://cmand-food.herokuapp.com/user/update?uid=${props.Id}&email=${email}&phone=${phone}&password=${password}&name=${name}`;
        const apiOptions = {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
            },
        };
        fetch(Url, apiOptions)
            .then(response => response.json())
            .then(json => {
                if (json !== true) {
                    Alert.alert("Error :" + json.message)
                    setLoad(false)

                } else {
                    if(props.role === "user"){
                        db.collection("users").doc(props.Id).set(
                            {
                                Id: props.Id,
                                Username: name,
                                Email: email,
                                Password: password,
                                Phone: phone,
                                Home: home,
                                Work: work,
                                role: props.role,
                            },
                            {merge: true}
                        ).then(() => {
                            setModalVisible(false)
                            setLoad(false)
                            ToastAndroid.show("Update Successfully", ToastAndroid.SHORT)
                        })
                    }else{
                        db.collection("users").doc(props.Id).set(
                            {
                                Id: props.Id,
                                RestaurantId: restaurantID,
                                RestaurantName: restaurantName,
                                Username: name,
                                Email: email,
                                Password: password,
                                Phone: phone,
                                Home: home,
                                Work: work,
                                role: props.role,
                            },
                            {merge: true}
                        ).then(() => {
                            setModalVisible(false)
                            setLoad(false)
                            ToastAndroid.show("Update Successfully", ToastAndroid.SHORT)
                        })
                    }


                }
            })

    }

    return (
        <View style={tailwind`flex-1 bg-black bg-opacity-40`}>
            <Loader loading={load} />
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(false)
                }}
                style={styles.page}
            />
            <ScrollView>
                <View style={tailwind`flex-1 bg-white flex-grow`}>
                    <View style={{marginTop: 20, marginLeft: 20}}>
                        <Text style={{fontWeight: "bold", fontSize: 14}}>ID</Text>
                        <TextInput
                            style={styles.input}
                            value={props.Id}
                            editable={false}
                        />

                        <Text style={{fontWeight: "bold", fontSize: 14}}>USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            placeholder={props.title==="" ? "e.g John Doe" : props.title}
                            onChangeText={(text) => setName(text)}
                        />
                        <Text style={{fontWeight: "bold", fontSize: 14}}>E-MAIL</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={props.email}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <Text style={{fontWeight: "bold", fontSize: 14}}>PASSWORD</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={props.password}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                        />
                        <Text style={{fontWeight: "bold", fontSize: 14}}>PHONE NUMBER</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={props.phone==="" ? "e.g +21690000001" : props.phone}
                            keyboardType="phone-pad"
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                        />
                        <Text style={{fontWeight: "bold", fontSize: 14}}>HOME ADDRESS</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={props.home}
                            onChangeText={(text) => setHome(text)}
                            value={home}
                        />
                        <Text style={{fontWeight: "bold", fontSize: 14}}>WORK ADDRESS</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={props.work}
                            onChangeText={(text) => setWork(text)}
                            value={work}
                        />
                        {props.role === "deliverer" ? (<View>
                            <Text style={{fontWeight: "bold", fontSize: 14}}>RESTAURANT ID</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={props.restaurantID}
                                onChangeText={(text) => {
                                    setRestaurantID(text);
                                    changingRestaurantID(text)
                                }}
                                value={restaurantID}

                            />
                            <Text style={{fontWeight: "bold", fontSize: 14}}>RESTAURANT NAME</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={props.restaurantName}
                                value={restaurantName}
                                editable={false}
                            />
                        </View>) : (<></>)}
                    </View>
                    <TouchableOpacity
                        disabled={(restaurantName === "undefined" && props.role === "deliverer" || email === "" || password === "" ) || (props.role === "user" && email === "" || password === "")}
                        style={{
                            borderRadius: 10,
                            alignItems: "center",
                            width: "70%",
                            padding: 15,
                            marginTop: "5%",
                            marginBottom: "5%",
                            backgroundColor: ((restaurantName === "undefined" && props.role === "deliverer" || email === "" || password === "" ) || (props.role === "user" && email === "" || password === "") ? "gray" : "black"),
                            alignSelf: "center",
                            fontSize: 16,
                        }}
                        onPress={() => {
                            UpdateUser()
                        }}                    >
                        <Text  style={{color: "white", fontSize: 16}}
                        >Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: 7,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
        width: "92%",
        padding: 2,
    },
    page: {
        height: "20%",
        flex: 0,
    },

});
export default EditUser;
