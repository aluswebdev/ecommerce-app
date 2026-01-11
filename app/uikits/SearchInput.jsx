// ✅ components/SearchInput.js

import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

const SearchInput = ({ value, onChangeText }) => {
  return (
    <View className="px-4 bg-primary pt-8 pb-6 rounded-b-3xl ">
      <View className="flex-row items-center bg-white border-2 border-blue-800 rounded-full px-4 py-1 w-full">
        <Search size={20} color="#64748b" />
        <TextInput
          className="ml-2 flex-1 text-base -mb-1.5 border-[#E40AF]"
          placeholder={"Search product by name category....."}
          placeholderTextColor="#64748b"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default SearchInput