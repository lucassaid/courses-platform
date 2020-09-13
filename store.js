import { configureStore } from '@reduxjs/toolkit'
import uploadsReducer from './lib/slices/uploadsSlice'

export default configureStore({
  reducer: {
    uploads: uploadsReducer,
  },
  devTools: true,
})