import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FeatureGrid() {
  return (
    <View style={styles.grid}>
      {/* Free Delivery Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="car-outline" size={20} color="#0057b8" />
          <View>
            <Text style={styles.title}>Free Delivery</Text>
            <Text style={styles.subtitle}>Within Freetown</Text>
          </View>
        </View>
      </View>

      {/* Secure Payment Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#0057b8" />
          <View>
            <Text style={styles.title}>Secure Payment</Text>
            <Text style={styles.subtitle}>Orange Money & More</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: "48%", // two columns
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
  },
  subtitle: {
    fontSize: 11,
    color: "#666",
  },
});
