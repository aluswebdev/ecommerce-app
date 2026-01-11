import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import {useRouter} from "expo-router";

const UserAddress = ({ styles }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("../buyerProfileNav/deliveryAddress");
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
        <MaterialIcons name="location-on" size={24} color="#1E40AF" />
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>Delivery Addresses</Text>
        </View>
        <Text style={styles.menuSubtitle}>Manage your saved addresses</Text>
      </View>
    </View>

    <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
  </TouchableOpacity>
);
}
export default UserAddress;
