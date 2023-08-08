import React, {Component, useState} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager, Alert, Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Table, Row, Rows } from "react-native-table-component-2";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {auth, db} from "../configs/firebase";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import Loader from "./Loader";
import EditUser from "../components/EditUser";





export default class AccordianUsers extends Component {
  constructor(props) {
    super(props);
    this.props = props

    if (props.role === "user") {
      this.state = {
        show:false,
        removed: false,
        expanded: false,
        tableHead: ["Head", "Data"],
        tableData: [
          ["Role", props.role],
          ["Email", props.email],
          ["Password", props.password],
          ["Phone", props.phone],
          ["Home Address", props.home],
          ["Work Address", props.work],
        ],
        loading: false,
      };
    } else {
      this.state = {
        show:false,
        removed: false,
        expanded: false,
        tableHead: ["Head", "Data"],
        tableData: [
          ["Role", props.role],
          ["Email", props.email],
          ["Password", props.password],
          ["Phone", props.phone],
          ["Home Address", props.home],
          ["Work Address", props.work],
          ["Restaurant ID", props.restaurantID],
          ["Restaurant Name", props.restaurantName],

        ],
        loading: false,
      };
    }

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  async deleteUser() {
    this.setState({loading: true})
    const Url = `https://cmand-food.herokuapp.com/user/delete?uid=${this.props.Id}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
      },
    };
    await fetch(Url, apiOptions)
        .then(response => response.json())
        .then(async json => {
          if (await json !== 'Successfully deleted user') {
            Alert.alert("Error : " + json.message)
          } else {
            await db.collection("users").doc(this.props.Id).delete().then(() => {
              this.setState({loading: false})
              ToastAndroid.show('Successfully deleted user', ToastAndroid.SHORT)
            })
          }
        })
  }

  setModalVisible = (visible) => {
    this.setState({ show : visible });
  }


  render() {

    return (
      <View>
        <View>
          <Loader
              loading={this.state.loading} />
          <TouchableOpacity
            ref={this.accordian}
            style={styles.row}
            onPress={() => this.toggleExpand()}
          >
            <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
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
              <View style={{flexDirection: "row",alignSelf:"flex-end"}}>
              <TouchableOpacity
                  onPress={() => this.deleteUser()}
                  style={{ marginRight: 12 }}
              >
                <FontAwesome name="user-times" size={40} />
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => this.setModalVisible(true)}
                  style={{ marginRight: 12 }}
              >
                <FontAwesome name="edit" size={40} />
              </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <Modal
            visible={this.state.show}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              this.setModalVisible(false);
              this.props._didmount()
            }}
        >
          <EditUser
              props={this.props}
              setModalVisible={this.setModalVisible}
          />
        </Modal>
      </View>
    )
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
