import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await API.get("/products");
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "succeeded";
    });
  },
});

export default productSlice.reducer;
