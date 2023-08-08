import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { doc,getDoc, deleteDoc, setDoc} from "firebase/firestore";
import {db, auth} from "../configs/firebase";
const ChangeToFavorite =  async (props) => {

    const innerDocRef = doc(doc(db, `favorites/${auth.currentUser.uid}`), `restaurant/${props.name}`);

    getDoc(innerDocRef)
        .then(innerDocSnapshot => {
            if (innerDocSnapshot.exists()) {
                deleteDoc(innerDocRef)
                    .then((result) => {
                        ToastAndroid.showWithGravity(
                            "Deleted from favorites",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                        );
                    });
            } else {
                setDoc(innerDocRef, {Data: props}, {merge: true})
                    .then((result) => {
                        ToastAndroid.showWithGravity(
                            "Added to favorites",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                        );
                    })
            }
        });

};

const RestaurantItem = (props) => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate("DetailsScreen", {
      item: { ...item },
        activeTab: props.activeTab
    });
  };

  return (
    <View>
      {props.restaurantData?.map((item, index) => (
        <RestaurantItemCard
          key={index}
          item={item}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
};

export default RestaurantItem;

const RestaurantItemCard = ({ item, onPress }) => {
  const [loved, setLoved] = useState(false);
  return (
    <TouchableOpacity style={tailwind`mx-4 mb-4`} onPress={onPress}>
      <Image
        source={{ uri: item.image_url }}
        style={tailwind`w-full h-48 rounded-lg`}
      />
      <TouchableOpacity
        style={tailwind`absolute top-2 right-2`}
        onPress={() => {
          setLoved((e) => !e), ChangeToFavorite(item);
        }}
      >
        <MaterialCommunityIcons
          name={`${loved ? "heart" : "heart-outline"}`}
          size={28}
          color={`${loved ? "#EB5353" : "white"}`}
        />
      </TouchableOpacity>
      <View style={tailwind`flex-row items-center mt-1`}>
        <View style={tailwind`flex-grow`}>
          <Text style={tailwind`font-bold text-lg`} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={13}
              color="#06C167"
            />
            <Text style={{ fontSize: 13, color: "#06C167" }}> 20-30 • min</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="star" size={17} color="#F9C449" />

          <Text style={{ color: "#F9C449", fontSize: 15, fontWeight: "bold" }}>
            {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
