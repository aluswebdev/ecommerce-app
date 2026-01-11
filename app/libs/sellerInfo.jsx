import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { formatDate } from "../config/formatDate";

const { width, height } = Dimensions.get("window");

const SellerInfoModal = ({ isVisible, onClose, seller }) => {
  const handleMessage = () => Linking.openURL(`https://wa.me/${seller.phone}`);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isVisible}
          onBackdropPress={onClose}
          onSwipeComplete={onClose}
          swipeDirection={"down"}
          propagateSwipe={true}
          style={{ margin: 0 }}
          backdropOpacity={0.5}
          customBackdrop={
            <View style={{ flex: 1, height: height * 0.4, width: width }} />
          }
        >
          <View
            className="bg-neutral-900 rounded-t-3xl pt-3 pb-6 px-5 justify-end"
            style={{ flex: 1 }}
          >
  
            <View className="items-center mb-3">
              <View className="w-14 h-1.5 bg-gray-700 rounded-full" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
  
              <View className="flex-column items-center justify-center space-y-4 mb-4">
                <Image
                  source={{ uri: seller.profilePhoto }}
                  className="w-20 h-20 rounded-full bg-gray-600 mb-2"
                />
                <View>
                  <Text className="text-white font-semibold text-base text-center text-wider">
                    {seller.fullName}
                  </Text>
                  <Text className="text-primary text-sm">
                    {seller.feedback.total}%{" "}
                    <Text className="text-white">Positive Feedback</Text>
                  </Text>

                  <View className="flex-row items33-center justify-center mt-2">
                    <Text className="text-white">Review</Text>
                    <Text className="text-primary">
                      ({seller.feedback.positive})
                    </Text>
                  </View>
                </View>
              </View>

  
              <Text className="text-white mb-2 uppercase">SEller info</Text>
              <View className="flex-row items-center space-x-3 mb-3 gap-3">
                <View className="flex-row items-center gap-2">
                  <Feather name="calendar" size={16} color="#ccc" />
                  <Text className="text-white text-md">Joined:</Text>
                </View>

                <Text className="text-primary">
                  {formatDate(seller.joinedAt)}
                </Text>
              </View>

              <View className="flex-row items-center space-x-3 mb-4">
                <Ionicons name="location-outline" size={16} color="#ccc" />
                <Text className="text-gray-400 text-sm">
                  City:{" "}
                  <Text className="text-primary ml-2">
                    {seller.location.city}
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center space-x-3 mb-4">
                <Ionicons name="location-outline" size={16} color="#ccc" />
                <Text className="text-gray-400 text-sm">
                  Region:{" "}
                  <Text className="text-primary ml-2">
                    {seller.location.region}
                  </Text>
                </Text>
              </View>

     
              
              <Text className="text-white text-sm leading-5 mb-6">
              BIO
              </Text>

      
              <TouchableOpacity className="bg-blue-500 rounded-full py-3 items-center mb-3">
                <Text className="text-white font-semibold text-base">
                  Seller’s other items ({seller.otherItemsCount})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleMessage}
                className="border border-blue-500 rounded-full py-3 items-center"
              >
                <Text className="text-blue-500 font-semibold text-base">
                  Contact seller
                </Text>
              </TouchableOpacity>

              <Text className="text-gray-500 text-xs mt-6">
                Registered as a business seller
              </Text>

         
              <Text className="text-white font-bold text-base mt-6 mb-2">
                Detailed seller ratings
              </Text>
              <Text className="text-gray-400 text-sm mb-8">
                Average for the last 12 months
              </Text>
            </ScrollView>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SellerInfoModal;
