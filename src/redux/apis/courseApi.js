import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../api";
import { toastError, toastSuccess } from "../../utils/toast";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Course", "Courses"], // Define tag types for caching/invalidation
  endpoints: (builder) => ({
    // Create new course
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "/course/newcourse",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Courses"],
      transformResponse: (res) => {
        toastSuccess("Course created successfully!");
        return res;
      },
      transformErrorResponse: (res) => {
        toastError(res.data.message);
      },
    }),

    // Get all courses
    getCourses: builder.query({
      query: () => "/course/allcourses",
      providesTags: ["Courses"],
    }),

    // Get student's registered courses
    getRegisteredCourses: builder.query({
      query: () => "/course/studentcourses",
      providesTags: ["Courses"],
    }),

    // Get lecturer's courses
    getLecturerCourses: builder.query({
      query: () => "/course/lecturerscourses",
      providesTags: ["Courses"],
    }),

    // Get single course by ID
    getCourseById: builder.query({
      query: (id) => `/course/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    // Upload course material
    uploadCourseMaterial: builder.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/course/uploadcoursematerial/${id}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
    }),

    // Upload assignment
    uploadAssignment: builder.mutation({
      query: ({ courseId, file }) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: `/course/addassignment/${courseId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),

    // Delete course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
      transformResponse: (res) => {
        toastSuccess("Course deleted successfully!");
        return res;
      },
    }),

    // Assign lecturer to course
    assignLecturer: builder.mutation({
      query: ({ courseId, lecturerId }) => ({
        url: `/course/assignlecturer/${courseId}/${lecturerId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
      transformResponse: (res) => {
        toastSuccess("Lecturer assigned successfully!");
        return res;
      },
    }),

    // Register for course
    registerForCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/registercourse/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["Courses"],
      transformResponse: (res) => {
        toastSuccess("Course registration successful!");
        return res;
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetRegisteredCoursesQuery,
  useGetLecturerCoursesQuery,
  useGetCourseByIdQuery,
  useUploadCourseMaterialMutation,
  useUploadAssignmentMutation,
  useDeleteCourseMutation,
  useAssignLecturerMutation,
  useRegisterForCourseMutation,
} = coursesApi;
