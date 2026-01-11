// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   ScrollView,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Platform,
//   Keyboard,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import DropDownPicker from "react-native-dropdown-picker";
// import { COLORS } from "../src/constant/theme";
// import useProductStore from "../zustand/createProductStore";
// import Toast from "react-native-toast-message";

// const AddProductForm = () => {
//  /

//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [shippingFree, setShippingFree] = useState(true);

//   const [form, setForm] = useState({
//     location: {
//       city: "",
//       region: "",
//     },
//   });

//   const [shipping, setShipping] = useState({
//     shippings: {
//       estimatedDays: "",
//       shippingLocation: "",
//     },
//   });

//   const handleShipping = (field, value) => {
//     setShipping((prev) => ({
//       ...prev,
//       shippings: {
//         ...prev.shippings,
//         [field]: value,
//       },
//     }));
//   };

//   const handleLocationChange = (field, value) => {
//     setForm((prev) => ({
//       ...prev,
//       location: {
//         ...prev.location,
//         [field]: value,
//       },
//     }));
//   };

//   const [open, setOpen] = useState(false);
//   const [category, setCategory] = useState(null);
//   const [value, setValue] = useState([
//     { label: "Electronics", value: "electronics" },
//     { label: "Phones & Tablets", value: "phones_tablets" },
//     { label: "Fashion & Clothing", value: "fashion_clothing" },
//     { label: "Shoes & Sneakers", value: "shoes_sneakers" },
//     { label: "Watches & Accessories", value: "watches_accessories" },
//     { label: "Home Appliances", value: "home_appliances" },
//     { label: "Furniture", value: "furniture" },
//     { label: "Beauty & Personal Care", value: "beauty_personal_care" },
//     { label: "Groceries", value: "groceries" },
//     { label: "Health & Wellness", value: "health_wellness" },
//     { label: "Computers & Laptops", value: "computers_laptops" },
//     { label: "Toys & Games", value: "toys_games" },
//     { label: "Baby Products", value: "baby_products" },
//     { label: "Books & Stationery", value: "books_stationery" },
//     { label: "Sports & Fitness", value: "sports_fitness" },
//     { label: "Automotive", value: "automotive" },
//     { label: "Garden & Outdoor", value: "garden_outdoor" },
//     { label: "Pet Supplies", value: "pet_supplies" },
//     { label: "Musical Instruments", value: "musical_instruments" },
//     { label: "Others", value: "others" },
//   ]);

//   const [conditionOpen, setConditionOpen] = useState(false);
//   const [condition, setCondition] = useState(null);
//   const [conditionValue, setConditionValue] = useState([
//     { label: "NEW", value: "new" },
//     { label: "USED", value: "used" },
//   ]);

//   const [tagsOpen, setTagsOpen] = useState(false);
//   const [tags, setTags] = useState([]);
//   const [tagsValue, setTagsValue] = useState([
//     { label: "New Arrival", value: "new_arrival" },
//     { label: "Limited Stock", value: "limited_stock" },
//   ]);

//   // For one variant
//   const [variantColor, setVariantColor] = useState("");
//   const [imageBase, setImageBase] = useState([]);
//   const [images, setImages] = useState([]);

//   const MAX_IMAGES = 4;

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: "images",
//       allowsMultipleSelection: true,
//       quality: 0.8,
//       base64: true,
//     });

//     if (!result.canceled) {
//       const remainingSlots = MAX_IMAGES - imageBase.length;

//       if (remainingSlots <= 0) {
//         alert(`You can only upload up to ${MAX_IMAGES} images.`);
//         return;
//       }

//       const selected = result.assets.slice(0, remainingSlots);

//       const newImages = selected.map((asset) => ({
//         url: asset.uri,
//         alt: "Product image",
//       }));

//       setImageBase((prev) => [...prev, ...newImages]);

//       const base64Images = await Promise.all(
//         newImages.map(async (img) => {
//           const base64 = await FileSystem.readAsStringAsync(img.url, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           return base64;
//         })
//       );

//       setImages((prev) => [...prev, ...base64Images]);
//     }
//   };

//   const handleSubmit = async () => {
//     const product = {
//       title,
//       category,
//       price: parseFloat(price),
//       description,
//       tags,
//       condition,
//       variantColor,
//       shippingFree,
//       images,
//       ...form,
//       ...shipping,
//     };

//     try {
//       await createProduct(product);
//         Toast.show({
//           type: "success",
//           text1: "Success!",
//           text2: message || "Product created successfully",
//           position: "top",
//         });
//     } catch (err) {
      // ✅ Show error toast if something went wrong
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: err?.response?.data?.message || "Something went wrong",
//         position: "top",
//       });
//       console.error(err);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
//       className="mb-5"
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView
//           className="p-4 bg-white rounded-2xl mb-20"
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Text className="text-xl font-bold mb-4 text-center">
//             Add Product
//           </Text>

//           {/* Basic Info */}
//           <Text className="font-semibold text-base mt-2 mb-1">
//             Product Name
//           </Text>
//           <TextInput
//             className="border p-2 mb-2 rounded border-primary"
//             placeholder="Product Name"
//             value={title}
//             onChangeText={setTitle}
//           />

