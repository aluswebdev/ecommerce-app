import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import i18n from "../language/i18n";

const BuyerLanguage = ({ styles }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => router.push("../language/languageScreen")} // 👈 navigate to /language
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <MaterialIcons name="language" size={24} color="#1E40AF" />
        </View>
        <View style={styles.menuContent}>
          <View style={styles.menuTitleRow}>
            <Text style={styles.menuTitle}>Language</Text>
            <Text style={styles.menuValue}>
              {i18n.locale === "kr"
                ? "Krio"
                : i18n.locale === "men"
                  ? "Mende"
                  : "English"}
            </Text>
          </View>
          <Text style={styles.menuSubtitle}>English, Krio, Mende</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

export default BuyerLanguage;
