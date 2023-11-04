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
      state.user = { ...action.payload.loginUser, isActive: true };
      state.loading = false;
    },

    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    setUserConversations: (state, action) => {
      state.conversations = action.payload.userAllConversations;
      state.lastConversations = action.payload.lastConversations;
    },

    setLastConversation: (state, action) => {
      const queryOne = action.payload.participants;
      const queryTwo = action.payload.participants
        ?.split("-")
        ?.reverse()
        ?.join("-");

      const lastRemain = state.lastConversations.filter(
        (el) => el.participants !== queryOne && el.participants !== queryTwo
      );

      const index = state.conversations.findIndex(
        (el) => el.conversationId === action.payload.conversationId
      );

      if (index > -1) {
        state.conversations[index] = action.payload;
      } else {
        state.conversations.push(action.payload);
      }

      state.lastConversations = [action.payload, ...lastRemain];
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
  setLastConversation,
  // setLastConversations,
  // sendLastConversation,
  getAllUsers,
  setUserConversations,
} = userSlice.actions;

export default userSlice.reducer;
