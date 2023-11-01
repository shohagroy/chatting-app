import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  allUsers: [],
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
      state.user = action.payload.loginUser;
      state.loading = false;
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

export const { getUsersInfo, initialLoading, userLoggedOut, loginInUser } =
  userSlice.actions;

export default userSlice.reducer;