//           <View className="z-70" style={{ flex: 1, zIndex: 1000 }}>
//             <Text className="font-semibold text-base mt-2 mb-1">Category</Text>
//             <DropDownPicker
//               open={open}
//               value={category}
//               items={value}
//               setOpen={setOpen}
//               setValue={setCategory}
//               setItems={setValue}
//               placeholder="Select a category"
//               listMode="MODAL"
//               dropDownDirection="AUTO" // helps when you're near bottom of screen
//               zIndex={1000}
//               style={{
//                 borderColor: COLORS.primary,
//                 zIndex: 3000,
//               }}
//               dropDownContainerStyle={{
//                 borderColor: "#0f766e",
//                 maxHeight: 500, // ✅ Show more items + scroll enabled
//                 zIndex: 1000,
//               }}
//               searchable={true}
//               searchPlaceholder="Search category..."
//               className="w-full"
//             />
//           </View>

//           <Text className="font-semibold text-base mt-2 mb-1">
//             Price in SLE
//           </Text>
//           <TextInput
//             className="border p-2 mb-2 rounded border-primary"
//             placeholder="Price (SLE)"
//             keyboardType="numeric"
//             value={price}
//             onChangeText={setPrice}
//           />

//           <Text className="font-semibold text-base mt-2 mb-1 text-center">
//             LOCAaTION
//           </Text>

//           <Text className="font-semibold text-base mt-2 mb-1">CIty</Text>
//           <TextInput
//             className="border p-2 mb-2 rounded border-primary"
//             placeholder="city where your business is"
//             onChangeText={(text) => handleLocationChange("city", text)}
//           />

//           <Text className="font-semibold text-base mt-2 mb-1">Region</Text>
//           <TextInput
//             className="border p-2 mb-2 rounded border-primary"
//             placeholder="the region"
//             onChangeText={(text) => handleLocationChange("region", text)}
//           />

//           <Text className="font-semibold text-base mt-2 mb-1 text-center">
//             PRODUCT DESCRIPTION
//           </Text>

//           <Text className="font-semibold text-base mt-2 mb-1">Description</Text>
//           <TextInput
//             className="border p-2 mb-2 rounded border-primary"
//             placeholder="Description"
//             value={description}
//             onChangeText={setDescription}
//             multiline
//           />

//           {/* Tags */}
//           <Text className="font-semibold text-base mt-2 mb-1">Tags</Text>
//           <DropDownPicker
//             open={tagsOpen}
//             value={tags}
//             items={tagsValue}
//             setOpen={setTagsOpen}
//             setValue={setTags}
//             setItems={setTagsValue}
//             placeholder="Select tag"
//             listMode="SCROLLVIEW"
//             multiple={true}
//             min={0}
//             max={5}
//             style={{
//               borderColor: COLORS.primary,
//               zIndex: 3000,
//             }}
//           />

//           <Text className="font-semibold text-base mt-2 mb-1">Condition</Text>
//           <DropDownPicker
//             open={conditionOpen}
//             value={condition}
//             items={conditionValue}
//             setOpen={setConditionOpen}
//             setValue={setCondition}
//             setItems={setConditionValue}
//             placeholder="Select item condition"
//             listMode="SCROLLVIEW"
//             style={{
//               borderColor: COLORS.primary,
//               zIndex: 3000,
//             }}
//             s
//           />

//           {/* Variant */}
//           <Text className="font-semibold text-base mt-4 mb-1 text-center">
//             VARIANT
//           </Text>
//           <Text className="font-semibold text-base mt-2 mb-1">Colour Name</Text>
//           <TextInput
//             className="border p-2 mb-2 rounded border-primary"
//             placeholder="Color Name (e.g. Navy Blue)"
//             value={variantColor}
//             onChangeText={setVariantColor}
//           />

//           <View style={{ padding: 20 }}>
//             <TouchableOpacity
//               onPress={pickImage}
//               className="bg-primary p-3 w-[40%] rounded-full"
//             >
//               <Text className="text-center text-white"> Choose Images</Text>
//             </TouchableOpacity>

//             <ScrollView horizontal style={{ marginTop: 20 }}>
//               {imageBase.map((img, index) => (
//                 <Image
//                   key={index}
//                   source={{ uri: img.url }}
//                   style={{
//                     width: 100,
//                     height: 100,
//                     marginRight: 10,
//                     borderRadius: 8,
//                   }}
//                 />
//               ))}
//             </ScrollView>
//           </View>

