import socket from "../../config/socket/socker.config";
import { apiSlice } from "../api/apiSlice";
import { setLastConversations } from "../user/userSlice";

export const conversationAli = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessages: builder.mutation({
      query: (data) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sendMessages"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
          dispatch(setLastConversations(arg));
        } catch (error) {}

        // socket.emit("conversation", {
        //   room: "chatRoom1",
        //   conversations: arg,
        // });
      },
    }),

    getUserConversations: builder.query({
      query: (data) => ({
        url: `/conversations?${data}`,
        method: "GET",
      }),
      providesTags: ["sendMessages"],

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            updateCachedData((draft) => {
              const isReciver = draft.data.conversations.find(
                (el) =>
                  JSON.stringify(el.participants) ===
                  JSON.stringify(data.conversations.participants)
              );
              if (isReciver) {
                draft.data.conversations.push(data.conversations);
                return draft;
              }
            });
          });
        } catch (err) {}

        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getLastUserConversations: builder.query({
      query: (email) => ({
        url: `/conversations/${email}`,
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

export const {
  useSendMessagesMutation,
  useGetUserConversationsQuery,
  useGetLastUserConversationsQuery,
} = conversationAli;
