// components/OrderTimeline.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

const OrderTimeline = ({ currentStatus }) => {
  const currentIndex = STEPS.indexOf(currentStatus || "Pending");

  return (
    <View style={styles.container}>
      {STEPS.map((step, i) => {
        const active = i <= currentIndex;
        return (
          <View key={step} style={styles.stepRow}>
            <View style={[styles.circle, active && styles.circleActive]}>
              <Text
                style={[styles.circleText, active && styles.circleTextActive]}
              >
                {i + 1}
              </Text>
            </View>
            <View style={styles.stepInfo}>
              <Text
                style={[styles.stepTitle, active && styles.stepTitleActive]}
              >
                {step}
              </Text>
            </View>
            {i < STEPS.length - 1 && (
              <View style={[styles.line, active && styles.lineActive]} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 12 },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  circleActive: { backgroundColor: "#1e40af", borderColor: "#1e40af" },
  circleText: { color: "#444", fontWeight: "700" },
  circleTextActive: { color: "#fff" },
  stepInfo: { marginLeft: 12, flex: 1 },
  stepTitle: { color: "#666", fontWeight: "600" },
  stepTitleActive: { color: "#111" },
  line: {
    position: "absolute",
    left: 44,
    top: 18,
    height: 2,
    width: "80%",
    backgroundColor: "#eee",
  },
  lineActive: { backgroundColor: "#1e40af" },
});

export default OrderTimeline;
