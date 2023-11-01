import { toast } from "react-hot-toast";
import { apiSlice } from "../api/apiSlice";
import { getUsersInfo } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUpdateUser: builder.mutation({
      query: (data) => ({
        url: `/users/create-update`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            dispatch(getUsersInfo(result?.data?.data));
          }
        } catch (err) {
          toast.error("something went wrong!");
        }
      },
    }),

    getAllUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   const result = await queryFulfilled;
        } catch (err) {}
      },
    }),

    getUserMessages: builder.query({
      query: (data) => ({
        url: `/users/conversations?${data}`,
        method: "GET",
      }),
      async onQueryStrted(arg, { queryFulfilled, dispatch }) {
        try {
          //   const result = await queryFulfilled;
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserMessagesQuery,
  useCreateUpdateUserMutation,
} = userApi;
