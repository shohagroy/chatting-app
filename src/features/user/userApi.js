import { toast } from "react-hot-toast";
import { apiSlice } from "../api/apiSlice";
import { getUsersInfo, initialLoading, loginInUser } from "./userSlice";
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
            dispatch(getUsersInfo(result?.data?.data));
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

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("get-actives", (users) => {
            const activeIds = users.map((info) => info?.user?.id);

            updateCachedData((draft) => {
              const updatedData = draft?.data?.map((el) => {
                if (activeIds.includes(el?.id)) {
                  return {
                    ...el,
                    isActive: true,
                  };
                }

                return {
                  ...el,
                  isActive: false,
                };
              });

              draft.data = updatedData;

              return draft;
            });
          });
        } catch (err) {}

        await cacheEntryRemoved;
        socket.close();
      },
    }),
  }),
});

export const { useGetAllUserQuery, useCreateUpdateUserMutation } = userApi;
