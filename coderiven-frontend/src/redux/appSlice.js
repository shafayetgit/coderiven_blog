import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    mode: 'light',
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload
    },
  },
})

export const { setTheme } = appSlice.actions
export default appSlice


