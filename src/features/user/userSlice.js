import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  allUsers: [],
  activeUsers: [],
  conversations: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initialLoading: (state, action) => {
      state.loading = action.payload;
    },

    getUsersInfo: (state, action) => {
      state.user = { ...action.payload.loginUser, isActive: true };
      state.loading = false;
    },

    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    // setLastConversations: (state, action) => {
    //   // const conversation = state.conversations.filter(
    //   //   (el) => el.conversationId !== action.payload.conversationId
    //   // );
    //   // state.conversations = [...conversation, action.payload];
    // },

    // sendLastConversation: (state, action) => {
    //   // const queryOne = action.payload.participants;
    //   // const queryTwo = action.payload.participants
    //   //   ?.split("-")
    //   //   ?.reverse()
    //   //   ?.join("-");
    //   // const conversations = state.lastConversations.filter(
    //   //   (el) => el.participants !== queryOne && el.participants !== queryTwo
    //   // );
    //   // const newConversations = [...conversations, action.payload].sort(
    //   //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    //   // );
    //   // state.lastConversations = newConversations;
    // },

    setUserConversations: (state, action) => {
      state.conversations = action.payload.userAllConversations;
      state.lastConversations = action.payload.lastConversations;
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
  // setLastConversations,
  // sendLastConversation,
  getAllUsers,
  setUserConversations,
} = userSlice.actions;

export default userSlice.reducer;
