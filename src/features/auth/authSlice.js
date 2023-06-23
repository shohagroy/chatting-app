import { createSlice } from "@reduxjs/toolkit";
import socket from "../../socket/socker.config";

const initialState = {
  user: {},
  isLoading: true,
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
      socket.emit("join", "chatRoom1");
    },
    userLoggedOut: (state) => {
      document.cookie = `${"free_chat"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=`;

      state.user = {};
      state.isLoading = false;
      socket.disconnect();
    },
  },
});

export const { userLoggedIn, userLoggedOut, initialLoading } =
  authSlice.actions;

export default authSlice.reducer;
