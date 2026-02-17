import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, fetchProfile } from "./authAPI";

// ------------------- Async Thunks -------------------

// Register new user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Load logged-in user profile
export const loadProfile = createAsyncThunk(
  "auth/loadProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProfile();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load profile");
    }
  }
);

// ------------------- Slice -------------------
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // ---------------- Register ----------------
    builder.addCase(register.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // ---------------- Login ----------------
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // ---------------- Load Profile ----------------
    builder.addCase(loadProfile.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loadProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(loadProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

// Export logout action
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
