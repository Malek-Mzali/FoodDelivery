import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { auth, db } from "../configs/firebase";
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import {doc, setDoc } from 'firebase/firestore';



const EditProfile = ({ setModalVisible, props }) => {
  const [name, setName] = useState(props.displayName);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phoneNumber);
  const [password, setPassword] = useState("");

  const UpdateProfile = ({ ...props }) => {
    if (props.email !== "") {

      updateEmail(auth.currentUser, props.email)
          .catch((error) => {
            Alert.alert(error.message);
          })
          .then(() => {
            setDoc(doc(db, 'users', auth.currentUser.uid), {
                  Email: props.email,
                },
                { merge: true }).then(()=>{
              setModalVisible(false);
              ToastAndroid.show("Email Updated", ToastAndroid.SHORT);
            });

          });
    }

    if (props.password !== "") {
      updatePassword(auth.currentUser,props.password)
          .catch((error) => {
            Alert.alert(error.message);
          })
          .then(() => {
            setDoc(doc(db, 'users', auth.currentUser.uid), {

                  Password: props.password,
                },
                { merge: true }
            ).then(()=>{
              setModalVisible(false);
              ToastAndroid.show("Password Updated", ToastAndroid.SHORT);
            })

          });
    }

    if (props.name !== "") {
      updateProfile(auth.currentUser,{
            displayName: props.name,
          })
          .catch((error) => {
            Alert.alert(error.message);
          })
          .then(() => {
            setDoc(doc(db, 'users', auth.currentUser.uid), {
                  Username: props.name,
                },
                { merge: true }
            ).then(()=>{
              setModalVisible(false);
              ToastAndroid.show("Username Updated", ToastAndroid.SHORT);
            })
          });


    }

    if (props.phone !== "") {
      const Url = `https://cmand-food.herokuapp.com/user/setUserPhone?uid=${auth.currentUser.uid}&phone=${props.phone}`;

      const apiOptions = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
        },
      };
      fetch(Url, apiOptions)
          .then(response => response.json())
          .then(json => {
            if (json !== true){
              Alert.alert("Error while updating phone :"+ json.message)
            }else{
              setDoc(doc(db, 'users', auth.currentUser.uid),
                  {
                    Phone: props.phone,
                  },
                  { merge: true }
              ).then(()=>{
                setModalVisible(false);
                ToastAndroid.show("Phone number updated", ToastAndroid.SHORT);
              })
            }
          })
    }
  };

  return (
    <View style={tailwind`flex-1 bg-black bg-opacity-40`}>
      <TouchableOpacity
    style={styles.page}
    onPress={() => setModalVisible(false)}
    />
      <View style={tailwind`flex-1 bg-white flex-grow`}>
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>USERNAME</Text>
          <TextInput
            style={styles.input}
            placeholder={props.displayName}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            placeholder={props.email}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}

          />
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="**********"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>PHONE NUMBER</Text>
          <TextInput
            style={styles.input}
            placeholder={props.phoneNumber==="" ? "e.g +21690000001" : props.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={(text) => setPhone(text)}
            value={phone}

          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
               await UpdateProfile({name, email, password, phone})

          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Update</Text>
        </TouchableOpacity>
      </View>
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
    height: "33%",
    flex: 0,
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
    padding: 15,
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "black",
    alignSelf: "center",
    fontSize: 16,
  },
});
export default EditProfile;
