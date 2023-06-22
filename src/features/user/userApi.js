import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   const result = await queryFulfilled;
        } catch (err) {}
      },
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;
