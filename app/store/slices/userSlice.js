import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls - replace with actual MongoDB API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ role, search, page = 1, limit = 20 }) => {
    // Mock users data
    const mockUsers = [
      {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+232 77 123456',
        role: 'buyer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        location: 'Freetown, Western Area Urban',
        isActive: true,
        isVerified: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastSeen: '2024-01-20T16:00:00Z',
        stats: {
          totalOrders: 15,
          totalSpent: 1250000 // SLL
        }
      },
      {
        id: 'seller1',
        name: 'Aminata Fashion',
        email: 'aminata@fashion.sl',
        phone: '+232 78 234567',
        role: 'seller',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
        location: 'Freetown, Western Area Urban',
        isActive: true,
        isVerified: true,
        businessName: 'Aminata Fashion House',
        businessDescription: 'Traditional Sierra Leonean clothing and accessories',
        createdAt: '2023-12-15T00:00:00Z',
        lastSeen: '2024-01-20T15:45:00Z',
        stats: {
          totalProducts: 45,
          totalSales: 2850000, // SLL
          totalOrders: 89,
          rating: 4.8,
          reviews: 67
        }
      },
      {
        id: 'seller2',
        name: 'Bo Farms Cooperative',
        email: 'info@bofarms.sl',
        phone: '+232 79 345678',
        role: 'seller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        location: 'Bo, Southern Province',
        isActive: true,
        isVerified: true,
        businessName: 'Bo Farms Cooperative',
        businessDescription: 'Organic farm products and palm oil from Bo district',
        createdAt: '2023-11-20T00:00:00Z',
        lastSeen: '2024-01-20T14:30:00Z',
        stats: {
          totalProducts: 12,
          totalSales: 4200000, // SLL
          totalOrders: 156,
          rating: 4.9,
          reviews: 203
        }
      },
      {
        id: 'admin1',
        name: 'Administrator',
        email: 'admin@salonemarket.com',
        phone: '+232 77 999999',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        location: 'Freetown, Western Area Urban',
        isActive: true,
        isVerified: true,
        createdAt: '2023-10-01T00:00:00Z',
        lastSeen: '2024-01-20T16:30:00Z',
        permissions: ['manage_users', 'manage_products', 'manage_orders', 'view_analytics']
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 800));

    let filteredUsers = mockUsers;

    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        (user.businessName && user.businessName.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return {
      users: filteredUsers,
      totalPages: Math.ceil(filteredUsers.length / limit),
      currentPage: page,
      total: filteredUsers.length
    };
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId) => {
    // Mock API call
    const mockUsers = [
      {
        id: 'seller1',
        name: 'Aminata Fashion',
        email: 'aminata@fashion.sl',
        phone: '+232 78 234567',
        role: 'seller',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200',
        location: 'Freetown, Western Area Urban',
        isActive: true,
        isVerified: true,
        businessName: 'Aminata Fashion House',
        businessDescription: 'Traditional Sierra Leonean clothing and accessories specializing in gele headwraps, traditional dresses, and ceremonial wear.',
        businessAddress: '15 Kissy Street, Freetown',
        businessLicense: 'SL-BL-2023-1234',
        taxId: 'SL-TAX-5678',
        bankDetails: {
          bankName: 'Sierra Leone Commercial Bank',
          accountNumber: '****1234',
          accountName: 'Aminata Fashion House'
        },
        createdAt: '2023-12-15T00:00:00Z',
        lastSeen: '2024-01-20T15:45:00Z',
        stats: {
          totalProducts: 45,
          totalSales: 2850000,
          totalOrders: 89,
          rating: 4.8,
          reviews: 67,
          monthlyEarnings: [
            { month: 'Jan', earnings: 450000 },
            { month: 'Dec', earnings: 380000 },
            { month: 'Nov', earnings: 520000 }
          ]
        },
        socialMedia: {
          facebook: '@aminatafashion',
          instagram: '@aminata_fashion_sl',
          whatsapp: '+232 78 234567'
        }
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers.find(user => user.id === userId);
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ userId, isActive, isVerified }) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      userId,
      isActive,
      isVerified,
      updatedAt: new Date().toISOString()
    };
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    currentUser: null,
    loading: false,
    error: null,
    userRoles: [
      { id: 'all', name: 'All Users', color: '#6B7280' },
      { id: 'buyer', name: 'Buyers', color: '#3B82F6' },
      { id: 'seller', name: 'Sellers', color: '#10B981' },
      { id: 'admin', name: 'Administrators', color: '#8B5CF6' }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0
    }
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.users;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { userId, isActive, isVerified } = action.payload;
        const user = state.items.find(item => item.id === userId);
        if (user) {
          user.isActive = isActive;
          user.isVerified = isVerified;
        }
      });
  }
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;