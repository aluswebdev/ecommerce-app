import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import i18n from "../language/i18n";
import { useLanguageStore } from "../zustand/languageStore/languageStore";
import useBuyerStore from "../zustand/buyerStore/buyerStore";

/* 🇸🇱 Sierra Leone Districts */
const DISTRICTS_SL = [
  "Western Area Urban",
  "Western Area Rural",
  "Bombali",
  "Tonkolili",
  "Kambia",
  "Port Loko",
  "Koinadugu",
  "Falaba",
  "Karene",
  "Bo",
  "Bonthe",
  "Moyamba",
  "Pujehun",
  "Kenema",
  "Kailahun",
  "Kono",
];

const DeliveryAddressScreen = () => {
  const { language } = useLanguageStore();
  const {
    addresses,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    loading,
  } = useBuyerStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  /* ✅ Save (Add / Edit) */
  const saveAddress = async () => {
    if (!label.trim() || !street.trim() || !district) {
      Alert.alert("Validation", "All fields are required");
      return;
    }

    const details = `${street.trim()}, ${district}`;

    try {
      if (editingId) {
        await updateAddress(editingId, { label, details });
      } else {
        await addAddress({ label, details });
      }

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setLabel("");
    setStreet("");
    setDistrict("");
    setEditingId(null);
    setModalVisible(false);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoadingId(id);
            await deleteAddress(id);
            setLoadingId(null);
          },
        },
      ]
    );
  };

  const renderAddress = ({ item }) => {
    const isDefault = item.isDefault;

    return (
      <TouchableOpacity
        style={[styles.card, isDefault && styles.defaultCard]}
        activeOpacity={0.85}
        onPress={() => {
          if (!isDefault) {
            setDefaultAddress(item._id);
          }
        }}
      >
        {/* LEFT SIDE – ADDRESS INFO */}
        <View style={{ flex: 1 }}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{item.label}</Text>

            {isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>DEFAULT</Text>
              </View>
            )}
          </View>

          <Text style={styles.cardDetails}>{item.details}</Text>
        </View>

        {/* RIGHT SIDE – RADIO + ACTIONS */}
        <View style={styles.actions}>
          <Ionicons
            name={isDefault ? "radio-button-on" : "radio-button-off"}
            size={22}
            color={isDefault ? "#1E40AF" : "#9CA3AF"}
            style={{ marginRight: 12 }}
          />

          <TouchableOpacity
            onPress={() => confirmDelete(item._id)}
            disabled={loadingId === item._id}
          >
            {loadingId === item._id ? (
              <ActivityIndicator size="small" />
            ) : (
              <MaterialIcons name="delete-outline" size={24} color="#EF4444" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const parts = item.details.split(",");
              setStreet(parts.slice(0, -1).join(",").trim());
              setDistrict(parts[parts.length - 1].trim());
              setLabel(item.label);
              setEditingId(item._id);
              setModalVisible(true);
            }}
          >
            <MaterialIcons
              name="edit"
              size={24}
              color="#1E40AF"
              style={{ marginLeft: 12 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {i18n.t("delivery_addresses", { lng: language })}
      </Text>

      {addresses.length === 0 && (
        <Text style={styles.emptyText}>
          <Ionicons name="location-outline" size={18} /> No addresses added
        </Text>
      )}

      <FlatList
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={renderAddress}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* ➕ Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Address</Text>
      </TouchableOpacity>

      {/* 🪟 Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingId ? "Edit Address" : "Add Address"}
            </Text>

            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Label (Home, Office)"
                value={label}
                onChangeText={setLabel}
              />

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={district}
                  onValueChange={(value) => setDistrict(value)}
                >
                  <Picker.Item label="Select District" value="" />
                  {DISTRICTS_SL.map((d) => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>

              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Street / Area"
                value={street}
                onChangeText={setStreet}
                multiline
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveAddress}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveText}>
                    {editingId ? "Update Address" : "Save Address"}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeliveryAddressScreen;

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1E40AF" },
  cardDetails: { fontSize: 14, color: "#374151", marginTop: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#1E40AF",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  pickerWrapper: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  saveText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  cancelText: { color: "#374151", fontWeight: "600", textAlign: "center" },

  defaultCard: {
    borderWidth: 2,
    borderColor: "#1E40AF",
    backgroundColor: "#EEF2FF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  defaultBadge: {
    backgroundColor: "#1E40AF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
