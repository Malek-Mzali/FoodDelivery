import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Table, Row, Rows } from "react-native-table-component-2";
import { db } from "../configs/firebase";

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    var restaurantName = "";
    var restaurantOrder = "";

    props.order.map((element, i) => {
      restaurantName = Object.keys(element)[0];
      restaurantOrder = element[restaurantName]
        .toString()
        .split(",")
        .join("\n");
    });

    this.state = {
      expanded: false,
      state: props.state,
      tableHead: ["Head", "Data"],
      tableData: [
        ["Order Date", props.Date],
        ["Customer Email", props.email],
        ["Customer Phone", props.phone],
        ["Customer Adress", props.adress],
        ["Payment Method", props.hand ? "Hand to hand" : "Credit card"],
        ["Restaurant name", restaurantName],
        ["Orders", restaurantOrder],
      ],
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  ChnageToCompleted() {
    db.collection("orders").doc(this.props.id+";"+this.props.Date).update({
      state: "completed",
    });
    this.setState({ state: "completed" });
  }

  render() {
    return (
      <View>
        <View>
          <TouchableOpacity
            ref={this.accordian}
            style={styles.row}
            onPress={() => this.toggleExpand()}
          >
            <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
            {this.state.state === "pending" ? (
              <View
                style={{
                  backgroundColor: "#EB5353",
                  padding: 8,
                  borderRadius: 30,
                  position: "absolute",
                  right: 65,
                }}
              >
                <Text style={[styles.pending, styles.font]}>pending</Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#00C444",
                  padding: 8,
                  borderRadius: 30,
                  position: "absolute",
                  right: 55,
                }}
              >
                <Text style={[styles.pending, styles.font]}>completed</Text>
              </View>
            )}

            <Icon
              name={
                this.state.expanded
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.parentHr} />
          {this.state.expanded && (
            <View style={styles.child}>
              <View style={styles.containers}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "black" }}>
                  <Row
                    data={this.state.tableHead}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                  <Rows data={this.state.tableData} textStyle={styles.text} />
                </Table>
              </View>
              {this.props.del && this.state.state === "pending" && (
                <TouchableOpacity
                  onPress={() => this.ChnageToCompleted()}
                  style={{ alignSelf: "flex-end", marginRight: 12 }}
                >
                  <FontAwesome name="check-circle" size={40} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  pending: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "#eee",
    marginTop: 5,
  },
  parentHr: {
    height: 1,
    color: "white",
    width: "100%",
  },
  child: {
    backgroundColor: "white",
    padding: 16,
  },
  containers: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#eee" },
  text: { margin: 6 },
});
