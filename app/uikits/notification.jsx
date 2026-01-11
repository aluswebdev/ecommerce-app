// screens/NotificationSettingsScreen.js
import { View, Text, Switch, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function NotificationSettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <View className="flex-1 bg-white p-4">
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-500">← Back</Text>
      </Pressable>
      <Text className="text-xl font-bold mb-4">Notification Settings</Text>
      <View className="flex-row items-center justify-between mb-4">
        <Text>Push Notifications</Text>
        <Switch value={pushEnabled} onValueChange={setPushEnabled} />
      </View>
      <View className="flex-row items-center justify-between">
        <Text>Email Notifications</Text>
        <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
      </View>
    </View>
  );
}
