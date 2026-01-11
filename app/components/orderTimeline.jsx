// components/OrderTimeline.js
import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const statusSteps = [
  { label: "Pending", icon: "clock-o", color: "#9CA3AF" }, // gray
  { label: "Processing", icon: "cogs", color: "#3B82F6" }, // blue
  { label: "Shipped", icon: "truck", color: "#F97316" }, // orange
  { label: "Delivered", icon: "check-circle", color: "#10B981" }, // green
];

const OrderTimeline = ({ status }) => {
  const currentStepIndex = statusSteps.findIndex((s) => s.label === status);

  return (
    <View className="flex-row justify-between items-center mt-4">
      {statusSteps.map((step, index) => {
        const isActive = index <= currentStepIndex;
        return (
          <View key={step.label} className="flex-1 items-center relative">
            {/* Circle with Icon */}
            <View
              className="w-10 h-10 rounded-full justify-center items-center"
              style={{ backgroundColor: isActive ? step.color : "#E5E7EB" }}
            >
              <FontAwesome name={step.icon} size={20} color="white" />
            </View>

            {/* Label */}
            <Text
              className="text-xs mt-2"
              style={{ color: isActive ? step.color : "#9CA3AF" }}
            >
              {step.label}
            </Text>

            {/* Connector Line */}
            {index < statusSteps.length - 1 && (
              <View
                className="absolute top-5 right-0 h-1 flex-1"
                style={{
                  backgroundColor:
                    index < currentStepIndex ? step.color : "#E5E7EB",
                  width: "100%",
                  zIndex: -1,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default OrderTimeline;
