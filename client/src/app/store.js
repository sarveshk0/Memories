import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/Posts/postsSlice.js'
import authReducer from '../features/Posts/authslice.js'
export const store = configureStore({
  reducer: {
    posts:postReducer,
    Auth:authReducer
  },
})