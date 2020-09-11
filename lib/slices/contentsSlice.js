import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { add } from '../../firebase/client-functions'

export const addLesson = createAsyncThunk(
  'contents/addLesson',
  (lessonData, thunkAPI) => {
    try {
      const { courseId, title } = lessonData
      const config = {path:['courses', courseId, 'lessons']}
      return add({title}, config)
    } catch(error) {
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

const contentsSlice = createSlice({
  name: 'contents',
  initialState: {},
  reducers: {
    receiveContent: (state, {payload}) => {
      state[payload.id] = payload
    },
    addSection: (state, {payload}) => {
      const newSection = {
        id: payload.id,
        title: payload.title,
        lessonsIds: []
      }
      state[payload.courseId].sections[newSection.id] = newSection
      state[payload.courseId].sectionsOrder.push(newSection.id)
    },
    deleteSection: (state, {payload}) => {
      delete state[payload.courseId].sections[payload.sectionId]
      state[payload.courseId].sectionsOrder.splice(payload.index, 1)
    },
    reorderSections: (state, {payload}) => {
      const newSectionsOrder = state[payload.courseId].sectionsOrder
      newSectionsOrder.splice(payload.source.index, 1)
      newSectionsOrder.splice(payload.destination.index, 0, payload.draggableId)
      state[payload.courseId].sectionsOrder = newSectionsOrder
    },
    changeSectionTitle: (state, {payload}) => {
      state[payload.courseId].sections[payload.sectionId].title = payload.title
    },
    reorderLessons: (state, {payload}) => {
      const { destination, source, draggableId } = payload.result
      const start = payload.sections[source.droppableId]
      const finish = payload.sections[destination.droppableId]
      const destinationSectionId = start === finish ? source.droppableId : destination.droppableId
      state[payload.courseId].sections[source.droppableId].lessonsIds.splice(source.index, 1)
      state[payload.courseId].sections[destinationSectionId].lessonsIds.splice(destination.index, 0, draggableId)
    },
    deleteLesson: (state, {payload}) => {
      const {index, sectionId, courseId} = payload
      const lessonId = state[courseId].sections[sectionId].lessonsIds[index]
      delete state[courseId].lessons[lessonId]
      state[courseId].sections[sectionId].lessonsIds.splice(index, 1)
    },
    updateLesson: (state, {payload}) => {
      state[payload.courseId].lessons[payload.id][payload.prop] = payload.value
    }
  },
  extraReducers: {
    [addLesson.pending]: (state) => {
      delete state.error
    },
    [addLesson.fulfilled]: (state, {payload, meta}) => {
      const { courseId, sectionId } = meta.arg
      const lessonId = Object.keys(payload)[0]
      state[courseId].sections[sectionId].lessonsIds.push(lessonId)
      state[courseId].lessons[lessonId] = {...payload[lessonId], id: lessonId}
    },
    [addLesson.rejected]: (state, action) => {
      console.log(action)
      // state.error = action.payload.error
    }
  }
})

export const selectContent = (state) => state.contents

export const {
  receiveContent,
  addSection,
  deleteSection,
  reorderSections,
  changeSectionTitle,
  reorderLessons,
  deleteLesson,
  updateLesson,
} = contentsSlice.actions

export default contentsSlice.reducer