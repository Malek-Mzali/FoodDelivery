import React from "react";
import {Alert, Image, StyleSheet, Text, ToastAndroid, View} from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { auth, db } from "../configs/firebase";
import tailwind from "tailwind-react-native-classnames";

const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .max(50, ({ max }) => `Name must be less then ${max} characters`)
    .required("Name is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  restaurant: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Restaurant-id is required"),
  phone: yup.string().required("Phone number is required"),
});

function DelivererSignup({ navigation }) {
  const signUpUser = ({ phone, restaurant, name, email, password }) => {
    const YELP_API_KEY =
      "X6Lusgt0QnnwQe_Xg6YfePxdOn7GFiQ8kMHxeKBklO2mMnXTM_dRkCCzdt98FFlS_qmOBNmmJcMdTJGKo8Mb9buQgzO4Fz0Mtt9DS3MZe8Md6zUCxrWe7wUsW81aYnYx";

    const yelpUrl = `https://api.yelp.com/v3/businesses/${restaurant}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };
    fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => {
        if ("error" in json) {
          Alert.alert("Restaurant id is not valid !");
        } else {
            var restaurantName = json.name
          auth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
              result.user
                  .updateProfile({ displayName: name }).then(()=>{
                const Url = `https://cmand-food.herokuapp.com/user/setUserPhone?uid=${auth.currentUser.uid}&phone=${phone}`;
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
                          auth.currentUser.delete()
                      }else{
                        db.collection("users").doc(auth.currentUser.uid).set(
                            {
                                Id: auth.currentUser.uid,
                              RestaurantId: restaurant,
                              RestaurantName: restaurantName,
                              Username: name,
                              Email: email,
                              Password: password,
                              Phone: phone,
                              Home: "",
                              Work: "",
                              role: "deliverer",
                            },
                            { merge: true }
                        ).then(()=> {
                            ToastAndroid.show("Signup Successfully", ToastAndroid.SHORT)})
                            navigation.navigate("UserLogin")
                      }
                    })
              })
                .catch((err) => {
                  Alert.alert("Error", err.message);
                });
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                Alert.alert("Error", "That email address is already in use!");
              }

              if (error.code === "auth/invalid-email") {
                Alert.alert("Error", "That email address is invalid!");
              }

              Alert.alert("ERROR: ", error.message);
            });
        }
      });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tailwind`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Join to Cmandi <Text style={styles.brand}>Food</Text>
        </Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{
              restaurant: "",
              name: "",
              email: "",
              password: "",
              phone: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => signUpUser(values)}
          >
            <AppFormFeilds name="restaurant" placeholder="Restaurant-Id" />
            <AppFormFeilds name="name" placeholder="Your name" />
            <AppFormFeilds
              name="email"
              placeholder="Your email"
              keyboardType="email-address"
            />
            <AppFormFeilds
              name="password"
              placeholder="Password"
              autoCompleteType="off"
              password={true}
            />
            <AppFormFeilds
              name="phone"
              placeholder="Phone"
              keyboardType="numeric"
            />

            <AppSubmitButton title="Sign Up" />
          </AppForm>
        </View>

        <Text style={styles.join}>
          Already a member ?{" "}
          <Text
            onPress={() => navigation.navigate("UserLogin")}
            style={{ color: colors.denger }}
          >
            Logn In
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  logo: {
    height: 160,
    resizeMode: "contain",
    alignSelf: "center",
  },
  wellcomeTo: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.secondary,
    marginTop: 20,
    textAlign: "center",
  },
  brand: {
    fontSize: 23,
    color: colors.denger,
    textAlign: "center",
    fontWeight: "500",
  },
  form: {
    marginTop: 10,
  },
  join: {
    marginTop: 25,
    textAlign: "center",
    color: colors.black,
  },
  or: {
    color: colors.gray,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default DelivererSignup;
