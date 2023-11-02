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
      state.user = { ...action.payload.loginUser, isActive: true };
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

    userActiveStatus: (state, action) => {
      const filteredArray = action.payload.filter((id) => id !== state.user.id);

      const activeUsers = filteredArray.map((id) => {
        const isActive = state.allUsers.find((user) => user.id === id);
        return {
          ...isActive,
          isActive: true,
        };
      });

      state.activeUsers = activeUsers;
      state.allUsers = state.allUsers.map((user) => {
        const activeUser = filteredArray.find((userid) => user.id === userid);

        if (activeUser) {
          return {
            ...user,
            isActive: true,
          };
        }

        return user;
      });
    },

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
  userActiveStatus,
} = userSlice.actions;

export default userSlice.reducer;
