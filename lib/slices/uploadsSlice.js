import { createSlice } from '@reduxjs/toolkit'
import uploadVideo from '../vimeo-upload'
import uploadToStorage from '../storage-upload'

const uploadsSlice = createSlice({
  name: 'uploads',
  initialState: {},
  reducers: {
    addFile: (state, {payload}) => {
      state[payload.id] = { ...payload, status: 'active'}
    },
    updateFileProgress: (state, {payload}) => {
      state[payload.id].progress = payload.progress 
    },
    setErroredFile: (state, {payload}) => {
      state[payload.id].status = 'exception'
    },
    setFinishedFile: (state, {payload}) => {
      state[payload.id].uri = payload.uri
      state[payload.id].finished = true
      state[payload.id].status = ''
    },
    deleteFile: (state, {payload}) => {
      delete state[payload.id]
    },
  },
})


export const selectUploads = (state) => Object.values(state.uploads || {})
export const selectUploadsObj = (state) => state.uploads || {}

export const {
  addFile,
  deleteFile,
  setFinishedFile,
} = uploadsSlice.actions

export const uploadFile = (id, file, path) => async dispatch => {
  dispatch(addFile({id, name: file.name, progress: 0}))
  let uri
  if(file.type.startsWith('video')) {
    uri = await uploadVideo(id, file, uploadsSlice.actions)
  } else {
    uri = await uploadToStorage(id, file, path, uploadsSlice.actions)
  }
  dispatch(setFinishedFile({id, uri}))
}

export default uploadsSlice.reducer