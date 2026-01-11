import { View } from "react-native";
import { Text } from "./Text";

const ProductCondition = ({productLower}) => {
  const checkCondition =
    productLower === "new" ? (
      <View className="bg-green-100 px-2 py-0.5 rounded-md self-start">
        <Text className="text-green-700 font-medium text-[11px]">
          {productLower}
        </Text>
      </View>
    ) : productLower === "used" ? (
      <View className="border border-gray-300 px-2 py-0.5 rounded-md self-start">
        <Text className="text-gray-600 font-medium text-[11px]">
          {productLower}
        </Text>
      </View>
    ) : productLower === "refurbished" ? (
      <View className="bg-amber-100 px-2 py-0.5 rounded-md self-start">
        <Text className="text-amber-700 font-medium text-[11px]">
          {productLower}
        </Text>
      </View>
    ) : (
      <Text className="text-gray-400 text-xs">condition: N/A</Text>
    );
  return checkCondition;
};

export default ProductCondition;
