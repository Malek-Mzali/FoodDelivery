import React, {useEffect} from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import AppForm from "../components/forms/AppForm";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import * as yup from "yup";
import AppFormFeilds from "../components/forms/AppFormFeilds";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import tailwind from "tailwind-react-native-classnames";
import {loginUser, logoutUser, selectUser} from "../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";




const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});


function LoginScreenUser({ navigation }) {
  var dispatch = useDispatch()

  function LoginUser({ email, password }){

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
      const user = userCredential.user;

      dispatch(loginUser(user))
    }).catch((error) => {
      if (error.code === "auth/invalid-password") {
        Alert.alert("Error", "Invalid password!");
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "That email address is invalid!");
      }
      Alert.alert("ERROR: ", error.message);
    })
  }


  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={tailwind`py-4 rounded-2xl`}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.wellcomeTo}>
          Login to Cmandi <Text style={styles.brand}>Food</Text>
        </Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ email: "test@test.com", password: "testtest" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              LoginUser(values)

            }}
          >
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
            <AppSubmitButton title="Login" />
          </AppForm>
        </View>

        <Text style={styles.join}>
          Not a member?{" "}
          <Text
            onPress={() => navigation.navigate("Signup")}
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
    marginTop: 16,
    textAlign: "center",
    color: colors.black,
  },
  or: {
    color: colors.gray,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default LoginScreenUser;
