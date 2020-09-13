function reducer(state, action) {
  switch(action.type) {
    
    case 'reorder-sections': {
      const newSectionsOrder = Array.from(state.sectionsOrder)
      newSectionsOrder.splice(action.payload.source.index, 1)
      newSectionsOrder.splice(action.payload.destination.index, 0, action.payload.draggableId)
      return {
        ...state,
        sectionsOrder: newSectionsOrder,
        changedByUser: true
      }
    }

    case 'add-section': {
      let result = {...state}
      const newSection = {
        id: action.payload.id,
        title: action.payload.title,
        lessonsIds: []
      }
      result.sections[newSection.id] = newSection
      result.sectionsOrder.push(newSection.id)
      result.changedByUser = true
      return result
    }

    case 'delete-section': {
      let result = {...state}
      delete result.sections[action.payload.sectionId]
      result.sectionsOrder.splice(action.payload.index, 1)
      result.changedByUser = true
      return result
    }

    case 'change-section-title': {
      let result = {...state}
      result.sections[action.payload.sectionId].title = action.payload.title
      result.changedByUser = true
      return result
    }

    case 'reorder-lessons': {
      const { destination, source, draggableId } = action.payload
      const start = state.sections[source.droppableId]
      const finish = state.sections[destination.droppableId]
      const destinationSectionId = start === finish ? source.droppableId : destination.droppableId
      const newSourceLessonsIds = Array.from(state.sections[source.droppableId].lessonsIds)
      newSourceLessonsIds.splice(source.index, 1)
      // set source section ids
      let newState = updateState(state, source.droppableId, newSourceLessonsIds)
      // set destination section ids (can be same as source)
      const newDestinationLessonsIds = Array.from(newState.sections[destinationSectionId].lessonsIds)
      newDestinationLessonsIds.splice(destination.index, 0, draggableId)
      newState.sections[destinationSectionId] = updateSection(newState, destinationSectionId, newDestinationLessonsIds)
      return newState
    }

    case 'add-lesson': {
      const { newLessonId, sectionId } = action.payload
      const newLessonsIds = Array.from(state.sections[sectionId].lessonsIds)
      newLessonsIds.push(newLessonId)
      return updateState(state, sectionId, newLessonsIds)
    }

    case 'delete-lesson': {
      const { index, sectionId } = action.payload
      const newLessonsIds = Array.from(state.sections[sectionId].lessonsIds)
      newLessonsIds.splice(index, 1)
      return updateState(state, sectionId, newLessonsIds)
    }

    case 'reset-changed-by-user':
      return {
        ...state,
        changedByUser: false
      }
  }
}
export default reducer

function updateState(state, sectionId, newLessonsIds) {
  return {
    ...state,
    sections: {
      ...state.sections,
      [sectionId]: updateSection(state, sectionId, newLessonsIds)
    },
    changedByUser: true
  }
}

function updateSection(state, sectionId, newLessonsIds) {
  return {
    ...state.sections[sectionId],
    lessonsIds: newLessonsIds
  }
}
