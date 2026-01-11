import { View } from "react-native";
import { Star, StarHalf } from "lucide-react-native";

export default function RatingStars({ rating, max = 5, size = 14 }) {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (rating >= i) {
      // full star
      stars.push(<Star key={i} size={size} color="gold" fill="gold" />);
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(<StarHalf key={i} size={size} color="gold" fill="gold" />);
    } else {
      // empty star
      stars.push(<Star key={i} size={size} color="lightgray" />);
    }
  }

  return <View className="flex-row items-center">{stars}</View>;
}
