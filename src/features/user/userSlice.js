import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  allUsers: [],
  activeUsers: [],
  typing: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initialLoading: (state, action) => {
      state.loading = action.payload;
    },

    //new
    getUsersInfo: (state, action) => {
      state.user = { ...action.payload, isActive: true };
      state.loading = false;
    },

    //new
    getActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
      // state.allUsers = action.payload;
    },

    setTyping: (state, action) => {
      state.typing = action.payload;
    },

    //new
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    loginInUser: (state, action) => {
      state.loading = true;
      state.user = action.payload;
    },

    userLoggedOut: (state, action) => {
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
  getAllUsers,
  setTyping,
  getActiveUsers,
} = userSlice.actions;

export default userSlice.reducer;
