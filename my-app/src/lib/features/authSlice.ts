// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import http from "../http";

// Define types
interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await http.post("/auth/login", credentials, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.data) {
        return rejectWithValue("Login failed");
      }

      // Store token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      window.location.pathname = "/";

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Registration failed");
      }

      const data = await response.json();

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Optional: Call logout endpoint
      await fetch("/api/auth/logout", { method: "POST" });

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifytoken",
  async (_, { rejectWithValue }) => {
    console.log("Verify token");
    try {
      let token: string | null = null;

      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }

      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await http.post(
        "/auth/verifytoken",
        JSON.stringify(token),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.pathname = "/login";
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return rejectWithValue("Token invalid");
      }

      const username = await response.data.email; // Spring returns plain text username

      return {
        user: {
          id: response.data.user.id, // You might need to fetch user details separately
          email: response.data.user.email,
          role: response.data.user.role,
        },
        token,
      };
    } catch (error: any) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.pathname = "/login";
      return rejectWithValue(error.message);
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        // Still clear auth even if logout API fails
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Verify token
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        // Normalize the rejected payload into a string error message
        const payload = action.payload as any;
        state.error =
          typeof payload === "string"
            ? payload
            : payload?.message ?? "Invalid or no token";
      });
  },
});

// Export actions
export const { setCredentials, clearAuth, clearError } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Export reducer
export default authSlice.reducer;
