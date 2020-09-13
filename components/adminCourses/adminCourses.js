import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import CoursesList from './coursesList'
import { message } from 'antd'
import axios from 'axios'
import { mutate } from 'swr'

const getOrderedIds = courses => {
  return Object.keys(courses).sort((a, b) => courses[a].order - courses[b].order)
}

const saveOrder = async (ids, setDragDisabled) => {    
  message.loading({ content: 'Guardando cursos', key: 'saving' })
  setDragDisabled(true)
  try {
    let updateObj = {}
    ids.forEach((id, i) => {
      updateObj[id] = {order: i}
    })
    await axios.put('/api/courses', { courses: updateObj })
    mutate(`/api/courses`)
    message.success({ content: 'Cursos guardados', key: 'saving' });
  } catch(e) {
    console.warn(e)
    message.error({ content: 'Error al guardar los cursos', key: 'saving' });
  } finally {
    setDragDisabled(false)
  }
}

const AdminCourses = ({courses}) => {

  const [ids, setIds] = useState(getOrderedIds(courses))
  const [dragDisabled, setDragDisabled] = useState(false)

  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    
    if(!destination) return
    if(destination.index === source.index) return
      
    const newIds = Array.from(ids)
    newIds.splice(source.index, 1)
    newIds.splice(destination.index, 0, draggableId)

    setIds(newIds)
    saveOrder(newIds, setDragDisabled)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <CoursesList
          ids={ids}
          courses={courses}
          disabled={dragDisabled}
        ></CoursesList>
      </DragDropContext>
    </>  
  )
}
export default AdminCourses