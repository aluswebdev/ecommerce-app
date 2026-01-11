import React, { useState } from "react";
import { View, Text, Image } from "react-native";

export default function ProfileAvatar({ user, size = 96 }) {
  const [imageError, setImageError] = useState(false);
  // initials fallback
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  if (!user) return null;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      className="overflow-hidden items-center justify-center bg-gray-400"
    >
      {!imageError && user?.profilePhoto ? (
        <Image
          source={{ uri: user?.profilePhoto?.url }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          onError={() => setImageError(true)}
        />
      ) : (
        <Text
          style={{
            color: "#0057b8",
            fontWeight: "bold",
            fontSize: size / 3, // scale text based on size
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}
