import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import { useCategoryStore } from "../zustand/seller/useCategoryStore";
import { useProductFormStore } from "../zustand/seller/useProductFormStore";
import { Select } from "../sellerComponentUI/select";
import { Loader } from "../sellerComponentUI/loader";
import { ErrorView } from "../sellerComponentUI/errorView";
import { Picker } from "@react-native-picker/picker";
import ImagePicker from "react-native-image-crop-picker";
import { Ionicons } from "@expo/vector-icons";
import useProductStore from "../zustand/seller/createProductStore";
import { Text } from "../reusableComponent/Text";
// import { useSearchParams } from "expo-router";
// import { useSellerStore } from "../zustand/seller/getSellerProducts";
import { useProductIdStore } from "../zustand/public/useProductIdStore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const params = useLocalSearchParams();
  const { fetchProductById, product } = useProductIdStore();
  const { createProduct, isLoading, message, updateProduct } =
    useProductStore();
  const [shippingFree, setShippingFree] = useState(true); //
  const { categories, loading, error, fetchCategories } = useCategoryStore();
  const {
    selectedCategory,
    selectedSubcategory,
    formData,
    setCategory,
    setSubcategory,
    setFieldValue,
    validate,
  } = useProductFormStore();

  useFocusEffect(
    useCallback(() => {
      if (params.id) {
        fetchProductById(params.id); // always fetch fresh data
      }
    }, [params.id, fetchProductById])
  );

  // ✅ Sync form whenever product changes
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: String(product.price || ""),
        discountPrice: String(product.discountPrice || ""),
        stock: String(product.stock || ""),
        sku: product.sku || "",
        location: product.location || "",
        deliveryOptions: product.deliveryOptions || "",
        images: product.images.url || [],
      });
    }
  }, [product, setSubcategory]); // runs whenever product updates

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    location: "",
    deliveryOptions: "",
    images: [],
  });

  const [locationForm, setLocationForm] = useState({
    location: {
      city: "",
      region: "",
    },
  });

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const [shipping, setShipping] = useState({
    shippings: {
      estimatedDays: "",
      shippingLocation: "",
    },
  });

  const handleShipping = (field, value) => {
    setShipping((prev) => ({
      ...prev,
      shippings: {
        ...prev.shippings,
        [field]: value,
      },
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocationForm((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  // Fetch categories once; cancel request if unmounted
  useEffect(() => {
    const ctr = new AbortController();
    fetchCategories({ signal: ctr.signal }).catch(() => {});
    return () => ctr.abort();
  }, [fetchCategories]);

  const categoryOptions = useMemo(
    () => categories?.map((c) => ({ label: c.name, value: c })),
    [categories]
  );

  const subcategoryOptions = useMemo(
    () =>
      (selectedCategory?.subcategories || []).map((s) => ({
        label: s.name,
        value: s,
      })),
    [selectedCategory]
  );

  // modify code

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const pickImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: true,
      includeBase64: true,
      mediaType: "photo",
    })

      .then((images) => {
        const formatted = images
          .filter((img) => img && img.data) // ✅ check img exists and has data
          .map((img) => `data:${img.mime || "image/jpeg"};base64,${img.data}`);

        if (!formatted.length) {
          Alert.alert("Error", "No valid images were selected");
          return;
        }

        setForm((prev) => ({
          ...prev,
          images: [...prev.images, ...formatted].slice(0, 4),
        }));
      })
      .catch((err) => {
        if (err.code !== "E_PICKER_CANCELLED") {
          console.error(err);
          Alert.alert("Error", "Image selection failed");
        }
      });
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, `data:${image.mime};base64,${image.data}`],
        }));
      })
      .catch((err) => {
        if (err.code !== "E_PICKER_CANCELLED") {
          Alert.alert("Error", "Camera capture failed");
        }
      });
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    // }
  };

  const handleSubmit = async () => {
    const { valid, missing } = validate();
    if (!valid) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: missing.join(", "),
      });
      return;
    }

    const payload = {
      category: selectedCategory.name,
      subcategory: selectedSubcategory?.name,
      attributes: formData,
      ...form,
      tags,
      ...locationForm,
      ...shipping,
      shippingFree,
      // Add common fields like title, price, images, etc. from other UI parts
    };

    try {
      if (params.id) {
        await updateProduct(params.id, payload);
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: message || "Product updated successfully",
          position: "top",
        });
      } else {
        await createProduct(payload);
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: message || "Product created successfully",
          position: "top",
        });
      }
    } catch (err) {
      // ✅ Show error toast if something went wrong
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.response?.data?.message || "Something went wrong",
        position: "top",
      });
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ padding: 16 }} className="mb-20">
          <Text className="font-heading text-center mb-5 mt-2">
            {params.id ? "Edit Product" : "Create Product"}
          </Text>

          <TextInput
            className="font-body"
            placeholder="Title*"
            style={styles.input}
            value={form.title}
            onChangeText={(v) => handleChange("title", v)}
            placeholderTextColor="#888888"
          />
          <TextInput
            className="font-body"
            placeholder="Description*"
            style={[styles.input, { height: 100 }]}
            multiline
            value={form.description}
            onChangeText={(v) => handleChange("description", v)}
            placeholderTextColor="#888888"
          />

          {loading && <Loader />}
          {error && <ErrorView message={error} />}

          <View style={styles.container}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
              dropdownIconColor="#555" // Android arrow color
            >
              <Picker.Item
                label="Select category"
                value=""
                color="#888888"
                className="font-body"
              />
              {categoryOptions.map((cat) => (
                <Picker.Item
                  key={cat.value}
                  label={cat.label}
                  value={cat.value}
                />
              ))}
            </Picker>
          </View>

          {selectedCategory && (
            <View style={styles.container}>
              <Picker
                selectedValue={selectedSubcategory}
                onValueChange={(itemValue) => setSubcategory(itemValue)}
                style={styles.picker}
                dropdownIconColor="#555" // Android arrow color
              >
                <Picker.Item
                  label="Select subcategory"
                  value=""
                  color="#888888"
                />
                {subcategoryOptions.map((subcat) => (
                  <Picker.Item
                    key={subcat.value}
                    label={subcat.label}
                    value={subcat.value}
                  />
                ))}
              </Picker>
            </View>
          )}

          {selectedSubcategory?.fields?.map((field) => (
            <View key={field.key} style={{ marginVertical: 8 }}>
              <Text
                style={{ marginBottom: 6 }}
                className="flex-row items-center gap-5"
              >
                <Text>{field.name}</Text>
                {field.required ? (
                  <Text className="ml-5 text-red-600">*</Text>
                ) : (
                  ""
                )}
              </Text>

              {field.type === "select" ? (
                <Select
                  label=""
                  value={formData[field.key] ?? null}
                  onChange={(v) => setFieldValue(field.key, v)}
                  options={(field.options || []).map((o) => ({
                    label: o,
                    value: o,
                  }))}
                  placeholder="Choose..."
                  className="border p-2 mb-2 rounded border-primary text-[#000] bg-gray-600 font-body"
                />
              ) : (
                <TextInput
                  value={String(formData[field.key] ?? "")}
                  onChangeText={(t) => setFieldValue(field.key, t)}
                  keyboardType={field.type === "number" ? "numeric" : "default"}
                  placeholder={field.name}
                  className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
                  placeholderTextColor="#888888"
                />
              )}
            </View>
          ))}

          <TextInput
            placeholder="Price*"
            keyboardType="numeric"
            className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
            value={form.price}
            onChangeText={(v) => handleChange("price", v)}
            placeholderTextColor="#888888"
          />

          <TextInput
            placeholder="Discount Price"
            keyboardType="numeric"
            className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
            value={form.discountPrice}
            onChangeText={(v) => handleChange("discountPrice", v)}
            placeholderTextColor="#888888"
          />
          <TextInput
            placeholder="Stock*"
            keyboardType="numeric"
            className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
            value={form.stock}
            onChangeText={(v) => handleChange("stock", v)}
            placeholderTextColor="#888888"
          />

          <View style={styles.tagInputRow}>
            <TextInput
              placeholder="Enter a tag"
              value={tagInput}
              onChangeText={setTagInput}
              className="border p-2 mb-2 rounded border-primary text-[#000] flex-1 font-body"
              placeholderTextColor="#888888"
            />
            <TouchableOpacity onPress={addTag} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          {/* display tags */}

          <FlatList
            className="font-body"
            data={tags}
            keyExtractor={(item) => item}
            horizontal
            style={{ marginTop: 2, marginBottom: 9 }}
            renderItem={({ item }) => (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
                <TouchableOpacity onPress={() => removeTag(item)}>
                  <Text style={styles.removeTag}>×</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <TextInput
            placeholder="SKU"
            // style={styles.input}
            className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
            value={form.sku}
            onChangeText={(v) => handleChange("sku", v)}
            placeholderTextColor="#888888"
          />

          <Text className="font-semibold text-base mt-2 mb-1">CIty</Text>
          <TextInput
            className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
            placeholder="city where your business is"
            placeholderTextColor="#888888"
            onChangeText={(text) => handleLocationChange("city", text)}
          />

          <Text className="text-base mt-2 mb-1">Region</Text>
          <TextInput
            className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
            placeholder="the region"
            placeholderTextColor="#888888"
            onChangeText={(text) => handleLocationChange("region", text)}
          />

          {/* Shipping Info */}
          <Text className="text-base mt-2 mb-1">Pay or Free Delivery </Text>
          <Pressable
            onPress={() => setShippingFree(!shippingFree)}
            className={`p-2 rounded mb-2 ${
              shippingFree ? "bg-green-100" : "bg-red-100"
            } font-body`}
          >
            <Text className="text-center">
              {shippingFree ? "✅ Free Delivery Enabled" : "❌ Paid Delivery"}
            </Text>
          </Pressable>

          <Text className="font-semibold text-base mt-2 mb-1">
            Estimated Time To Delivery
          </Text>
          <TextInput
            className="border p-2 mb-2 rounded border-primary text-[#000] font-body"
            placeholder="Estimated Delivery Days"
            keyboardType="numeric"
            value={shipping}
            placeholderTextColor="#888888"
            onChangeText={(text) => handleShipping("estimatedDays", text)}
          />

          <Text className="text-base mt-2 mb-1">
            Location Where Delivery Will Be Available
          </Text>
          <TextInput
            className="border p-2 mb-4 rounded border-primary text-[#000] font-body"
            placeholder="Delivery Location"
            value={shipping}
            placeholderTextColor="#888888"
            onChangeText={(text) => handleShipping("shippingLocation", text)}
          />

          <TextInput
            className="font-body"
            placeholder="Delivery Options"
            style={styles.input}
            value={form.deliveryOptions}
            onChangeText={(v) => handleChange("deliveryOptions", v)}
            placeholderTextColor="#888888"
          />

          {/* image picker */}

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={pickImages}
              style={[styles.btn, { backgroundColor: "#007bff" }]}
            >
              <Text style={{ color: "#fff" }}>
                <Ionicons name="images" size={22} color="" /> Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePhoto}
              style={[styles.btn, { backgroundColor: "green" }]}
            >
              <Text style={{ color: "#fff" }} className="items-center">
                <Ionicons name="camera-reverse" size={18} color="" /> Camera
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal>
            {form.images.map((img, index) => (
              <View
                key={index}
                style={{ position: "relative", marginRight: 5 }}
              >
                <Image
                  source={{ uri: img }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
                <TouchableOpacity ///home/alusine/PROPJECT/SL-MARKET/backend/controllers/seller/sellerProducts.controller.js:124:20
                  onPress={() => removeImage(index)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: 2,
                    borderRadius: 50,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 12 }}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {selectedSubcategory && (
            // <View style={{ marginTop: 16 }}>text-[#fff]
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-600 p-3 flex items-center justify-center text-[#fff] rounded-full mt-5"
            >
              <Text className="text-center text-[#fff]">
                {isLoading ? (
                  <ActivityIndicator />
                ) : params.id ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Text>
            </TouchableOpacity>
            // </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    marginVertical: 8,
  },
  picker: {
    height: 55,
    color: "#000", // selected item text color
    paddingHorizontal: 12,
  },

  input: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    color: "#000",
  },
  btn: { padding: 10, borderRadius: 6, alignItems: "center", marginRight: 10 },

  tagInputRow: { flexDirection: "row", alignItems: "center" },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: -9,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  tagText: { marginRight: 6 },
  removeTag: { color: "#888", fontWeight: "bold", fontSize: 16 },
});
