import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLanguageStore } from "../zustand/languageStore/languageStore";
import i18n from "../language/i18n";
import useAuthStore from "../zustand/authStore";
import { router } from "expo-router";
import { Text } from "../reusableComponent/Text.jsx";

const SignupScreen = ({ navigation }) => {
  const { language } = useLanguageStore();
  const { register, loading } = useAuthStore();

  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "buyer",
    location: { city: "", region: "" },
    profilePhoto: null,
  });

  const handleChange = (field, value) => {
    if (field === "city" || field === "region") {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Pick optional profile photo
  const handlePhotoPick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      aspect: [4, 3],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);
      // ✅ FORCE SAFE MIME TYPE
      const base64Image = `data:image/jpeg;base64,${asset.base64}`;

      setForm((prev) => ({ ...prev, profilePhoto: base64Image }));
    }
  };

  const handleSignup = async () => {
    if (!form.fullName || !form.email || !form.phoneNumber || !form.password) {
      Alert.alert(
        i18n.t("form_error", { lng: language }),
        i18n.t("form_required_fields", { lng: language })
      );
      return;
    }

    try {
      const uriParts = image?.split(".");
      const fileType = uriParts?.[uriParts.length - 1] || "jpeg";
      const imageType = `image/${fileType}`;
      const profilePhoto = `data:${imageType};base64,${form.profilePhoto}`;

      const profilePhotoCheck = !profilePhoto
        ? delete form.profilePhoto
        : profilePhoto;
      await register({ ...form, profilePhotoCheck });
    

      // redirect to appropriate dashboard after signup
      if (form.role === "seller") {
        router.push("../(seller)/");
      } else {
        router.push("../(buyer)/");
      }
    } catch (err) {
      console.log("Signup error:", err?.response?.data?.message || err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {i18n.t("create_account", { lng: language })}
      </Text>

      {/* Profile photo */}
      <TouchableOpacity onPress={handlePhotoPick} className="self-center mb-6">
        {image ? (
          <Image source={{ uri: image }} className="w-24 h-24 rounded-full" />
        ) : (
          <View className="w-24 h-24 bg-[#1e40af] rounded-full items-center justify-center">
            <MaterialIcons name="person-add-alt" size={28} color="#ffffff" />
          </View>
        )}
        <Text className="text-center text-sm text-[#1E40AF] mt-2">
          {image ? "Change Photo" : "Upload Photo"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.photoLabel}>
        {i18n.t("optional_profile_photo", { lng: language })}
      </Text>

      {/* Full Name */}
      <Text style={styles.label}>{i18n.t("full_name", { lng: language })}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("full_name_placeholder", { lng: language })}
        value={form.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />

      {/* Email */}
      <Text style={styles.label}>{i18n.t("email", { lng: language })}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("email_placeholder", { lng: language })}
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Phone Number */}
      <Text style={styles.label}>
        {i18n.t("phone_number", { lng: language })}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("phone_placeholder", { lng: language })}
        value={form.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>{i18n.t("region", { lng: language })}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("select_region", { lng: language })}
        value={form.location.region}
        onChangeText={(text) => handleChange("region", text)}
      />

      <Text style={styles.label}>{i18n.t("city", { lng: language })}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("select_city", { lng: language })}
        value={form.location.city}
        onChangeText={(text) => handleChange("city", text)}
      />

      {/* Password */}
      <Text style={styles.label}>{i18n.t("password", { lng: language })}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("password_placeholder", { lng: language })}
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />

      {/* Role Selector */}
      <Text style={styles.label}>
        {i18n.t("select_role", { lng: language })}
      </Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            form.role === "buyer" && styles.roleButtonActive,
          ]}
          onPress={() => handleChange("role", "buyer")}
        >
          <Text
            style={
              form.role === "buyer" ? styles.roleTextActive : styles.roleText
            }
          >
            Buyer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            form.role === "seller" && styles.roleButtonActive,
          ]}
          onPress={() => handleChange("role", "seller")}
        >
          <Text
            style={
              form.role === "seller" ? styles.roleTextActive : styles.roleText
            }
          >
            Seller
          </Text>
        </TouchableOpacity>
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.signupText}>
          {!loading
            ? i18n.t("create_account", { lng: language })
            : i18n.t("sending", { lng: language })}
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        {i18n.t("already_have_account", { lng: language })}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>
          {i18n.t("login_here", { lng: language })}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 24,
    textAlign: "center",
  },
  photoContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoLabel: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 24,
  },
  label: { fontSize: 14, color: "#374151", marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1E40AF",
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: "#1E40AF",
  },
  roleText: { color: "#1E40AF", fontWeight: "600" },
  roleTextActive: { color: "#fff", fontWeight: "600" },
  signupButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  signupText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  loginText: { marginTop: 16, textAlign: "center", color: "#6B7280" },
  loginLink: {
    color: "#1E40AF",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 4,
  },
});
