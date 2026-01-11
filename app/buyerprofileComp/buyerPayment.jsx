import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const BuyerPayment = ({ styles }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIcon}>
        <MaterialIcons name="payment" size={24} color="#1E40AF" />
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>Payment Methods</Text>
        </View>
        <Text style={styles.menuSubtitle}>
          Orange Money, QMoney, AfriMoney Bank Cards
        </Text>
      </View>
    </View>

    <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
  </TouchableOpacity>
);

export default BuyerPayment;
