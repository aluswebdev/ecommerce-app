import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const TypingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="px-4 pb-2">
      <Text className="text-gray-400 text-sm">typing{dots}</Text>
    </View>
  );
};

export default React.memo(TypingDots);
