import socket from "../../socket/socker.config";
import { apiSlice } from "../api/apiSlice";

export const conversationAli = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessages: builder.mutation({
      query: (data) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sendMessages"],
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   const chatEmails = arg.participants.split("-");
      //   const data = `user=${chatEmails[0]}&partner=${chatEmails[1]}`;
      //   // arg._id = arg.message;

      //   dispatch(
      //     apiSlice.util.updateQueryData(
      //       "getUserConversations",
      //       data,
      //       (draft) => {
      //         draft.data.conversations = [...draft.data.conversations, arg];
      //         return draft;
      //       }
      //     )
      //   );
      // },
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
