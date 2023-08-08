import React, { Component } from "react";
import { db } from "../configs/firebase";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity, Platform,
} from "react-native";
import Accordian from "../components/Accordion";
import {collection, getDocs, orderBy, query} from "firebase/firestore";

export default class ConsultOrdersScreen extends Component {
  constructor({ route, navigation }) {
    super();
    this.navigation = navigation;
    this.route = route;
  }

  state = {
    orders: [],
  };

  componentDidMount() {
    const orders = [];

    const orderedQuery = query(collection(db, "orders"), orderBy('time', 'desc'));

    getDocs(orderedQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (typeof this.route.params === "undefined") {
            orders.push({
              id: doc.data().id,
              title: doc.data().username,
              data: {
                email: doc.data().email,
                phone: doc.data().phone,
                adress: doc.data().Adress,
                hand: doc.data().hand,
                state: doc.data().state,
                order: doc.data().items,
                Date: doc.data().time,
              },
            });
          } else {
            doc.data().items.forEach((element) => {
              if (
                this.route.params.deliverer.restaurantName.toLowerCase() ===
                element.resName.toLowerCase()
              ) {
                orders.push({
                  id: doc.data().id,
                  title: doc.data().username,
                  data: {
                    email: doc.data().email,
                    phone: doc.data().phone,
                    adress: doc.data().Adress,
                    hand: doc.data().hand,
                    state: doc.data().state,
                    order: doc.data().items,
                    Date: doc.data().time,
                  },
                });
              }
            });
          }
        });
      })
      .then(() => {
        const items = [];

        orders.forEach((element, i) => {

          var x = [];
          element.data.order.map((element, i) => {
            x.push({ [element.resName]: [] });
            element.foods.map((food, j) => {
              x[i][element.resName].push(food.title);
            });
          });
          items.push(
            <Accordian
              key={i}
              id={element.id}
              title={element.title}
              email={element.data.email}
              phone={element.data.phone}
              adress={element.data.adress}
              hand={element.data.hand}
              state={element.data.state}
              del={typeof this.route.params !== "undefined"}
              order={x}
              Date={element.data.Date}
            />
          );
        });

        this.setState({
          Completed: items.filter((data) => {
            return data.props.state.includes("completed");
          }),
          Pending: items.filter((data) => {
            return data.props.state.includes("pending");
          }),
          All: items,
          Print: items,
        });
      });
  }
  FilterBy({ type }) {
    if (type === "Completed") {
      this.setState({ Print: this.state.Completed });
    } else if (type === "Pending") {
      this.setState({ Print: this.state.Pending });
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
          Consult Orders
        </Text>
        <View style={{marginTop: 40, marginBottom: 20}}/>
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
              onPress={() => this.FilterBy({ type: "All" })}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.button}
              onPress={() => this.FilterBy({ type: "Pending" })}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.button}
              onPress={() => this.FilterBy({ type: "Completed" })}
            >
              Completed
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
