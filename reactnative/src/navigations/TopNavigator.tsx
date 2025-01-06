import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MouseScreen from "../screens/MouseScreen";
import TouchpadScreen from "../screens/TouchpadScreen";
import { StyleSheet } from "react-native";

const TopNavigatorStack = createMaterialTopTabNavigator();

export default function TopNavigator() {
  return (
    <TopNavigatorStack.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      }}
    >
      <TopNavigatorStack.Screen name="MOUSE" component={MouseScreen} />
      <TopNavigatorStack.Screen name="TOUCHPAD" component={TouchpadScreen} />
    </TopNavigatorStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tabBarStyle: {
    backgroundColor: "#f0f0f0",
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#000",
  },
});
