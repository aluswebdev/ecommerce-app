// screens/BuyAgainScreen.js
import { router } from "expo-router";
import { View, Text, FlatList, Pressable } from "react-native";

const dummyBuyAgain = [
  { id: "1", name: "Bluetooth Speaker", price: "$39.99" },
  { id: "2", name: "Face Mask Pack", price: "$9.99" },
];

export default function BuyAgainScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-500">← Back</Text>
      </Pressable>
      <Text className="text-xl font-bold mb-4">Buy Again</Text>
      <FlatList
        data={dummyBuyAgain}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Text className="text-base font-semibold">{item.name}</Text>
            <Text className="text-gray-500">{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
