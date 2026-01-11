import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
}) => {
  return (
    <View style={{ marginVertical: 8 }}>
      <Text className="text-black mb[-9]">{label}</Text>
      <View className="border rounded border-primary text-[#000] mt-[-18/]">
        <Picker selectedValue={value} onValueChange={(v) => onChange(v)} style={{color: "black"}}>
          <Picker.Item label={placeholder} value={null} color="#888888" />
          {options.map((o, i) => (
            <Picker.Item
              key={`${o.label}-${i}`}
              label={o.label}
              value={o.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};
