import { configureStore } from '@reduxjs/toolkit'

import uploadsReducer from './lib/slices/uploadsSlice'
import contentsReducer from './lib/slices/contentsSlice'

export default configureStore({
  reducer: {
    uploads: uploadsReducer,
    contents: contentsReducer
  },
  devTools: true,
})