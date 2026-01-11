// ✅ components/Button.js

import { View, Text, TouchableOpacity, TextInput} from 'react-native';



export const Button = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} className="bg-primary py-3 px-6 rounded-xl">
    <Text className="text-white text-center font-semibold">{label}</Text>
  </TouchableOpacity>
);

// ✅ components/TextInput.js

export const TextInputC = ({ placeholder, value, onChangeText }) => (
  <TextInput
    className="border border-gray-300 rounded-xl p-3 text-text bg-white"
    placeholder={placeholder}
    placeholderTextColor="#64748b"
    value={value}
    onChangeText={onChangeText}
  />
);


// ✅ components/Badge.js

export const Badge = ({ label }) => (
  <View className="bg-success px-3 py-1 rounded-full">
    <Text className="text-white text-xs font-medium">{label}</Text>
  </View>
);

