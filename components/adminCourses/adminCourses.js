import React, {useState, useEffect} from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import CoursesList from './coursesList'
import { message, Card } from 'antd'
import { firestore as ref } from '../../firebase/index'

const getOrderedIds = courses => {
  return Object.keys(courses).sort((a, b) => courses[a].order - courses[b].order)
}

const AdminCourses = ({courses, onOrderChanged}) => {

  const [ids, setIds] = useState(getOrderedIds(courses))
  const [dragDisabled, setDragDisabled] = useState(false)
  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    saveOrder()
  }, [ids])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    
    if(!destination) return
    if(destination.index === source.index) return
      
    const newIds = Array.from(ids)
    newIds.splice(source.index, 1)
    newIds.splice(destination.index, 0, draggableId)

    setIds(newIds)
  }

  const saveOrder = async () => {
    // prevent saving first time
    if(firstTime) {
      setFirstTime(false)
      return
    }
    
    message.loading({ content: 'Guardando cursos', key: 'saving' })
    setDragDisabled(true)
    try {
      // update all courses with a batch write
      let batch = ref.batch();
      let newCourses = {}
      ids.forEach((id, i) => {
        let courseRef = ref.collection('courses').doc(id)
        batch.update(courseRef, {order: i})
        newCourses[id] = { ...courses[id], order: i }
      })
      await batch.commit()
      onOrderChanged(newCourses)
      message.success({ content: 'Cursos guardados', key: 'saving' });
    } catch(e) {
      console.log(e)
      message.error({ content: 'Error al guardar los cursos', key: 'saving' });
    } finally {
      setDragDisabled(false)
    }
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