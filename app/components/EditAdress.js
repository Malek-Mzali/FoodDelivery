import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { addHome, addWork, selectAdress } from "../redux/slices/AdressSlice";

const EditAdress = ({ setModalVisible }) => {
  const adress = useSelector(selectAdress);
  const dispatch = useDispatch();

  const [home, setHome] = useState(adress.home);
  const [work, setWork] = useState(adress.work);

  return (
    <View style={tailwind`flex-1 bg-black bg-opacity-40`}>
      <TouchableOpacity
    style={styles.page}
    onPress={() => setModalVisible(false)}
    />
      <View style={tailwind`flex-1 bg-white flex-grow`}>
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>Home Address</Text>
          <TextInput
            style={styles.input}
            placeholder={adress.home}
            onChangeText={(text) => setHome(text)}
            value={home}
          />
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>Work Address</Text>
          <TextInput
            style={styles.input}
            placeholder={adress.work}
            onChangeText={(text) => setWork(text)}
            value={work}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(addHome(home)),
              dispatch(addWork(work)),
              ToastAndroid.show("Updated Successfully", ToastAndroid.SHORT);
            setModalVisible(false);
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 7,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    width: "92%",
    padding: 2,
  },
  page: {
    height: "33%",
    flex: 0,
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
    padding: 15,
    marginTop: "30%",
    backgroundColor: "black",
    alignSelf: "center",
    fontSize: 16,
  },
});
export default EditAdress;
