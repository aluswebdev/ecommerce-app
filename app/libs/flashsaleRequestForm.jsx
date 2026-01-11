import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

// components/FlashSaleRequestForm.js
export default function FlashSaleRequestForm({ productId }) {
  const [discount, setDiscount] = useState("");
  const [duration, setDuration] = useState("");
const sellerToken = "6764hhfyrh88596imgk99"
  const submitRequest = async () => {
    const res = await fetch(
      `https://yourapi.com/seller/products/${productId}/request-promo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sellerToken}`,
        },
        body: JSON.stringify({
          type: "flashSale",
          discount: parseInt(discount),
          duration: parseInt(duration),
        }),
      }
    );

    const data = await res.json();
    alert(data.message || "Request submitted");
  };

  return (
    <View>
      <Text>Request Flash Sale</Text>
      <TextInput
        placeholder="Discount %"
        value={discount}
        onChangeText={setDiscount}
      />
      <TextInput
        placeholder="Duration (days)"
        value={duration}
        onChangeText={setDuration}
      />
      <TouchableOpacity onPress={submitRequest} className="bg-primary" >
        <Text>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
}
