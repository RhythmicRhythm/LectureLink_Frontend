import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../api";
import { toastError, toastSuccess } from "../../utils/toast";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => "/users/getuser",
    }),
    signup: builder.mutation({
      query: (formValues) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: formValues,
      }),
      transformResponse: (res) => {
        toastSuccess("Signup successful!");
        return res;
      },
      transformErrorResponse: (res) => {
        toastError(res.data.message);
      },
    }),
    signin: builder.mutation({
      query: (formValues) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: formValues,
      }),
      transformResponse: (res) => {
        toastSuccess("Signin successful!");
        return res;
      },
      transformErrorResponse: (res) => {
        toastError(res.data.message);
      },
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      invalidatesTags: ["Checkauth"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  use,
} = authApi;
