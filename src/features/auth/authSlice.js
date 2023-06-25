import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: true,
  activeUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialLoading: (state) => {
      state.isLoading = true;
    },

    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    getActiveUser: (state, action) => {
      state.activeUsers = action.payload;
    },
    userLoggedOut: (state) => {
      document.cookie = `${"free_chat"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=`;

      state.user = {};
      state.isLoading = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut, initialLoading, getActiveUser } =
  authSlice.actions;

export default authSlice.reducer;
