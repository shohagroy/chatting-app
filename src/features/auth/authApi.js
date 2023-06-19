import { apiSlice } from "../api/apiSlice";
import { initialLoading, userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoginUser: builder.query({
      query: () => ({
        url: `/auth/login-user`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["users"],
      providesTags: ["users"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(initialLoading());
        try {
          const result = await queryFulfilled;

          if (result?.data?.status === "success") {
            return dispatch(userLoggedIn(result?.data?.data));
          }
        } catch (err) {
          return dispatch(userLoggedOut());
        }
      },
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            return dispatch(userLoggedIn(result?.data?.data));
          }
        } catch (err) {
          return dispatch(userLoggedOut());
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.success) {
            return dispatch(userLoggedIn(result?.data?.data));
          }
        } catch (err) {
          return dispatch(userLoggedOut());
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetLoginUserQuery } =
  authApi;
