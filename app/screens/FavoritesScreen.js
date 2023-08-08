import React, { Component } from "react";
import { doc, getDocs,getDoc, collection, deleteDoc} from "firebase/firestore";
import {db, auth} from "../configs/firebase";

import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView, ToastAndroid,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class FavoritesScreen extends Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
  }

  state = {
    restaurant: [],
  };

  ChangeToFavorite(props) {

      const innerDocRef = doc(doc(db, `favorites/${auth.currentUser.uid}`), `restaurant/${props.name}`);
      getDoc(innerDocRef).then(innerDocSnapshot => {
          if (innerDocSnapshot.exists()) {
              deleteDoc(innerDocRef)
                  .then((result) => {
                      let newData = this.state.restaurant.filter(
                          (item) => item.Data.name !== props.name
                      );
                      this.setState({ restaurant: newData });
                  });
          }

      })



  }

  Fetch() {
      const restaurant = [];

      const innerCollectionRef = collection(doc(collection(db, "favorites"), auth.currentUser.uid), "restaurant");

      getDocs(innerCollectionRef)
          .then(querySnapshot => {
              querySnapshot.forEach(docSnapshot => {
                  restaurant.push(docSnapshot.data());
              });
              this.setState({restaurant: restaurant});

          })
          .catch(error => {
              console.error('Error getting documents:', error);
          });
  }

  render() {
    this.Fetch();
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
          Favorites
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {this.state.restaurant.length === 0 ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../assets/images/heart-button.gif")}
                  style={{ height: 200, width: 200, marginTop: "60%" }}
                />
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  Add to favorites
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                  Adding stores to favorites gives you quick access to them
                </Text>
                <Text>
                  and saves you time when you want to render or save them for
                  later .
                </Text>
              </View>
            ) : (
              this.state.restaurant.map((restaurant, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={{ marginTop: 10 }}
                  onPress={() =>
                    this.navigation.navigate("DetailsScreen", {
                      item: { ...restaurant.Data },
                    })
                  }
                >
                  <View
                    style={{
                      marginTop: 2,
                      padding: 15,
                      backgroundColor: "white",
                      borderBottomColor: "#eee",
                      borderBottomWidth: 2,
                    }}
                  >
                    <View>
                      <Image
                        source={{
                          uri: restaurant.Data.image_url,
                        }}
                        style={{
                          width: "100%",
                          height: 120,
                          borderRadius: 10,
                        }}
                      />
                      <TouchableOpacity
                        style={{ position: "absolute", right: 20, top: 20 }}
                        activeOpacity={0}
                      >
                        <MaterialCommunityIcons
                          name="heart"
                          size={28}
                          color="#EB5353"
                          onPress={() => {
                            this.ChangeToFavorite(restaurant.Data);
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                          {restaurant.Data.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="clock-time-four-outline"
                            size={13}
                            color="#06C167"
                          />
                          <Text style={{ fontSize: 13, color: "#06C167" }}>
                            {" "}
                            30-45 • min
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginRight: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="star"
                          size={17}
                          color="#F9C449"
                        />
                        <Text
                          style={{
                            color: "#F9C449",
                            fontSize: 15,
                            fontWeight: "bold",
                          }}
                        >
                          {restaurant.Data.rating}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
