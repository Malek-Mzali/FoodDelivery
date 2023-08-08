import React, { Component } from "react";
import {auth, db} from "../configs/firebase";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AccordianFeedBack from "../components/AccordionFeedback";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";

export default class ConsultFeedbacks extends Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
  }

  state = {
    Feedback: [],
  };

  componentDidMount() {
    const feedbacks = [];
    const innerDocRef = collection(db, "Feedback");
    getDocs(innerDocRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          feedbacks.push({
            username: doc.data().Username,
            data: {
              message: doc.data().Message,
              satisfaction: doc.data().Satisfaction,
            },
          });
        });
      })
      .then((a) => {
        const items = [];
        feedbacks.forEach((element, i) => {
          items.push(
            <AccordianFeedBack
              key={element.username}
              username={element.username}
              message={element.data.message}
              satisfaction={element.data.satisfaction}
            />
          );
        });
        this.setState({ Feedback: items });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            alignSelf: "center",
            top: 10,
          }}
        >
          Consult Feedbacks
        </Text>

        <ScrollView>
          <View style={styles.container}>{this.state.Feedback}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
