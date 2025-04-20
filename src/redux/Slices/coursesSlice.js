import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

export const allcourses = createAsyncThunk(
  "api/allcourses",
  async (formValues, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${BACKEND_URL}/course/allcourses`);
      // localStorage.setItem("token", token.data.token);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch student courses
export const studentcourses = createAsyncThunk(
  "courses/studentcourses",
  async (studentId, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${BACKEND_URL}/course/studentcourses`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch lecturer courses
export const lecturercourses = createAsyncThunk(
  "courses/lecturercourses",
  async (lecturerId, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${BACKEND_URL}/course/lecturerscourses`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch single course
export const getsinglecourse = createAsyncThunk(
    "courses/getsinglecourse",
    async (courseId, { rejectWithValue }) => {
      try {
        const data = await axios.get(`${BACKEND_URL}/course/${courseId}`);
        console.log(data.data);
        return data.data;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    allcourses: null,
    courses: null,
    singlecourse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //ALL COURSES
      .addCase(allcourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allcourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allcourses = action.payload;
      })
      .addCase(allcourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Student courses
      .addCase(studentcourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentcourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(studentcourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Lecturer courses
      .addCase(lecturercourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(lecturercourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(lecturercourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // Single course
      .addCase(getsinglecourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getsinglecourse.fulfilled, (state, action) => {
        state.loading = false;
        state.singlecourse = action.payload;
      })
      .addCase(getsinglecourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
