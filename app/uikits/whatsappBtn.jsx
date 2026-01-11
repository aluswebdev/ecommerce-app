import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/productDEtailStyle";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const ButtonGroup = ({ product }) => {
  const seller = product?.seller;
  const phoneNumber = seller?.phoneNumber;
  const productTitle = product?.title;
  const productPrice = product?.price;
  const productImage = product?.images?.[0]; 
  const whatsappMessage = `Hello *${seller?.fullName}*, I'm interested in your product\n\n *Product:* 🛍️ _${productTitle}_\n\n💵 *Price:* ${productPrice}\n\n. 🖼️ *Image:* ${productImage}\n\nPlease let me know if it's still available thank you!!.`;

  const handleWhatsApp = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Seller phone number not available.");
      return;
    }

    Alert.alert(
      "Continue to WhatsApp?\n\n",
      `You're about to contact the seller\n\n 👤 ${seller?.fullName.toUpperCase()}\n\n via WhatSapp\n\n For this product\n\n🛍️ Product: ${productTitle}\n\n💵 Price: ${productPrice}\n\nMake sure to review the product details before chatting`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () => {
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`;
            Linking.openURL(url).catch(() => {
              Alert.alert(
                "Error",
                "Could not open WhatsApp link. Check your internet connection."
              );
            });
          },
        },
      ]
    );
  };

 const handleCall = () => {
   if (!phoneNumber) {
     Alert.alert("Error", "Seller phone number not available.");
     return;
   }

   Alert.alert(
     "📞 Call Seller?",
  `You're about to call the seller\n\n 👤 ${seller?.fullName.toUpperCase()}\n\n 📱 Number: ${phoneNumber}\n\n For this product\n\n🛍️ Product: ${productTitle}\n\n💵 Price: ${productPrice}\n\nMake sure to mention the product above you want to buy`,
     [
       { text: "Cancel", style: "cancel" },
       {
         text: "Call",
         onPress: () => {
           Linking.openURL(`tel:${phoneNumber}`)
             .then(() => {
           
               Toast.show({
                 type: "info",
                 text1: "Call Started",
                 text2: "Don’t forget to ask about availability and price.",
               });
             })
             .catch(() => {
               Alert.alert(
                 "Error",
                 "Could not make the call. Check your phone settings."
               );
             });
         },
       },
     ]
   );
 };


  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        onPress={handleWhatsApp}
        style={[styles.buttonFlex, { backgroundColor: "#25D366" }]}
      >
        <Ionicons name="logo-whatsapp" size={20} color="#fff" />
        <Text style={styles.buttonText}>WhatsApp Seller</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCall}
        style={[styles.buttonFlex, { backgroundColor: "#0057b8" }]}
      >
        <Ionicons name="call" size={20} color="#fff" />
        <Text style={styles.buttonText}>Call Seller</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonGroup;

