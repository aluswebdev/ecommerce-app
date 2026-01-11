import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BuyerSearchHeader({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Search Products</Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close"
              size={20}
              color="#888"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter + Sort Bar */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={16} color="#fff" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sortButton}
          onPress={() =>
            setSortBy((prev) =>
              prev === "featured"
                ? "price-low"
                : prev === "price-low"
                  ? "price-high"
                  : "featured"
            )
          }
        >
          <Ionicons name="swap-vertical" size={16} color="#fff" />
          <Text style={styles.sortText}>
            {sortBy === "featured"
              ? "Featured"
              : sortBy === "price-low"
                ? "Low → High"
                : "High → Low"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>

            <ScrollView>
              <Text style={styles.label}>Sort By</Text>
              <TouchableOpacity onPress={() => setSortBy("featured")}>
                <Text
                  style={
                    sortBy === "featured" ? styles.activeOption : styles.option
                  }
                >
                  Featured
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSortBy("price-low")}>
                <Text
                  style={
                    sortBy === "price-low" ? styles.activeOption : styles.option
                  }
                >
                  Price: Low → High
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSortBy("price-high")}>
                <Text
                  style={
                    sortBy === "price-high"
                      ? styles.activeOption
                      : styles.option
                  }
                >
                  Price: High → Low
                </Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.closeText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 90,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 4 },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  clearIcon: { marginLeft: 4 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filterText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 6,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0057b8",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  sortText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  label: {
    fontWeight: "500",
    marginBottom: 8,
  },
  option: {
    paddingVertical: 8,
    color: "#333",
  },
  activeOption: {
    paddingVertical: 8,
    color: "#E53935",
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#E53935",
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});
