// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Platform,
//   useColorScheme,
//   Image,
// } from "react-native";

// export const Logo = ({ size = "medium" }) => {
//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === "dark";

//   const primary = isDark ? "#FFFFFF" : "#0057B8";
//   const accent = isDark ? "#38BDF8" : "#007FFF";
//   const taglineColor = isDark ? "#CBD5E1" : "#6B7280";

//   const isLarge = size === "large";
//   const isMedium = size === "medium";
//   const boxSize = isLarge ? 64 : isMedium ? 44 : 32;
//   const fontSize = isLarge ? 26 : isMedium ? 18 : 14;

//   const styles = StyleSheet.create({
//     container: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "center",
   
//     },
//     icon: {
//       width: boxSize,
//       height: boxSize,
//       borderRadius: 14,
//       backgroundColor: primary,
//       justifyContent: "center",
//       alignItems: "center",
//       marginRight: 10,
//       ...Platform.select({
//         ios: {
//           shadowColor: "#000",
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.15,
//           shadowRadius: 4,
//         },
//         android: { elevation: 4 },
//       }),
//     },
//     cartHandle: {
//       position: "absolute",
//       top: boxSize * 0.18,
//       width: boxSize * 0.5,
//       height: boxSize * 0.12,
//       backgroundColor: accent,
//       borderTopLeftRadius: boxSize * 0.2,
//       borderTopRightRadius: boxSize * 0.2,
//     },
//     cartBody: {
//       width: boxSize * 0.55,
//       height: boxSize * 0.45,
//       backgroundColor: accent,
//       borderRadius: 5,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     cartLetter: {
//       fontWeight: "800",
//       color: "#fff",
//       fontSize: isLarge ? 18 : isMedium ? 13 : 10,
//       letterSpacing: 0.5,
//     },
//     brandText: {
//       fontSize,
//       fontWeight: "800",
//       color: primary,
//       letterSpacing: 0.8,
//     },
//     tagline: {
//       fontSize: isLarge ? 12 : isMedium ? 10 : 8,
//       color: taglineColor,
//       fontWeight: "500",
//       marginTop: -2,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/images/slt.png")}
//         style={{ width: 100, height: 100, marginTop: -30 }}
//       />
//     </View>
//   );
// };
