import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import PaymentScreen from "../components/PaymentScreen";
import { STRIPE_API_URL } from "../configs/apiEndpoints";
import colors from "../configs/colors";
import PaymentButton from "../components/PaymentButton";
import tailwind from "tailwind-react-native-classnames";
import AppHead from "../components/AppHead";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { selectCartItems, updateBusket } from "../redux/slices/basketSlice";
import { db, timestamp, auth } from "../configs/firebase";
import { selectAdress } from "../redux/slices/AdressSlice";
import {
  selectAdressChoice,
} from "../redux/slices/AdressSelection";
import {doc, setDoc} from "firebase/firestore";

const CheckoutScreen = () => {
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
    useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allCartItems = useSelector(selectCartItems);
  const adress = useSelector(selectAdress);
  const adressX = useSelector(selectAdressChoice);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${STRIPE_API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initialisePaymentSheet = async () => {
    setLoading(true);

    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error, paymentOption } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: "Example Inc.",
        applePay: false,
        merchantCountryCode: "US",
        style: "alwaysDark",
        googlePay: false,
        testEnv: true,
      });

      if (!error) {
        setPaymentSheetEnabled(true);
      }
      if (paymentOption) {
        setPaymentMethod(paymentOption);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const choosePaymentOption = async () => {
    const { error, paymentOption } = await presentPaymentSheet({
      confirmPayment: false,
    });

    if (error) {
      console.log("error", error);
    } else if (paymentOption) {
      setPaymentMethod({
        label: paymentOption?.label,
        image: paymentOption?.image,
      });
    } else {
      setPaymentMethod(null);
    }
  };

  const onPressBuy = async () => {
    setLoading(true);
    const { error } = await confirmPaymentSheetPayment();

    if (error) {
      Alert.alert("Payment faild", `Error code: ${error.code}`, error.message);
    } else {
      // Success;
      addOrder({ Hand: false });
      setPaymentSheetEnabled(false);
    }
    setLoading(false);
  };

  const onPressBuyHand = async () => {
    addOrder({ Hand: true });
    setPaymentSheetEnabled(false);
    setLoading(false);
  };

  useEffect(() => {
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
    initialisePaymentSheet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addOrder = ({ Hand }) => {
    setLoadingOrder(true);
    let Zzadress = "";
    if (adressX.home) {
      Zzadress = adress.home;
    } else if (adressX.work) {
      Zzadress = adress.work;
    } else {
      Zzadress = adressX.other;
    }
    const currentDate = new Date();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const time = `${day} ${month} ${date} ${year}, ${formattedTime}`;

    setDoc(doc(db, "orders", auth.currentUser.uid+";"+time),
  {
        id: auth.currentUser.uid,
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        phone: auth.currentUser.phoneNumber,
        Adress: Zzadress,
        items: allCartItems,
        hand: Hand,
        state: "pending",
        time: time,
      },{ merge: true }
      )
      .then(() => {
        setTimeout(() => {
          setLoadingOrder(false);
          dispatch(updateBusket([]));
          navigation.navigate("SuccessScreen");
        }, 1500);
      })
      .catch((e) => {
        setLoadingOrder(false);
        Alert.alert("Error", e.message);
      });
  };

  return (
    <>
      {loadingOrder ? (
        <View style={tailwind`h-full bg-white items-center justify-center`}>
          <Text style={tailwind`font-bold text-lg w-3/4 text-center`}>
            {"Congratulations!\nPayment successfully done!"}
          </Text>
          <Text style={tailwind`mt-4`}>
            Creating your order. please wait...
          </Text>
          <Image
            source={require("../assets/images/loaging.gif")}
            style={tailwind`w-72 h-72`}
          />
        </View>
      ) : (
        <>
          <PaymentScreen>
            <AppHead title={`Checkout`} />
            <View style={tailwind`mt-5`}>
              <PaymentButton
                variant="primary"
                loading={loading}
                title={
                  paymentMethod ? (
                    <View style={styles.row}>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${paymentMethod?.image}`,
                        }}
                        style={styles.image}
                      />
                      <Text style={styles.text}>{paymentMethod?.label}</Text>
                    </View>
                  ) : (
                    "Choose payment method"
                  )
                }
                disabled={!paymentSheetEnabled}
                onPress={choosePaymentOption}
              />
            </View>
            <View style={styles.section}>
              <PaymentButton
                variant="primary"
                disabled={!paymentMethod || !paymentSheetEnabled}
                loading={loading}
                title="Pay"
                onPress={onPressBuy}
              />
            </View>


            <View style={tailwind`mt-5`}>
              <PaymentButton
                variant="primary"
                title="Hand to hand payment"
                onPress={onPressBuyHand}
              />
            </View>
          </PaymentScreen>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  paymentMethodTitle: {
    color: colors.slate,
    fontWeight: "bold",
  },
  image: {
    width: 26,
    height: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
});

export default CheckoutScreen;
