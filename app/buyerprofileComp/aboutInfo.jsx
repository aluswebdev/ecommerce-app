import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import {useRouter} from "expo-router";

const AboutInfo = ({ styles }) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => router.push("../buyerProfileNav/aboutSLEM")}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <MaterialIcons name="info" size={24} color="#1E40AF" />
        </View>
      <View style={styles.menuContent}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>About SLEM</Text>
        </View>
        <Text style={styles.menuSubtitle}>Version 1.0.0</Text>
      </View>
    </View>

    <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
  </TouchableOpacity>
);
}
export default AboutInfo;