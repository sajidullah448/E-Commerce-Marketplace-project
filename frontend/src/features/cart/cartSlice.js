import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  checkoutCart,
} from "./cartAPI";

// ------------------- Async Thunks -------------------

// Fetch user's cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCart();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

// Add item to cart
export const addItem = createAsyncThunk(
  "cart/addItem",
  async (item, { rejectWithValue }) => {
    try {
      const data = await addToCart(item);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add item");
    }
  }
);

// Update item quantity
export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await updateCartItem(productId, quantity);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update item");
    }
  }
);

// Remove item from cart
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await removeFromCart(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove item");
    }
  }
);

// Checkout cart
export const checkout = createAsyncThunk(
  "cart/checkout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await checkoutCart();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Checkout failed");
    }
  }
);

// ------------------- Slice -------------------
const initialState = {
  items: [],
  totalAmount: 0,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ---------------- Fetch Cart ----------------
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // ---------------- Add Item ----------------
    builder
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // ---------------- Update Item ----------------
    builder
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // ---------------- Remove Item ----------------
    builder
      .addCase(removeItem.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // ---------------- Checkout ----------------
    builder
      .addCase(checkout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.totalAmount = 0;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
