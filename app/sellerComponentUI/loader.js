import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Loader = () => (
  <View style={{ padding: 16, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator />
  </View>
);
