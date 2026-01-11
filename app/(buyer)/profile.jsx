import useAuthStore from "../zustand/authStore";
import BuyerProfileScreen1 from "../components/buyerProfile";
import LoginSignUpNav from "../components/loginSignUpNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const BuyerProfileScreen = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      {isAuthenticated ? <BuyerProfileScreen1 /> : <LoginSignUpNav />}
    </SafeAreaView>
  );
};
export default BuyerProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
