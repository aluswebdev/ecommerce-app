
import { View, Text } from "react-native";

export const ErrorView = ({ message }) => (
  <View style={{ padding: 16 }}>
    <Text style={{ color: "red" }}>{message}</Text>
  </View>
);
