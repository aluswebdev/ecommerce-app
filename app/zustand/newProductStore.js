
// stores/productStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../api/axiosAPI";

 const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      loading: false,
      search: '',
      selectedCategory: null,

     fetchProducts: async () => {
         set({ loading: true, error: null });
         try {
           const res = await API.get("/product");
           set({ products: res.data, loading: false });
         } catch (error) {
           console.error("Fetch products failed:", error);
           set({
             error: error.response?.data?.message || "Failed to fetch products",
             loading: false,
           });
         }
       },

      setSearch: (text) => set({ search: text }),
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),

      filteredProducts: () => {
        const { products, search, selectedCategory } = get();
        return products.filter((p) => {
          const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
          const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
          return matchesSearch && matchesCategory;
        });
      }
    }),
    {
      name: 'product-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, value);
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

export default useProductStore