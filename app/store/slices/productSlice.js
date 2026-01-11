import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls - replace with actual MongoDB API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, search, page = 1, limit = 10 }) => {
    // Mock API call
    const mockProducts = [
      {
        id: '1',
        name: 'Traditional Gele Headwrap',
        description: 'Beautiful handwoven gele headwrap in traditional Sierra Leonean patterns',
        price: 75000, // SLL
        images: ['https://images.unsplash.com/photo-1594736797933-d0b1b80d0b6e?w=500'],
        category: 'fashion',
        sellerId: 'seller1',
        sellerName: 'Aminata Fashion',
        location: 'Freetown',
        stock: 15,
        variants: [
          { id: 'v1', name: 'Red & Gold', price: 75000, stock: 5 },
          { id: 'v2', name: 'Blue & Silver', price: 80000, stock: 10 }
        ],
        rating: 4.8,
        reviews: 24,
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        name: 'Premium Palm Oil',
        description: 'Fresh red palm oil from organic farms in Bo district',
        price: 45000, // SLL
        images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500'],
        category: 'food',
        sellerId: 'seller2',
        sellerName: 'Bo Farms Cooperative',
        location: 'Bo',
        stock: 50,
        variants: [
          { id: 'v3', name: '1 Liter', price: 45000, stock: 30 },
          { id: 'v4', name: '5 Liters', price: 200000, stock: 20 }
        ],
        rating: 4.9,
        reviews: 89,
        createdAt: '2024-01-10T00:00:00Z'
      },
      {
        id: '3',
        name: 'Handmade Leather Bag',
        description: 'Authentic leather handbag crafted by local artisans in Kenema',
        price: 150000, // SLL
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
        category: 'fashion',
        sellerId: 'seller3',
        sellerName: 'Kenema Leather Works',
        location: 'Kenema',
        stock: 8,
        variants: [
          { id: 'v5', name: 'Brown', price: 150000, stock: 4 },
          { id: 'v6', name: 'Black', price: 160000, stock: 4 }
        ],
        rating: 4.7,
        reviews: 32,
        createdAt: '2024-01-12T00:00:00Z'
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let filteredProducts = mockProducts;

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (search) {
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return {
      products: filteredProducts,
      totalPages: 1,
      currentPage: page,
      total: filteredProducts.length
    };
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    // Mock API call
    const mockProducts = [
      {
        id: '1',
        name: 'Traditional Gele Headwrap',
        description: 'Beautiful handwoven gele headwrap in traditional Sierra Leonean patterns. Made from high-quality cotton with intricate gold threading.',
        price: 75000,
        images: [
          'https://images.unsplash.com/photo-1594736797933-d0b1b80d0b6e?w=500',
          'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500'
        ],
        category: 'fashion',
        sellerId: 'seller1',
        sellerName: 'Aminata Fashion',
        sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
        location: 'Freetown',
        stock: 15,
        variants: [
          { id: 'v1', name: 'Red & Gold', price: 75000, stock: 5 },
          { id: 'v2', name: 'Blue & Silver', price: 80000, stock: 10 }
        ],
        rating: 4.8,
        reviews: [
          {
            id: 'r1',
            userId: 'user1',
            userName: 'Fatima K.',
            rating: 5,
            comment: 'Beautiful quality and fast delivery!',
            date: '2024-01-20T00:00:00Z'
          }
        ],
        specifications: {
          material: '100% Cotton',
          origin: 'Sierra Leone',
          care: 'Hand wash only',
          size: 'One size fits all'
        },
        createdAt: '2024-01-15T00:00:00Z'
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.find(p => p.id === productId);
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    loading: false,
    error: null,
    searchResults: [],
    categories: [
      { id: 'all', name: 'All Categories', icon: 'grid-view' },
      { id: 'fashion', name: 'Fashion & Clothing', icon: 'checkroom' },
      { id: 'food', name: 'Food & Beverages', icon: 'restaurant' },
      { id: 'electronics', name: 'Electronics', icon: 'phone-android' },
      { id: 'home', name: 'Home & Garden', icon: 'home' },
      { id: 'beauty', name: 'Beauty & Health', icon: 'spa' },
      { id: 'crafts', name: 'Local Crafts', icon: 'palette' }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0
    }
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    updateProductStock: (state, action) => {
      const { productId, variantId, quantity } = action.payload;
      const product = state.items.find(p => p.id === productId);
      if (product) {
        if (variantId) {
          const variant = product.variants.find(v => v.id === variantId);
          if (variant) {
            variant.stock -= quantity;
          }
        } else {
          product.stock -= quantity;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearCurrentProduct, updateProductStock } = productSlice.actions;
export default productSlice.reducer;