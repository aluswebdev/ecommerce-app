import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const BuyerFavorites = ({ styles, wishListLength }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("../(buyer)/wishlist");
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <MaterialIcons name="favorite" size={24} color="#1E40AF" />
        </View>
        <View style={styles.menuContent}>
          <View style={styles.menuTitleRow}>
            <Text style={styles.menuTitle}>My Favorites</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{wishListLength}</Text>
            </View>
          </View>
          <Text style={styles.menuSubtitle}>Your wishlist and saved items</Text>
        </View>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

export default BuyerFavorites;
