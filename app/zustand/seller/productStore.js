
import { create } from "zustand";
import API from "../../api/axiosAPI";


const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  message: null,
  refreshing: false,
  hasMore: true,
  initialLoading: true,
  page: 1,
  suggestions: [],
  fetchProducts: async (reset = false) => {
    const { page, hasMore, loading } = get();

    try {
      set({ loading: true });

      const currentPage = reset ? 1 : page;
      const res = await API.get(`/product?page=${currentPage}&limit=18`);

      const newProducts = res.data.products;
    
      


      set((state) => ({
        products: reset ? newProducts : [...state.products, ...newProducts],
        page: currentPage + 1,
        hasMore: newProducts.length >= 18,
        initialLoading: false,
        loading: false,
        refreshing: false,
        message: null,
      }));
    } catch (err) {
      console.log("Fetch error:", err);
      set({
        message: "Failed to fetch products",
        loading: false,
        refreshing: false,
      });
    }
  },

  clearProducts: () => {
    set({
      products: [],
      page: 1,
      hasMore: true,
      initialLoading: true,
      error: null,
      
    });
  },

  setSuggestions: (data) => set({ suggestions: data }),
  clearSuggestions: () => set({ suggestions: [] }),
}));


export default useProductStore
