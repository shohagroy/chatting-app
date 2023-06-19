import { createSlice } from "@reduxjs/toolkit";

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
    },
    userLoggedOut: (state) => {
      document.cookie = `free_chat=${" "}; Path=/;`;
      state.user = {};
      state.isLoading = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut, initialLoading } =
  authSlice.actions;

export default authSlice.reducer;
