import React from "react";
import {Alert, Image, StyleSheet, Text, ToastAndroid, View} from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import tailwind from "tailwind-react-native-classnames";
import Loader from "../components/Loader";
import {db} from "../configs/firebase";


let state = false;

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
});

function SignupScreen({ navigation }) {
  const signUpUser = async ({name, email, password}) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          state = true;
          updateProfile(auth.currentUser, {displayName: name})
              .then(async () => {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                      Id: auth.currentUser.uid,
                      Username: name,
                      Email: email,
                      Password: password,
                      Home: "",
                      Work: "",
                      Phone: "",
                      role: "user",
                    },
                    {merge: true}
                );

              }).then(() => {
            ToastAndroid.show("Signup Successfully", ToastAndroid.SHORT)
            navigation.navigate("UserLogin")
          })
              .catch((err) => {
                Alert.alert("Error", err.message);
              })
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("Error", "That email address is already in use!");
          }
          else if (error.code === "auth/invalid-email") {
            Alert.alert("Error", "That email address is invalid!");
          }else{
            Alert.alert("ERROR: ", error.message);
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
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => signUpUser(values)}
          >
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
        <Text
          style={{ marginTop: 10, textAlign: "center", color: colors.black }}
        >
          Sign Up as a deliverer  ?{" "}
          <Text
            onPress={() => navigation.navigate("DelivererSignup")}
            style={{ color: colors.denger }}
          >
            Sign Up
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

export default SignupScreen;
