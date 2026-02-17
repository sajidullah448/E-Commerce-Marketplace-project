import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserOrders, getAllOrders, updateOrderStatus } from "./orderAPI";

// ------------------- Async Thunks -------------------

// Fetch orders for current user (customer)
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserOrders();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user orders");
    }
  }
);

// Fetch all orders (admin or seller)
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllOrders();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch all orders");
    }
  }
);

// Update order status (admin or seller)
export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const data = await updateOrderStatus(orderId, status);
      return { orderId, status: data.status };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update order status");
    }
  }
);

// ------------------- Slice -------------------
const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ---------------- Fetch User Orders ----------------
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload || [];
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // ---------------- Fetch All Orders ----------------
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload || [];
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // ---------------- Update Order Status ----------------
    builder
      .addCase(changeOrderStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { orderId, status } = action.payload;
        const index = state.orders.findIndex((o) => o._id === orderId);
        if (index !== -1) state.orders[index].status = status;
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
