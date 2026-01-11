import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Users from "../(admin)/users";
import Products from "../(admin)/products";
import Settings from "./settings";
import { COLORS } from "../src/constant/theme";

const TopTab = createMaterialTopTabNavigator();

export default function AdminTopTabsScreen() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <TopTab.Screen name="Users" component={Users} />
      <TopTab.Screen name="Products" component={Products} />
      <TopTab.Screen name="Settings" component={Settings} />
    </TopTab.Navigator>
  );
}
