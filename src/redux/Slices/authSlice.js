import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";
import toast from "react-hot-toast";

export const signup = createAsyncThunk(
  "api/signup",
  async (formValues, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        `${BACKEND_URL}/users/register`,
        formValues
      );
      // localStorage.setItem("token", token.data.token);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const signin = createAsyncThunk(
  "api/signin",
  async (formValues, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${BACKEND_URL}/users/login`, formValues);
      // localStorage.setItem("token", token.data.token);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "api/logout",
  async (data, { rejectWithValue }) => {
    try {
      console.log("starting");

      const token = await axios.get(`${BACKEND_URL}/users/logout`, data);
      localStorage.removeItem("token");
      console.log(token);
      return token.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Fetch user data
export const getuserdata = createAsyncThunk(
  "users/getuserdata",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${BACKEND_URL}/users/getuser`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //REGISTER
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        // toast.success(`Welcome Back`)
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      })
      //Login
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.payload.message);
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        toast.success(`Sucessfully Logged Out`);
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        toast.error(action.payload.message);
        state.error = action.error.message;
      })
      // User data
    .addCase(getuserdata.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getuserdata.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(getuserdata.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
