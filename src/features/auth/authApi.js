import { apiSlice } from "../api/apiSlice";

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
      // invalidatesTags: ["users"],
      // providesTags: ["users"],
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     if (result?.data?.data?._id) {
      //       // return dispatch(loginUserFound(result?.data?.data));
      //     }
      //   } catch (err) {}
      // },
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;

      //     localStorage.setItem(
      //       "auth",
      //       JSON.stringify({
      //         token: result.data.token,
      //         user: result.data.user,
      //       })
      //     );

      //     dispatch(
      //       userLoggedIn({
      //         token: result.data.token,
      //         user: result.data.user,
      //       })
      //     );
      //   } catch (err) {
      //     console.log(err);
      //     // do nothing
      //   }
      // },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;

      //     localStorage.setItem(
      //       "auth",
      //       JSON.stringify({
      //         token: result.data.token,
      //         user: result.data.user,
      //       })
      //     );

      //     dispatch(
      //       userLoggedIn({
      //         token: result.data.token,
      //         user: result.data.user,
      //       })
      //     );
      //   } catch (err) {
      //     console.log(err);
      //     // do nothing
      //   }
      // },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetLoginUserQuery } =
  authApi;
