// toastConfig.js
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={props.text2NumberOfLines || 6}
      style={{
        borderLeftColor: "#ef4444",
        borderRadius: 10,
        backgroundColor: "#fee2e2",
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 10, // ✅ ADD IT HERE
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#991b1b",
      }}
      text2Style={{
        fontSize: 14,
        color: "#991b1b",
        flexWrap: "wrap",
      }}
    />
  ),

  success: (props) => (
    <BaseToast
      {...props}
      text2NumberOfLines={props.text2NumberOfLines || 4}
      style={{
        borderLeftColor: "#22c55e",
        borderRadius: 10,
        backgroundColor: "#dcfce7",
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10, // ✅ SAME HERE
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#166534",
      }}
      text2Style={{
        fontSize: 14,
        color: "#166534",
        flexWrap: "wrap",
      }}
    />
  ),
};
