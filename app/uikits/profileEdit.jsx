// screens/EditProfileScreen.js
import { View, Text, TextInput, Image, Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function EditProfileScreen() {
  const [name, setName] = useState("Alusine Sesay");
  const [email, setEmail] = useState("alusine@gmail.com");
  const [image, setImage] = useState(null);

  const handleSave = () => {
    alert("Profile updated");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-500">← Back</Text>
      </Pressable>
      <Text className="text-xl font-bold mb-4">Edit Profile</Text>

      <Pressable onPress={pickImage} className="items-center mb-4">
        <Image
          source={{ uri: image || "https://i.pravatar.cc/150?img=9" }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-blue-500 mt-2">Change Photo</Text>
      </Pressable>

      <Text className="text-gray-600 mb-1">Full Name</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        value={name}
        onChangeText={setName}
      />
      <Text className="text-gray-600 mb-1">Email</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        onPress={handleSave}
        className="bg-primary rounded-full p-3"
      >
        <Text className="text-center text-white">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
