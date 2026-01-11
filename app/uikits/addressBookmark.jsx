// screens/AddressBookScreen.js
import { router } from "expo-router";
import { View, FlatList, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "../reusableComponent/Text";

const dummyAddresses = [
  {
    id: "1",
    label: "Home",
    details: "12 Main St, Freetown, SL",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    details: "45 Market Road, Conakry, GN",
    isDefault: false,
  },
];

export default function AddressBookScreen() {
  const renderAddress = ({ item }) => (
    <View className="mb-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Feather name="map-pin" size={20} color="#4B5563" />
          <Text className="text-gray-800">{item.label}</Text>
          {item.isDefault && (
            <View className="ml-2 px-2 py-0.5 bg-indigo-100 rounded-lg">
              <Text className="text-xs text-[#0057b8]">
                Default
              </Text>
            </View>
          )}
        </View>
        <View className="flex-row space-x-3 gap-4">
          <Pressable onPress={() => console.log("Edit", item.id)}>
            <Feather name="edit-3" size={18} color="#0057b8" />
          </Pressable>
          <Pressable onPress={() => console.log("Delete", item.id)}>
            <Feather name="trash-2" size={18} color="#DC2626" />
          </Pressable>
        </View>
      </View>
      <Text className="text-gray-500 mt-2">{item.details}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-white shadow-sm">
        <Pressable
          onPress={() => router.back()}
          className="bg-blue-100 p-2 rounded-full"
        >
          <Feather name="arrow-left" size={22} color="#0057b8" />
        </Pressable>
        <Text variant="heading" className="text-lg text-gray-900">My Addresses</Text>
        <Pressable onPress={() => router.push("../buyerComponentUI/addressCoponentEdit")}>
          <Feather name="plus-circle" size={22} color="#0057b8" />
        </Pressable>
      </View>

      {/* Address List */}
      {dummyAddresses.length > 0 ? (
        <FlatList
          data={dummyAddresses}
          keyExtractor={(item) => item.id}
          renderItem={renderAddress}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Feather name="map-pin" size={40} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">No addresses added yet</Text>
          <Pressable
            onPress={() => router.push("/add-address")}
            className="mt-4 bg-indigo-600 px-6 py-3 rounded-2xl"
          >
            <Text className="text-white">Add New Address</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
