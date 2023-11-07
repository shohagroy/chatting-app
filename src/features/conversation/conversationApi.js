import socket from "../../config/socket/socker.config";
import { apiSlice } from "../api/apiSlice";
import {
  seenConversation,
  setParticipantsConversations,
} from "./conversationSlice";

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
        dispatch(setParticipantsConversations(arg));
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            const data = result?.data?.data;
            dispatch(setParticipantsConversations(data));
            socket.emit("conversation", {
              room: "chatRoom1",
              conversations: data,
            });
          }
        } catch (error) {
          console.log(error);
          dispatch(setParticipantsConversations({ ...arg, isWrong: true }));
        }
      },
    }),

    getParticipantsConversations: builder.query({
      query: (query) => ({
        url: `/conversations?query=${query}`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const query = arg.split("-").reverse().join("-");
        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            if (data?.conversations?.participants === query) {
              dispatch(setParticipantsConversations(data?.conversations));
            }
          });
        } catch (err) {}

        await cacheEntryRemoved;
        socket.close();
      },
    }),

    lastConversations: builder.query({
      query: (id) => ({
        url: `/conversations/last/${id}`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          await cacheDataLoaded;

          socket.on("seen", (data) => {
            dispatch(seenConversation({ ...data, isNotSeen: false }));
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
              if (queryOne?.split("-")[1] === arg) {
                const conversations = draft?.data.lastConversations.filter(
                  (el) =>
                    el.participants !== queryTwo || el.participants !== queryOne
                );

                draft.data.lastConversations = [
                  data?.conversations,
                  ...conversations,
                ];
                draft.data.userConversations.push(data.conversations);
              }

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
  useLastConversationsQuery,
  useGetParticipantsConversationsQuery,
} = conversationAli;
