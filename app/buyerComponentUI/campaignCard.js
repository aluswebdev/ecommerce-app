// components/CampaignCarousel.js
import React from "react";
import { Dimensions, Image, View, Pressable } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function CampaignCarousel({ campaigns }) {
  const router = useRouter();

  return (
    <View style={{ marginVertical: 12 }}>
      <Carousel
        loop
        width={width}
        height={180}
        autoPlay={true}
        autoPlayInterval={4000}
        data={campaigns}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              if (item.link) {
                router.push(item.link); // navigate to campaign/flash sale page
              }
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 12,
              }}
            />
          </Pressable>
        )}
      />
    </View>
  );
}