//           {/* Shipping Info */}
//           <Text className="font-semibold text-base mt-2 mb-1">
//             Pay or Free Delivery{" "}
//           </Text>
//           <Pressable
//             onPress={() => setShippingFree(!shippingFree)}
//             className={`p-2 rounded mb-2 ${
//               shippingFree ? "bg-green-100" : "bg-red-100"
//             }`}
//           >
//             <Text className="text-center">
//               {shippingFree ? "✅ Free Delivery Enabled" : "❌ Paid Delivery"}
//             </Text>
//           </Pressable>
//           <Text className="font-semibold text-base mt-2 mb-1">
//             Estimated Time To Delivery
//           </Text>
//           <TextInput
//             className="border p-2 mb-2 rounded border-primary"
//             placeholder="Estimated Delivery Days"
//             keyboardType="numeric"
//             value={shipping}
//             onChangeText={(text) => handleShipping("estimatedDays", text)}
//           />

//           <Text className="font-semibold text-base mt-2 mb-1">
//             Location Where Delivery Will Be Available
//           </Text>
//           <TextInput
//             className="border p-2 mb-4 rounded border-primary"
//             placeholder="Delivery Location"
//             value={shipping}
//             onChangeText={(text) => handleShipping("shippingLocation", text)}
//           />

//           {/* Submit */}
//           <Pressable
//             onPress={handleSubmit}
//             className="bg-primary py-3 rounded-xl mb-10"
//           >
//             {loading ? (
//               <ActivityIndicator />
//             ) : (
//               <Text className="text-white text-center font-bold">
//                 Submit Product
//               </Text>
//             )}
//           </Pressable>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// export default AddProductForm;
 





import React, { useEffect, useState } from "react";
import {
  Video,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import API from "../api/axiosAPI";

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [dynamicFields, setDynamicFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const categoryObj = categories.find((c) => c.name === cat);
    setSubcategories(categoryObj ? categoryObj.subcategories : []);
    setSelectedSubcategory("");
    setDynamicFields([]);
  };

  const handleSubcategoryChange = (subcat) => {
    setSelectedSubcategory(subcat);
    const subcatObj = subcategories.find((s) => s.name === subcat);
    setDynamicFields(subcatObj ? subcatObj.fields : []);
  };

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages([...images, ...result.assets.map((a) => a.uri)]);
    }
  };

  const pickVideos = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setVideos([...videos, ...result.assets.map((a) => a.uri)]);
    }
  };

  const submitProduct = async () => {
    const productPayload = {
      ...formData,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      images,
      videos,
    };

    setLoading(true);
    try {
      await API.post(`$/seller/products`, productPayload);
      alert("Product created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Create Product
      </Text>

      {/* Universal Fields */}
      <TextInput
        placeholder="Title*"
        style={styles.input}
        onChangeText={(v) => updateField("title", v)}
      />
      <TextInput
        placeholder="Description*"
        style={[styles.input, { height: 100 }]}
        multiline
        onChangeText={(v) => updateField("description", v)}
      />
      <TextInput
        placeholder="Price*"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(v) => updateField("price", v)}
      />
      <TextInput
        placeholder="Stock*"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(v) => updateField("stock", v)}
      />

      {/* Category Picker */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((cat, idx) => (
          <Picker.Item key={idx} label={cat.name} value={cat.name} />
        ))}
      </Picker>

      {/* Subcategory Picker */}
      {subcategories.length > 0 && (
        <Picker
          selectedValue={selectedSubcategory}
          onValueChange={handleSubcategoryChange}
        >
          <Picker.Item label="Select Subcategory" value="" />
          {subcategories.map((sub, idx) => (
            <Picker.Item key={idx} label={sub.name} value={sub.name} />
          ))}
        </Picker>
      )}

      {/* Dynamic Fields */}
      {dynamicFields.map((field, idx) => {
        if (field.type === "text" || field.type === "number") {
          return (
            <TextInput
              key={idx}
              placeholder={`${field.name}${field.required ? "*" : ""}`}
              style={styles.input}
              keyboardType={field.type === "number" ? "numeric" : "default"}
              onChangeText={(v) => updateField(field.name, v)}
            />
          );
        }
        if (field.type === "select") {
          return (
            <Picker
              key={idx}
              selectedValue={formData[field.name]}
              onValueChange={(v) => updateField(field.name, v)}
            >
              <Picker.Item label={`Select ${field.name}`} value="" />
              {field.options.map((opt, i) => (
                <Picker.Item key={i} label={opt} value={opt} />
              ))}
            </Picker>
          );
        }
      })}

      {/* Images */}
      <TouchableOpacity style={styles.button} onPress={pickImages}>
        <Text style={{ color: "#fff" }}>Upload Images</Text>
      </TouchableOpacity>
      <ScrollView horizontal>
        {images.map((uri, idx) => (
          <Image
            key={idx}
            source={{ uri }}
            style={{ width: 80, height: 80, margin: 5 }}
          />
        ))}
      </ScrollView>

      {/* Videos */}
      <TouchableOpacity style={styles.button} onPress={pickVideos}>
        <Text style={{ color: "#fff" }}>Upload Videos</Text>
      </TouchableOpacity>
      <ScrollView horizontal>
        {videos.map((uri, idx) => (
          <Video
            key={idx}
            source={{ uri }}
            style={{ width: 100, height: 80, margin: 5 }}
          />
        ))}
      </ScrollView>

      {/* Submit */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={submitProduct}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff" }}>Submit Product</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
};
