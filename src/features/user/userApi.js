import { toast } from "react-hot-toast";
import { apiSlice } from "../api/apiSlice";
import { initialLoading, loginInUser } from "./userSlice";
import socket from "../../config/socket/socker.config";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUpdateUser: builder.mutation({
      query: (data) => ({
        url: `/users/create-update`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(loginInUser(arg));
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            socket.emit("join", result?.data?.data);
          }
        } catch (err) {
          dispatch(initialLoading(false));
          toast.error("something went wrong!");
        }
      },
    }),

    getAllUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useCreateUpdateUserMutation } = userApi;
