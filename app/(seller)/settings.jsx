import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useColorScheme,
  Switch,
  Alert,
} from "react-native";
import { Edit2, Lock, Bell, DollarSign } from "lucide-react-native";

import useAuthStore from "../zustand/authStore";


const PRIMARY = "#1e40af";

export default function SellerSettings() {
  const { user, changePassword, loading } = useAuthStore();

  const scheme = useColorScheme();
  const dark = scheme === "dark";
  const theme = {
    background: dark ? "#020617" : "#f8f9fb",
    card: dark ? "#020617" : "#fff",
    text: dark ? "#e5e7eb" : "#111827",
    muted: dark ? "#94a3b8" : "#64748b",
  };

  // Editable profile
  const [name, setName] = useState("Alusine Sesay");
  const [store, setStore] = useState("Sierra Market");

  // Password
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notifications
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(dark);

  // Bank / payout info
  const [bankAccount, setBankAccount] = useState("1234567890");

  // Mobile money
  const [orangeMoney, setOrangeMoney] = useState("");
  const [afriMoney, setAfriMoney] = useState("");
  const [qMoney, setQMoney] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "All password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }

    if (!changePassword(currentPassword, newPassword)) {
      setShowPasswordFields(true);
      setConfirmPassword(confirmPassword);
      setNewPassword(newPassword);
      setCurrentPassword(currentPassword);
      return;
    } else {
      changePassword(currentPassword, newPassword);
      // setCurrentPassword("");
      // setNewPassword("");
      // setConfirmPassword("");
      console.log(confirmPassword, newPassword, currentPassword)
    }
  };

  const handleSaveChanges = () => {
    // Here you can integrate with your backend API later
    Alert.alert(
      "Success",
      `Profile saved!\nName: ${name}\nStore: ${store}\nBank: ${bankAccount}\nOrange Money: ${orangeMoney}\nAfrimoney: ${afriMoney}\nQMoney: ${qMoney}`
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Profile Section */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Profile
        </Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: PRIMARY }]}
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          placeholderTextColor={theme.muted}
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: PRIMARY }]}
          value={store}
          onChangeText={setStore}
          placeholder="Store Name"
          placeholderTextColor={theme.muted}
        />
      </View>

      {/* Password Section */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Password
        </Text>
        <TouchableOpacity
          onPress={() => setShowPasswordFields(!showPasswordFields)}
        >
          <Text style={{ color: PRIMARY, marginBottom: 12 }}>
            {showPasswordFields ? "Hide" : "Change / Forget Password"}
          </Text>
        </TouchableOpacity>
        {showPasswordFields && (
          <>
            <TextInput
              style={[
                styles.input,
                { color: theme.text, borderColor: PRIMARY },
              ]}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current Password"
              secureTextEntry
              placeholderTextColor={theme.muted}
            />
            <TextInput
              style={[
                styles.input,
                { color: theme.text, borderColor: PRIMARY },
              ]}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              secureTextEntry
              placeholderTextColor={theme.muted}
            />
            <TextInput
              style={[
                styles.input,
                { color: theme.text, borderColor: PRIMARY },
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
              placeholderTextColor={theme.muted}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: PRIMARY }]}
              onPress={handleChangePassword}
            >
              {loading ? (
                <Text style={styles.buttonText}>Changing...</Text>
              ) : (
                <Text style={styles.buttonText}>Change Password</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Notifications Section */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <View style={styles.row}>
          <Bell size={22} color={PRIMARY} />
          <Text
            style={[styles.sectionTitle, { color: theme.text, marginLeft: 12 }]}
          >
            Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#6b7280", true: PRIMARY }}
            thumbColor="#fff"
            style={{ marginLeft: "auto" }}
          />
        </View>
      </View>

      {/* Bank / Payout Section */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <View style={styles.row}>
          <DollarSign size={22} color={PRIMARY} />
          <Text
            style={[styles.sectionTitle, { color: theme.text, marginLeft: 12 }]}
          >
            Bank Account
          </Text>
        </View>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: PRIMARY }]}
          value={bankAccount}
          onChangeText={setBankAccount}
          placeholder="Bank Account Number"
          placeholderTextColor={theme.muted}
        />

        {/* Save Changes Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: PRIMARY }]}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Mobile Money Section */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text
          style={[styles.sectionTitle, { color: theme.text, marginBottom: 12 }]}
        >
          Mobile Money Payment Methods
        </Text>

        <TextInput
          style={[styles.input, { color: theme.text, borderColor: PRIMARY }]}
          value={orangeMoney}
          onChangeText={setOrangeMoney}
          placeholder="Orange Money Number"
          placeholderTextColor={theme.muted}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: PRIMARY }]}
          value={afriMoney}
          onChangeText={setAfriMoney}
          placeholder="Afrimoney Number"
          placeholderTextColor={theme.muted}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: PRIMARY }]}
          value={qMoney}
          onChangeText={setQMoney}
          placeholder="QMoney Number"
          placeholderTextColor={theme.muted}
          keyboardType="numeric"
        />

        {/* Save Changes Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: PRIMARY }]}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* App Preferences */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <View style={styles.row}>
          <Edit2 size={22} color={PRIMARY} />
          <Text
            style={[styles.sectionTitle, { color: theme.text, marginLeft: 12 }]}
          >
            Dark Mode
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#6b7280", true: PRIMARY }}
            thumbColor="#fff"
            style={{ marginLeft: "auto" }}
          />
        </View>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginBottom: 60 },
  section: { padding: 16, borderRadius: 16, marginBottom: 16, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12 },
  button: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center" },

  // Save button styles
  saveButton: {
    padding: 5,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 1,
  },
  saveButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
