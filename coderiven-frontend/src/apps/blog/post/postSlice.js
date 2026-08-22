import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "blogPost",
  initialState: { page:1 },
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },

  },
});

export const { setCredentials, removeCredentials, setPage} = postSlice.actions;

export default postSlice;
