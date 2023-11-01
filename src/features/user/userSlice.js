import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: true,
  allUsers: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initialLoading: (state) => {
      state.isLoading = true;
    },

    getUsersInfo: (state, action) => {
      state.allUsers = action.payload.allUsers;
      state.user = action.payload.loginUser;
      state.isLoading = false;
    },

    userLoggedOut: (state) => {
      document.cookie = `${"free_chat"}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=`;

      state.user = {};
      state.isLoading = false;
    },
  },
});

export const { getUsersInfo } = userSlice.actions;

export default userSlice.reducer;
