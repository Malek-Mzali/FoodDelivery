import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Table, Row, Rows } from "react-native-table-component-2";
export default class AccordianFeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      tableHead: ["Head", "Data"],
      tableData: [
        ["Satisfaction", props.satisfaction],
        ["Message", props.message],
      ],
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}
        >
          <Text style={[styles.title, styles.font]}>{this.props.username}</Text>
          <Icon
            name={
              this.state.expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
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
          </View>
        )}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "#eee",
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
