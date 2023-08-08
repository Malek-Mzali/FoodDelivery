import {
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ToastAndroid, ScrollView,
} from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CheckBox } from "react-native-elements";
import AppButton from "../components/AppButton";
import { auth, db } from "../configs/firebase";
import {doc, setDoc} from "firebase/firestore";

function sendFeedback(props) {
    setDoc(doc(db, "Feedback", auth.currentUser.uid),
      {
        Satisfaction: props.xx,
        Message: props.textV,
        Username: auth.currentUser.displayName,
      },
      { merge: true }
    )
    .then((result) => {
      ToastAndroid.showWithGravity(
        "Feedback sent",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    });
}

export default function Feedback({ navigation }) {
  const [textV, onChangeText] = React.useState("");

  const [vsat, setVsat] = React.useState(false);
  const [sat, setSat] = React.useState(false);
  const [nn, setNn] = React.useState(false);
  const [dis, setDis] = React.useState(false);
  const [vdis, setVdis] = React.useState(false);

  const typeVsat = () => {
    setVsat(true);
    setSat(false);
    setNn(false);
    setDis(false);
    setVdis(false);
  };
  const typesat = () => {
    setVsat(false);
    setSat(true);
    setNn(false);
    setDis(false);
    setVdis(false);
  };
  const typeNn = () => {
    setVsat(false);
    setSat(false);
    setNn(true);
    setDis(false);
    setVdis(false);
  };
  const typeDis = () => {
    setVsat(false);
    setSat(false);
    setNn(false);
    setDis(true);
    setVdis(false);
  };
  const typeVdis = () => {
    setVsat(false);
    setSat(false);
    setNn(false);
    setDis(false);
    setVdis(true);
  };

  var xx = "";

  if (vsat) {
    xx = "Very Satisfied";
  }
  if (sat) {
    xx = "Satisfied";
  }
  if (nn) {
    xx = "Neutral";
  }
  if (dis) {
    xx = "Disatisfied";
  }
  if (vdis) {
    xx = "Very Disatisfied";
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Text
        style={{
          fontSize: 21,
          fontWeight: "bold",
          alignSelf: "center",
          top: 20,
        }}
      >
        Feedback
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Home")}
      >
        <FontAwesome5
          name="arrow-left"
          size={22}
          style={{
            left: 20,
          }}
        />
      </TouchableOpacity>
        <ScrollView>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
          Overall , how did you feel about the service ?
        </Text>
        <View style={{ marginTop: 10 }}>
          <CheckBox
            title="Very Satisfied"
            checked={vsat}
            checkedIcon={"dot-circle-o"}
            Color="black"
            uncheckedIcon="circle-o"
            onPress={typeVsat}
          />
          <CheckBox
            title="Satisfied"
            checked={sat}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon="circle-o"
            onPress={typesat}
          />
          <CheckBox
            title="Neither Satisfied nor Dissatisfied"
            checked={nn}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon="circle-o"
            onPress={typeNn}
          />
          <CheckBox
            title="Dissatisfied"
            checked={dis}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon="circle-o"
            onPress={typeDis}
          />
          <CheckBox
            title="Very Dissatisfied"
            checked={vdis}
            checkedIcon={"dot-circle-o"}
            uncheckedIcon="circle-o"
            onPress={typeVdis}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 40,
            }}
          >
            How could we improve our services ?
          </Text>
          <TextInput
            style={{
              height: 160,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              textAlignVertical: "top",
            }}
            onChangeText={onChangeText}
            value={textV}
            multiline
          />
          <Text style={{ marginLeft: 10 }}>Character limit : 1200</Text>
          <Text style={{ marginLeft: 10 }}>
            Please don't include any financial information !! for example your
            credit card number
          </Text>
        </View>
        <View style={{ alignSelf: "center", width: "50%", marginTop: 70 }}>
          <AppButton
            title={"Send"}
            onPress={() => {
              sendFeedback({ textV, xx }), navigation.navigate("Home");
            }}
          />

          <Image
            source={require("../assets/images/feedback.gif")}
            style={{
              height: 200,
              width: 200,
              marginTop: 60,
              alignSelf: "center",
            }}
          />
        </View>

      </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
