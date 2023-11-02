import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  allUsers: [],
  activeUsers: [],
  conversations: [],
  lastConversations: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initialLoading: (state, action) => {
      state.loading = action.payload;
    },

    getUsersInfo: (state, action) => {
      state.allUsers = action.payload.allUsers;
      state.activeUsers = action.payload.allUsers.filter(
        (user) => user.isActive
      );
      state.user = action.payload.loginUser;
      state.conversations = action.payload.userConversations;
      state.lastConversations = action.payload.lastConversations;
      state.loading = false;
    },

    setLastConversations: (state, action) => {
      const conversation = state.conversations.filter(
        (el) => el.conversationId !== action.payload.conversationId
      );

      state.conversations = [...conversation, action.payload];
    },

    // sendLastConversation: (state, action) => {
    //   const queryOne = action.payload.participants;
    //   const queryTwo = action.payload.participants
    //     .split("-")
    //     .reverse()
    //     .join("_");

    //   console.log("new");

    //   const conversations = state.lastConversations.filter(
    //     (el) => el.participants !== queryOne && el.participants !== queryTwo
    //   );

    //   state.lastConversations = [...conversations, action.payload].sort(
    //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    //   );
    // },

    sendLastConversation: (state, action) => {
      const queryOne = action.payload.participants;
      const queryTwo = action.payload.participants
        .split("-")
        .reverse()
        .join("-");

      const conversations = state.lastConversations.filter(
        (el) => el.participants !== queryOne && el.participants !== queryTwo
      );

      const newConversations = [...conversations, action.payload].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      state.lastConversations = newConversations;
    },

    loginInUser: (state, action) => {
      state.loading = true;
      state.user = action.payload;
    },

    userLoggedOut: (state, action) => {
      console.log("user login put", action?.payload);
      state.user = {};
      state.loading = false;
    },
  },
});

export const {
  getUsersInfo,
  initialLoading,
  userLoggedOut,
  loginInUser,
  setLastConversations,
  sendLastConversation,
} = userSlice.actions;

export default userSlice.reducer;
