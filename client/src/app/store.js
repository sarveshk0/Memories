import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/Posts/postsSlice.js'

export const store = configureStore({
  reducer: {
    posts:postReducer,

  },
})