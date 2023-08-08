import { initStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../configs/colors";
import { fetchPublishableKey } from "../utils/helpers";
import tailwind from "tailwind-react-native-classnames";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectHome,
  SelectWork,
  SelectOther,
  selectAdressChoice,
} from "../redux/slices/AdressSelection";
import {selectAdress} from "../redux/slices/AdressSlice"

const PaymentScreen = ({ children }) => {
  const [home, setHome] = React.useState(false);
  const [work, setWork] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [other, setOther] = React.useState("");

  const adress = useSelector(selectAdressChoice);
  const adressData = useSelector(selectAdress);

  const dispatch = useDispatch();

  const typeHome = () => {
    setHome(true);
    setWork(false);
    setAdd(false);
    if (adressData.home !== null && adressData.home !== "") dispatch(SelectHome(true));
    else dispatch(SelectHome(false));
    dispatch(SelectWork(false));
    dispatch(SelectOther(""));
  };
  const typeWork = () => {
    setHome(false);
    setWork(true);
    setAdd(false);
    dispatch(SelectHome(false));
    if (adressData.work !== null && adressData.work !== "") dispatch(SelectWork(true));
    else dispatch(SelectWork(false));
    dispatch(SelectOther(""));
  };
  const typeAdd = () => {
    setHome(false);
    setWork(false);
    setAdd(true);
    dispatch(SelectHome(false));
    dispatch(SelectWork(false));
    if ( other !== "" && other !== null) dispatch(SelectOther(other));

  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const publishableKey = await fetchPublishableKey();
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: "merchant.com.stripe.react.native",
          urlScheme: "stripe-example",
          setUrlSchemeOnAndroid: true,
        });
        setLoading(false);
      }
    }
    initialize();
  }, []);

  return loading ? (
    <View style={tailwind`flex-1 bg-white items-center justify-center`}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {home && adressData.home || work && adressData.work || add &&  other !== "" && other !== null? children : null}
      <View>
        <Text
          style={{
            marginTop: 100,
            fontSize: 20,
            marginLeft: 10,
            fontWeight: "bold",
          }}
        >
          Saved places
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <AntDesign
            name="home"
            size={24}
            color="black"
            style={{ marginHorizontal: 20 }}
          />
          <View>
            <Text style={{ fontSize: 15 }}>Home</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>{adressData.home !== null && adressData.home !== ""  ? "Use Home Address : "+ adressData.home : "You have no home address.."}</Text>
          </View>
          <CheckBox
            checkedIcon={"dot-circle-o"}
            Color="black"
            uncheckedIcon="circle-o"
            checked={home}
            onPress={typeHome}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="md-briefcase-outline"
            size={24}
            color="black"
            style={{ marginHorizontal: 20 }}
          />

          <View >
            <Text style={{ fontSize: 15 }}>Work</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>{adressData.work !== null && adressData.work !== "" ? "Use Work Address : "+ adressData.work : "You have no work address.."}</Text>
          </View>

          <CheckBox
            checkedIcon={"dot-circle-o"}
            Color="black"
            uncheckedIcon="circle-o"
            checked={work}
            onPress={typeWork}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name={"plus"} size={16} style={{ marginLeft: 22 }} />
          <TextInput
            style={styles.input}
            onChangeText={(adressvvv) => setOther(adressvvv)}
            placeholder="Add Current Adress"
          />
          <CheckBox
            checkedIcon={"dot-circle-o"}
            Color="black"
            uncheckedIcon="circle-o"
            checked={add}
            onPress={typeAdd}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 35,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    width: "50%",
    padding: 2,
    marginLeft: 20,
    marginRight: 55,
  },
});

export default PaymentScreen;
