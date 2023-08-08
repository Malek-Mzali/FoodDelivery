import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsScreen from "../screens/DetailsScreen";
import SuccessScreen from "../screens/SuccessScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import MainTabNavigator from "./MainTabNavigator";
import FavoritesScreen from "../screens/FavoritesScreen";
import RecipeSreen from "../screens/RecipeScreen";
import  FeedbackScreen from  "../screens/FeedbackScreen"
import ConsultOrdersScreen from "../screens/ConsultOrdersScreen";
import ConsultOrdersUserScreen from "../screens/ConsultOrdersUserScreen";
import ConsultFeedbacksScreen from "../screens/ConsultFeedbacksScreen";
import ConsultUsersScreen from "../screens/ConsultUsersScreen";
import ManageRestaurantScreen from "../screens/ManageRestaurantScreen";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />

      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Recipe" component={RecipeSreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />

      <Stack.Screen name="ConsultOrders" component={ConsultOrdersScreen} />
      <Stack.Screen name="ConsultOrdersUser" component={ConsultOrdersUserScreen} />

      <Stack.Screen name="ConsultUsers" component={ConsultUsersScreen} />
      <Stack.Screen name="ConsultFeedbacks" component={ConsultFeedbacksScreen}/>
      <Stack.Screen name="ManageRestaurant" component={ManageRestaurantScreen} />

    </Stack.Navigator>
  );
}
