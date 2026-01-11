import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../utils/ProductCard"; // your reusable product card
import {
  fetchSearchResults,
  fetchSuggestions,
} from "../services/searchService"; // your backend service
import startVoiceSearch1 from "../services/speechrecognition";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / numColumns - 16; 

const SearchScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "iPhone",
    "Laptops",
    "Shoes",
  ]);

  // 🔍 Handle search
  const handleSearch = async (text) => {
    setQuery(text);
    if (!text.trim()) {
      setSuggestions([]);
      setResults([]);
      return;
    }

    try {
      const res = await fetchSuggestions(text);
      setSuggestions(res);
    } catch (error) {
      console.error("Suggestion fetch error:", error);
    }
  };

  // 🚀 Perform actual search
  const performSearch = async () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await fetchSearchResults(query);
      setResults(res);
      if (!recentSearches.includes(query)) {
        setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };



  // 🎙️ Voice input
  const startVoiceSearch = async () => {
    // Speech.speak("What would you like to search for?");
    // You can later replace this with `expo-speech-to-text` for real input
    await startVoiceSearch1(setQuery);
  };

  // ✨ Render single product
  const renderItem = ({ item }) => (
    <View style={{ width: itemWidth, margin: 4 }}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 🔹 Header Search Bar */}
      <View className="flex-row items-center mx-4 mt-3 mb-2 bg-gray-100 rounded-full px-3 py-2 shadow-sm">
        <Ionicons name="search-outline" size={22} color="#1E3A8A" />
        <TextInput
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={performSearch}
          placeholder="Search products..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-base text-gray-800 ml-2"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={startVoiceSearch}>
          <Ionicons
            name="mic-outline"
            size={22}
            color="#1E3A8A"
            className="ml-3"
          />
        </TouchableOpacity>
      </View>

      {/* 🧭 Filter / Sort */}
      <View className="flex-row justify-between items-center mx-4 mb-3">
        <TouchableOpacity
          onPress={() => router.push("/(buyer)/filters")}
          className="flex-row items-center bg-primary/10 px-4 py-2 rounded-full"
        >
          <MaterialIcons name="tune" size={20} color="#1E3A8A" />
          <Text className="ml-2 text-primary font-medium">Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full">
          <MaterialIcons name="sort" size={20} color="#1E3A8A" />
          <Text className="ml-2 text-primary font-medium">Sort</Text>
        </TouchableOpacity>
      </View>

      {/* 🕵️ Suggestions */}
      {suggestions.length > 0 && !loading && results.length === 0 && (
        <View className="px-4">
          <Text className="text-gray-500 mb-2">Suggestions</Text>
          {suggestions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setQuery(item);
                performSearch();
              }}
              className="py-2 border-b border-gray-100 flex-row items-center"
            >
              <Ionicons name="time-outline" size={18} color="#9CA3AF" />
              <Text className="ml-2 text-gray-800">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 🕘 Recent Searches */}
      {recentSearches.length > 0 &&
        query.length === 0 &&
        results.length === 0 && (
          <View className="px-4 mt-2">
            <Text className="text-gray-500 mb-2">Recent Searches</Text>
            <View className="flex-row flex-wrap">
              {recentSearches.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setQuery(item);
                    performSearch();
                  }}
                  className="bg-gray-100 px-4 py-2 rounded-full mr-2 mb-2"
                >
                  <Text className="text-gray-700">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

      {/* 🛍️ Results */}
      <View className="flex-1">
        {loading ? (
          <ActivityIndicator size="large" color="#1E3A8A" className="mt-10" />
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.productGrid}
          />
        ) : (
          query.length > 0 && (
            <View className="items-center justify-center mt-20">
              <Ionicons name="search-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-3 text-center">
                No products found for “{query}”
              </Text>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  productGrid: {
    paddingHorizontal: 8,
    paddingBottom: 56,
  },
  productItem: {
    width: "48%",
    marginBottom: 16,
  },
});
