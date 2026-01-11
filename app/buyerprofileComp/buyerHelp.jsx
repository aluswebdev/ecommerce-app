import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const BuyerHelp = ({ styles }) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => router.push("../buyerProfileNav/helpAndSupport")}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <MaterialIcons name="help" size={24} color="#1E40AF" />
        </View>
      <View style={styles.menuContent}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>Help and support</Text>
        </View>
        <Text style={styles.menuSubtitle}>FAQ, contact us, report issues</Text>
      </View>
    </View>

    <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
  </TouchableOpacity>
);
};

export default BuyerHelp;
