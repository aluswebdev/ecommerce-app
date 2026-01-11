import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ShieldCheck, AlertTriangle } from "lucide-react-native";

const PRIMARY = "#1e40af";

export default function PaymentMethodScreen() {
  const [method, setMethod] = useState("protected");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Payment Method</Text>

      {/* Protected Payment */}
      <TouchableOpacity
        style={[styles.card, method === "protected" && styles.active]}
        onPress={() => setMethod("protected")}
      >
        <ShieldCheck color={PRIMARY} size={24} />
        <View style={styles.textWrap}>
          <Text style={styles.cardTitle}>Protected Payment (Recommended)</Text>
          <Text style={styles.desc}>
            Money is released to seller after delivery confirmation.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Direct Payment */}
      <TouchableOpacity
        style={[styles.card, method === "direct" && styles.activeWarning]}
        onPress={() => setMethod("direct")}
      >
        <AlertTriangle color="#f59e0b" size={24} />
        <View style={styles.textWrap}>
          <Text style={styles.cardTitle}>Direct Payment to Seller</Text>
          <Text style={styles.desc}>
            Pay seller directly. Platform cannot protect this payment.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  active: { borderColor: PRIMARY },
  activeWarning: { borderColor: "#f59e0b" },
  textWrap: { marginLeft: 12, flex: 1 },
  cardTitle: { fontWeight: "600" },
  desc: { color: "#6b7280", marginTop: 4 },
  button: {
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 14,
    marginTop: "auto",
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
