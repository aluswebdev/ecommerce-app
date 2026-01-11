import Carousel from "react-native-reanimated-carousel";
import { Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");

export default function ProductImageSlider({ images }) {
  return (
    <Carousel
      width={width}
      height={width}
      data={images}
      scrollAnimationDuration={300}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          className="w-full h-48 rounded-t-xl"
          resizeMode="cover"
        />
      )}
    />
  );
}
