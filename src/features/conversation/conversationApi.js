import { apiSlice } from "../api/apiSlice";

export const conversationAli = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessages: builder.mutation({
      query: (data) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   const result = await queryFulfilled;
        } catch (err) {}
      },
    }),

    getUserConversations: builder.query({
      query: (data) => ({
        url: `/conversations?${data}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          //   const result = await queryFulfilled;
        } catch (err) {}
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
