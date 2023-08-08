import React, { Component } from "react";
import { db } from "../configs/firebase";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AccordianUsers from "../components/AccordionUsers";
import { TouchableOpacity } from "react-native-gesture-handler";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";

export default class ConsultUsersScreen extends Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
  }

  state = {
    Users: [],
    Deliverers: [],
    All: [],
    Print: [],
  };
  componentDidMount() {
    const users = [];
    const innerDocRef = collection(db, "users");
    getDocs(innerDocRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((docs) => {
          if (docs.data().Email.toLowerCase() !== "topadmin@gmail.com") {
            users.push({
              id: docs.data().Id,
              username: docs.data().Username,
              email: docs.data().Email,
              password: docs.data().Password,
              phone: docs.data().Phone,
              home: docs.data().Home,
              work: docs.data().Work,
              role: docs.data().role,
              restaurantID: docs.data().RestaurantId,
              restaurantName: docs.data().RestaurantName,
            });
          }
        });
      })
      .then((a) => {
        const items = [];
        users.forEach((element, i) => {
          items.push(
            <AccordianUsers
              key={i}
              title={element.username}
              Id={element.id}
              email={element.email}
              password={element.password}
              phone={element.phone}
              home={element.home}
              work={element.work}
              role={element.role}
              restaurantID={element.restaurantID}
              restaurantName={element.restaurantName}
            />
          );
        });
        this.setState({
          Users: items.filter((data) => {
            return data.props.role.includes("user");
          }),
          Deliverers: items.filter((data) => {
            return data.props.role.includes("deliverer");
          }),
          All: items,
          Print: items,
        });
      });
  }
  FilterBy({ type }) {
    if (type === "user") {
      this.setState({ Print: this.state.Users });
    } else if (type === "deliverer") {
      this.setState({ Print: this.state.Deliverers });
    } else {
      this.setState({ Print: this.state.All });
    }
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
          Consult Users
        </Text>
        <View style={{marginTop: 40}}/>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 40,
          }}
        >
          <TouchableOpacity>
            <Text
              style={styles.button}
              onPress={() => this.FilterBy({ type: "all" })}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.button}
              onPress={() => this.FilterBy({ type: "user" })}
            >
              Users
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.button}
              onPress={() => this.FilterBy({ type: "deliverer" })}
            >
              Deliverers
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.container}>{this.state.Print}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  button: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    width: 90,
    borderRadius: 10,
    height: 24,
    textAlign: "center",
  },
});
