import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";

export default function Recipe({ navigation }) {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Text
        style={{
          fontSize: 21,
          fontWeight: "bold",
          alignSelf: "center",
          top: 20,
        }}
      >
        
        Recipe
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Account")}
      >
        <FontAwesome5
          name="arrow-left"
          size={22}
          style={{
            left: 20,
          }}
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/images/recipes-book-animation.gif")}
          style={{ height: 310, width: 310, marginTop: "60%" }}
        />
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Sorry, Recipe is not available right now
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "normal" }}>
          We will add easy recipes to make at home soon
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
