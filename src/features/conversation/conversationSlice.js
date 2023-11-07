import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  conversations: [],
  lastConversations: [],
  typing: false,
};

const conversationSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initialLoading: (state, action) => {
      state.loading = action.payload;
    },

    participantsConversations: (state, action) => {
      state.conversations = action.payload;
      state.loading = false;
    },
    userLastConversations: (state, action) => {
      state.lastConversations = action.payload;
    },

    setParticipantsConversations: (state, action) => {
      const index = state.conversations.findIndex(
        (el) => el.conversationId === action.payload.conversationId
      );

      const queryOne = action.payload.participants;
      const queryTwo = action.payload.participants
        ?.split("-")
        ?.reverse()
        ?.join("-");

      const filterLastConversations = state.lastConversations?.filter(
        (el) => el.participants !== queryOne && el.participants !== queryTwo
      );

      if (index > -1) {
        state.conversations[index] = action.payload;
      } else {
        state.conversations.push(action.payload);
      }

      state.lastConversations = [action.payload, ...filterLastConversations];
    },

    seenConversation: (state, action) => {
      const conversationIndex = state.conversations.findIndex(
        (el) => el._id === action.payload._id
      );
      const lastConversationIndex = state.lastConversations.findIndex(
        (el) => el._id === action.payload._id
      );

      state.conversations[conversationIndex] = action.payload;
      state.lastConversations[lastConversationIndex] = action.payload;
    },
  },
});

export const {
  participantsConversations,
  setParticipantsConversations,
  userLastConversations,
  seenConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
