import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls - replace with actual MongoDB API
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    // Mock API call
    const mockOrder = {
      id: `order_${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
      trackingNumber: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockOrder;
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ userId, userRole, status, page = 1 }) => {
    // Mock orders data
    const mockOrders = [
      {
        id: 'order_1',
        userId: 'user1',
        sellerId: 'seller1',
        items: [
          {
            productId: '1',
            productName: 'Traditional Gele Headwrap',
            variant: { id: 'v1', name: 'Red & Gold' },
            quantity: 1,
            price: 75000,
            image: 'https://images.unsplash.com/photo-1594736797933-d0b1b80d0b6e?w=200'
          }
        ],
        total: 85000, // Including delivery
        deliveryFee: 10000,
        status: 'processing',
        paymentMethod: 'Orange Money',
        deliveryAddress: {
          name: 'John Doe',
          phone: '+232 77 123456',
          address: '15 Spur Road, Freetown',
          city: 'Freetown',
          district: 'Western Area Urban'
        },
        createdAt: '2024-01-20T10:30:00Z',
        estimatedDelivery: '2024-01-23T10:30:00Z',
        trackingNumber: 'SL123456789'
      },
      {
        id: 'order_2',
        userId: 'user1',
        sellerId: 'seller2',
        items: [
          {
            productId: '2',
            productName: 'Premium Palm Oil',
            variant: { id: 'v3', name: '1 Liter' },
            quantity: 2,
            price: 45000,
            image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200'
          }
        ],
        total: 105000,
        deliveryFee: 15000,
        status: 'delivered',
        paymentMethod: 'QMoney',
        deliveryAddress: {
          name: 'John Doe',
          phone: '+232 77 123456',
          address: '15 Spur Road, Freetown',
          city: 'Freetown',
          district: 'Western Area Urban'
        },
        createdAt: '2024-01-15T14:20:00Z',
        estimatedDelivery: '2024-01-18T14:20:00Z',
        deliveredAt: '2024-01-18T11:45:00Z',
        trackingNumber: 'SL987654321'
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 800));

    let filteredOrders = mockOrders;

    if (userRole === 'buyer') {
      filteredOrders = mockOrders.filter(order => order.userId === userId);
    } else if (userRole === 'seller') {
      filteredOrders = mockOrders.filter(order => order.sellerId === userId);
    }

    if (status && status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    return {
      orders: filteredOrders,
      totalPages: 1,
      currentPage: page,
      total: filteredOrders.length
    };
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status, notes }) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      orderId,
      status,
      notes,
      updatedAt: new Date().toISOString()
    };
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    currentOrder: null,
    loading: false,
    error: null,
    orderStatuses: [
      { id: 'all', name: 'All Orders', color: '#6B7280' },
      { id: 'pending', name: 'Pending', color: '#F59E0B' },
      { id: 'processing', name: 'Processing', color: '#3B82F6' },
      { id: 'shipped', name: 'Shipped', color: '#8B5CF6' },
      { id: 'delivered', name: 'Delivered', color: '#10B981' },
      { id: 'cancelled', name: 'Cancelled', color: '#EF4444' }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0
    }
  },
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.orders;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const order = state.items.find(item => item.id === action.payload.orderId);
        if (order) {
          order.status = action.payload.status;
          order.updatedAt = action.payload.updatedAt;
          if (action.payload.notes) {
            order.notes = action.payload.notes;
          }
        }
      });
  }
});

export const { setCurrentOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;