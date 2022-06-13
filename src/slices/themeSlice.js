import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    changeTheme: (state) => {
      state = state === 'light' ? 'dark' : 'light'
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer