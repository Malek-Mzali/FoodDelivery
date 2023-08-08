import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../configs/colors";
import HomeScreen from "../screens/HomeScreen";
import TabCartButton from "../components/TabCartButton";
import BrowseScreen from "../screens/BrowseScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FavoritesScreen from "../screens/FavoritesScreen";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.activeTintColor,
        tabBarInactiveTintColor: colors.inActiveTintColor,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TabCartButton onPress={() => navigation.navigate("Cart")} />
          ),
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heart" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
