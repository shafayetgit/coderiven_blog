import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "userAuth",
  initialState: { user: null, isAuth: false },
  reducers: {
    setCredentials: (state) => {
      state.isAuth = true;
    },
    removeCredentials: (state) => {
      state.isAuth = false;
    },

  },
});

export const { setCredentials, removeCredentials, setPage} = authSlice.actions;

export default authSlice;
