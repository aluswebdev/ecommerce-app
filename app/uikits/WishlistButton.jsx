// BookmarkButton.js
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or any icon lib

const WishlistButton = ({ isBookmarked, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-lg"
      style={{ zIndex: 10 }}
    >
      <Ionicons
        name={isBookmarked ? "heart" : "heart-outline"}
        size={22}
        color={isBookmarked ? "#dc143c" : "#999"}
        className="items-center justify-center"
      />
    </TouchableOpacity>
  );
};

export default WishlistButton;
