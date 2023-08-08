import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, TouchableOpacity, Modal } from "react-native";
import Screen from "../components/Screen";
import tailwind from "tailwind-react-native-classnames";
import AppHead from "../components/AppHead";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Divider } from "react-native-elements";

import { auth } from "../configs/firebase";
import { FontAwesome } from "@expo/vector-icons";
import EditProfile from "../components/EditProfile";
import EditAdress from "../components/EditAdress";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import { selectDeliverer } from "../redux/slices/RoleSlice";
import {logoutUser} from "../redux/slices/authSlice";
import {removeHome, removeWork} from "../redux/slices/AdressSlice";
import {emptyRole} from "../redux/slices/RoleSlice";
import {emptyBusket} from "../redux/slices/basketSlice";



const AccountScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleProfile, setModalVisibleProfile] = useState(false);
  const dispatch = useDispatch()
  const deliverer = useSelector(selectDeliverer);

    return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead
        title={
          auth.currentUser.email === "topadmin@gmail.com"
            ? `Admin`
            : deliverer.role === "deliverer"
            ? `Deliverer`
            : `Account`
        }
        icon="settings-outline"
      />

      <View style={tailwind`justify-center items-center`}>
        <View style={tailwind`rounded-full overflow-hidden w-48 h-48 mt-4`}>
          <Image
            source={require("../assets/images/avatar.gif")}
            style={tailwind`w-48 h-48`}
          />
        </View>
        <Text style={tailwind`mt-4 text-3xl font-bold`}>
          {auth.currentUser.displayName}
        </Text>
      </View>
      <ScrollView>
        {auth.currentUser.email === "topadmin@gmail.com" ? (
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Divider width={0.6} style={{ marginTop: 20, marginBottom: 10 }} />

            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Admin</Text>
            <View
              style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("ConsultOrders")}
              >
                <FontAwesome name="database" size={20} />
                <Text style={{ fontSize: 15, marginLeft: 26 }}>
                  Consult Orders
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("ConsultUsers")}
              >
                <FontAwesome5 name="user-cog" size={20} />
                <Text style={{ fontSize: 15, marginLeft: 20 }}>
                  Consult Users
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("ConsultFeedbacks")}
              >
                <FontAwesome5 name="list" size={20} />
                <Text style={{ fontSize: 15, marginLeft: 25 }}>
                  Consult feedbacks
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                    navigation.navigate("ManageRestaurant")}
              >
                <Ionicons name="restaurant" size={20} />
                <Text style={{ fontSize: 15, marginLeft: 25 }}>
                  Manage restaurants
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
        {deliverer.role === "deliverer" ? (
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Divider width={0.6} style={{ marginTop: 20, marginBottom: 10 }} />

            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Deliverer</Text>
            <View
              style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("ConsultOrders", {
                    deliverer: deliverer,
                  })
                }
              >
                <FontAwesome name="database" size={20} />
                <Text style={{ fontSize: 15, marginLeft: 20 }}>
                  Consult Orders
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
        {deliverer.role === "user" ? (
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Divider width={0.6} style={{ marginTop: 20, marginBottom: 10 }} />

              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Orders</Text>
              <View
                  style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}
              >
                <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() =>
                        navigation.navigate("ConsultOrdersUser")
                    }
                >
                  <FontAwesome name="database" size={20} />
                  <Text style={{ fontSize: 15, marginLeft: 20 }}>
                    Consult your Orders
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        ) : (
            <></>
        )}
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <Divider width={0.6} style={{ marginTop: 20, marginBottom: 10 }} />

          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Profile</Text>
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setModalVisibleProfile(true)}
              style={{ flexDirection: "row" }}
            >
              <FontAwesome name="user-circle-o" size={20} />
              <Text style={{ fontSize: 15, marginLeft: 20 }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ flexDirection: "row" }}
            >
              <FontAwesome5 name="location-arrow" size={20} />
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Manage Adresses
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider width={0.6} style={{ marginTop: 20, marginBottom: 10 }} />
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Features</Text>
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate("Favorites")}
            >
              <FontAwesome name="heart" size={20} />
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Your Favorites
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate("Recipe")}
            >
              <FontAwesome5 name="utensils" size={20} />
              <Text style={{ fontSize: 15, marginLeft: 25 }}>Easy Recipes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider width={0.6} style={{ marginTop: 20, marginBottom: 10 }} />
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Other Options
          </Text>
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.navigate("Feedback")}
            >
              <FontAwesome5 name="comment-dots" size={20} />
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Send FeedBack
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => {

                dispatch(removeHome())
                dispatch(removeHome())
                dispatch(removeHome())
                dispatch(emptyBusket())
                dispatch(emptyRole())
                dispatch(logoutUser())
                auth.signOut()
              }}
            >
              <FontAwesome5 name="sign-out-alt" size={20} />
              <Text style={{ fontSize: 15, marginLeft: 20 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisibleProfile}
        animationType="slide"
        transparent={true}
      >
          <EditProfile
          setModalVisible={setModalVisibleProfile}
          props={auth.currentUser}
        />
      </Modal>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <EditAdress
          setModalVisible={setModalVisible}
          props={auth.currentUser}
        />
      </Modal>
    </Screen>
  );
};

export default AccountScreen;

const SavedPlaces = ({ title, text, Icon }) => (
  <TouchableOpacity style={tailwind`flex-row items-center my-3`}>
    <Icon />
    <View style={tailwind`ml-5`}>
      <Text style={tailwind`text-gray-800`}>{title}</Text>
      <Text style={tailwind`text-gray-600 text-xs mt-1`}>{text}</Text>
    </View>
  </TouchableOpacity>
);
