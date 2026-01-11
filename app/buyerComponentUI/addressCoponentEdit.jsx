// screens/AddressFormScreen.js
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons"; 
import { Text } from "../reusableComponent/Text";

// ✅ Replace this with actual store/API fetch
const dummyAddresses = [
  {
    id: "1",
    label: "Home",
    fullName: "Abu Kamara",
    phone: "232-77-123456",
    street: "12 Main St",
    city: "Freetown",
    country: "Sierra Leone",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    fullName: "Abu Kamara",
    phone: "224-62-654321",
    street: "45 Market Road",
    city: "Conakry",
    country: "Guinea",
    isDefault: false,
  },
];

export default function AddressFormScreen() {
  const { id } = useLocalSearchParams(); // Get ?id= from router
  const isEditMode = Boolean(id);

  // Form state
  const [label, setLabel] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  // Prefill values if editing
  useEffect(() => {
    if (isEditMode) {
      const existing = dummyAddresses.find((a) => a.id === id);
      if (existing) {
        setLabel(existing.label);
        setFullName(existing.fullName);
        setPhone(existing.phone);
        setStreet(existing.street);
        setCity(existing.city);
        setCountry(existing.country);
        setIsDefault(existing.isDefault);
      }
    }
  }, [id, isEditMode]);

  const handleSave = () => {
    const newAddress = {
      id: id || Date.now().toString(),
      label,
      fullName,
      phone,
      street,
      city,
      country,
      isDefault,
    };

    if (isEditMode) {
      console.log("Updating address:", newAddress);
      // TODO: Update address via API/store
    } else {
      console.log("Adding address:", newAddress);
      // TODO: Add address via API/store
    }

    router.back();
  };

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
        <Text className="text-lg font-bold text-gray-900">
          {isEditMode ? "Edit Address" : "Add Address"}
        </Text>
        <View className="w-6" /> {/* spacer */}
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <FormField
          label="Label (e.g. Home, Work)"
          value={label}
          onChangeText={setLabel}
        />
        <FormField
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <FormField
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <FormField
          label="Street Address"
          value={street}
          onChangeText={setStreet}
        />
        <FormField label="City / Region" value={city} onChangeText={setCity} />
        <FormField label="Country" value={country} onChangeText={setCountry} />

        {/* Default Address Toggle */}
        <View className="flex-row items-center justify-between mt-4 p-4 bg-white rounded-xl shadow-sm">
          <Text className="text-gray-700 font-medium">
            Set as Default Address
          </Text>
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            trackColor={{ false: "#d1d5db", true: "#0057b8" }} // gray-300 when off, indigo-500 when on
            thumbColor={isDefault ? "#ffffff" : "#f9fafb"} // white when on, red-400 when off
            ios_backgroundColor="#d1d5db" // needed for iOS off state
          />
        </View>

        {/* Action Buttons */}
        <View className="mt-6 flex-row justify-between">
          <Pressable
            onPress={() => router.back()}
            className="flex-1 bg-gray-200 py-3 rounded-xl mr-2 items-center"
          >
            <Text className="text-gray-700 font-semibold">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleSave}
            className="flex-1 bg-[#0057b8] py-3 rounded-xl ml-2 items-center"
          >
            <Text className="text-white font-semibold">
              {isEditMode ? "Update" : "Save"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function FormField({ label, value, onChangeText, keyboardType }) {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 mb-1 font-medium">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={label}
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 shadow-sm"
      />
    </View>
  );
}
