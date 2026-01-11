import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileAvatar from "../buyerComponentUI/profilevatar";
import useBuyerStore from "../zustand/buyerStore/buyerStore";
import useAuthStore from "../zustand/authStore";

const EditBuyerProfile = () => {
  const { user } = useAuthStore();
  const { loading, updateBuyerProfile, fetchBuyerProfile } = useBuyerStore();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchBuyerProfile();
  }, [fetchBuyerProfile]);

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    location: {
      city: user?.location?.city || "",
      region: user?.location?.region || "",
    },
    profilePhoto: user?.profilePhoto?.url || null,
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPhoto(asset.uri);

      const base64Image = `data:image/jpeg;base64,${asset.base64}`;
      setForm((prev) => ({
        ...prev,
        profilePhoto: base64Image,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const uriParts = photo ? photo.split(".") : [];
      const fileType = uriParts?.[uriParts.length - 1] || "jpeg";
      const imageType = `image/${fileType}`;
      const profilePhoto = `data:${imageType};base64,${form.profilePhoto}`;
      const profilePhotoCheck = !profilePhoto
        ? delete form.profilePhoto
        : profilePhoto;

      await updateBuyerProfile({ ...form, profilePhotoCheck });
    } catch (error) {
      console.log(
        "Signup error:",
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={pickImage}>
            {photo && <Image source={{ uri: photo }} style={styles.avatar} />}
            {!photo && <ProfileAvatar user={user} size={100} />}
            <View style={styles.editIcon}>
              <MaterialIcons name="edit" size={18} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>{user?.email}</Text>
          <Text style={styles.role}>Buyer Account</Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
          />
          <Input
            label="Phone"
            value={form.phoneNumber}
            onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
          />
          <Input
            label="Region"
            value={form.location.region}
            onChangeText={(text) =>
              setForm({ ...form, location: { ...form.location, region: text } })
            }
          />
          <Input
            label="City"
            value={form.location.city}
            onChangeText={(text) =>
              setForm({ ...form, location: { ...form.location, city: text } })
            }
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer fixed at bottom */}
      <View style={styles.footer}>
        <View style={styles.line} />
        <Text style={styles.footerTitle}>SLEM | Version 1.0.0</Text>
        <Text style={styles.footerText}>
          Supporting Sierra Leonean businesses across all 16 districts.
        </Text>
        <Text style={styles.footerText}>Made with ❤️ for Sierra Leone</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const Input = ({ label, ...props }) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);

export default EditBuyerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20, // prevent content overlapping footer
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1E40AF",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1E40AF",
    borderRadius: 20,
    padding: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#111827",
  },
  role: {
    color: "#6B7280",
    fontSize: 13,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 100, // space above footer
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 12,
  },
  button: {
    backgroundColor: "#1E40AF",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  line: {
    width: "80%",
    height: 2,
    backgroundColor: "#1E40AF",
    marginBottom: 12,
    borderRadius: 1,
  },
});
