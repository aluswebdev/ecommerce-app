// app/VerifyEmailScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { userAuthStore } from "../store/userStore"; // Assume same logic
import Toast from "react-native-toast-message";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native"

const {width, height} = Dimensions.get("window")

const VerifyEmailScreen = () => {
    return  <View style={[styles.lottie, {flex: 1}]}>
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView>
      <Onboarding
        containerStyles={{ paddingHorizontal: 15 }}
        showPagination={false}      
        showDone={false}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <Lottie
                style={styles.lottie}
                source={require("../../assets/animation/emnew.json")}
                autoPlay
                loop
              />
            ),
            title: <EmailVerifyComp />,
            
          },
        ]}
        />
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
  
};

const EmailVerifyComp = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigation = useNavigation();

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //   const { verifyEmailToken, error, isLoading } = userAuthStore();

    const handleChanged = (index, value) => {
      const newCode = [...code];
      if (value.length > 1) {
        const chars = value.slice(0, 6).split("");
        for (let i = 0; i < 6; i++) {
          newCode[i] = chars[i] || "";
        }
        setCode(newCode);
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();
      } else {
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }
    };

    const handleKeydown = (index, key) => {
      if (key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };

    const handleSubmit = async () => {
      const verificationToken = code.join("");
      try {
        // await verifyEmailToken(verificationToken);
        Toast.show({ type: "success", text1: "Email verified successfully" });
        navigation.navigate("Forum");
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    useEffect(() => {
      if (code.every((digit) => digit !== "")) {
        Keyboard.dismiss();
        handleSubmit();
      }
    }, [code]);

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Verify Your Email</Text>
        <Text style={styles.subText}>
          Enter the 6-digit verification code sent to your email address.
        </Text>

        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChanged(index, text)}
              onKeyPress={({ nativeEvent }) =>
                handleKeydown(index, nativeEvent.key)
              }
            />
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            isLoading || code.some((d) => !d) ? styles.disabled : {},
          ]}
          onPress={handleSubmit}
          disabled={isLoading || code.some((digit) => !digit)}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Verifying..." : "Verify Email"}
          </Text>
        </TouchableOpacity>
        <Toast />
      </View>
    );
}


export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
    // backgroundColor: "#F2F4F7",
  },

lottie:{
    width: width * 0.9,
    height: width,
},

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 12,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: "#E6F0FB",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 8,
    backgroundColor: "#E6F0FB",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
