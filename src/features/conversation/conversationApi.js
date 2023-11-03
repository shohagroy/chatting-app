import socket from "../../config/socket/socker.config";
import { apiSlice } from "../api/apiSlice";
// import { sendLastConversation, setLastConversations } from "../user/userSlice";

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
      //   dispatch(setLastConversations(arg));
      //   try {
      //     const result = await queryFulfilled;

      //     if (result?.data?.success) {
      //       dispatch(sendLastConversation(result?.data?.data));
      //       socket.emit("unseen", {
      //         room: "chatRoom1",
      //         new: result?.data?.data,
      //       });
      //     }
      //   } catch (error) {}
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
      query: (id) => ({
        url: `/conversations/${id}`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          socket.on("message", (data) => {
            const queryOne = data.conversations.participants;
            const queryTwo = data.conversations.participants
              ?.split("-")
              ?.reverse()
              ?.join("-");

            updateCachedData((draft) => {
              const conversations = draft?.data.lastConversations.filter(
                (el) =>
                  el.participants !== queryTwo && el.participants !== queryOne
              );

              draft.data.lastConversations = [
                data?.conversations,
                ...conversations,
              ];
              draft.data.userConversations.push(data.conversations);

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

export const {
  useSendMessagesMutation,
  useGetUserConversationsQuery,
  useGetLastUserConversationsQuery,
} = conversationAli;
