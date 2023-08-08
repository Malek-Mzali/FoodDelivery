import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity, Platform, Button, TextInput,
} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

export default class ManageRestaurantScreen extends Component {
  constructor({navigation }) {
    super();
    this.navigation = navigation;
  }

  state = {
    textInput : [],
    inputData : []

  }



  addTextInput = (index) => {
    let textInput = this.state.textInput;
    textInput.push(            <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
        key={index}
    >
      <TextInput
          style={styles.input}
          placeholder="Restaurant name or Id"
          onChangeText={(text) => this.addValues(text, index)}
      />
      <View style={{
        flexDirection: "row",
      }}>
        <TouchableOpacity onPress={()=>this.addTextInput(this.state.textInput.length+1)}>
          <FontAwesome5 name={"plus"} size={16} style={{ marginLeft: 22 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.removeTextInput()}>
          <FontAwesome5 name={"minus"} size={16} style={{ marginLeft: 22 }} />
        </TouchableOpacity>
      </View>

    </View>);
    this.setState({ textInput });
  }

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput,inputData });
  }

  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool){
      this.setState({
        inputData: dataArray
      });
    }
    else {
      dataArray.push({'text':text,'index':index});
      this.setState({
        inputData: dataArray
      });
    }
  }

  //function to console the output
  getValues = () => {
    console.log('Data',this.state.inputData);
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
          Manage Restaurant
        </Text>
        <View style={{marginTop: 40, marginBottom: 20}}/>
        <ScrollView>
          <View style={styles.container}>
            <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly"
                }}
                key={0}
            >
              <TextInput
                  style={styles.input}
                  placeholder="Restaurant name or Id"
                  onChangeText={(text) => this.addValues(text, 0)}
              />
              <View style={{
                flexDirection: "row",
              }}>
                <TouchableOpacity onPress={()=>this.addTextInput(this.state.textInput.length+1)}>
                  <FontAwesome5 name={"plus"} size={16} style={{ marginLeft: 22 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.removeTextInput(0)}>
                  <FontAwesome5 name={"minus"} size={16} style={{ marginLeft: 22 }} />
                </TouchableOpacity>
              </View>

            </View>
            {this.state.textInput.map((value, index) => {
              return value
            })}

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "gray",
    width: 25,
    borderRadius: 50,
    height: 24,
    textAlign: "center",
  },
  input: {
    marginTop: 7,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    width: "70%",
    padding: 2,
  },
});
