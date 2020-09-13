import React, { useState, useReducer, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Section from './section'
import { Button, Typography } from 'antd'
import NewSectionPrompt from './newSectionPrompt'
import styled from 'styled-components'
import { message, Modal, Input } from 'antd'
import { useRouter } from 'next/router'
import axios from 'axios'
import { mutate } from 'swr'
import sectionsReducer from '../../lib/reducers/sections'

const SectionList = styled.div`
  display: block;
`;

const { Text } = Typography

const emptyCourse = (
  <div style={{marginBottom: 20}}>
    <Text type="secondary">
      ¡Empecemos! Primero tenés que agreagar una sección:
    </Text>
  </div>
)

const initialModalState =  {
  visible: false,
  title: '',
  loading: false
}

const saveCourse = async (updateObj, courseId, setDragDisabled) => {
  try {
    setDragDisabled(true)
    message.loading({ content: 'Guardando...', key: 'saving' })
    await axios.put(`/api/courses/`, {courses: {[courseId]: updateObj}})
    message.success({ content: 'Cambios guardados', key: 'saving', duration: 1 });
  } catch(e) {
    message.error({ content: 'Error al guardar los cambios', key: 'saving', duration: 2 });
  } finally {
    setDragDisabled(false)
  }
}

function init(course) {
  return {
    sections: course.sections || {},
    sectionsOrder: course.sectionsOrder || []
  }
}

const ContentBoard = ({course, lessons, selectedLesson, }) => {

  const router = useRouter()
  
  const courseId = course.id
  const [addingSection, setAddingSection] = useState(false)
  const [dragDisabled, setDragDisabled] = useState(false)
  const [newLessonModal, setNewLessonModal] = useState(initialModalState)
  
  const [content, dispatch] = useReducer(sectionsReducer, course, init)
  const {sections, sectionsOrder, changedByUser} = content

  useEffect(() => {
    const {sections, sectionsOrder, changedByUser} = content
    if(changedByUser) saveUpdatedCourse({sections, sectionsOrder})
  }, [content])

  const saveUpdatedCourse = async updateObj => {
    await saveCourse(updateObj, courseId, setDragDisabled)
    mutate(`/api/courses/${course.slug}`)
    dispatch({type: 'reset-changed-by-user'})
  }

  const onDragEnd = result => {
    const { destination, source, type } = result
    if(!destination) return
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    if(type === 'GLOBAL') {
      dispatch({type: 'reorder-sections', payload: result})
    } else {
      dispatch({type: 'reorder-lessons', payload: result})
    }
  }

  const addSectionFromPropmt = (title) => {
    setAddingSection(false)
    const id = `section-${sectionsOrder.length + 1}-${Date.now()}`
    dispatch({type: 'add-section', payload: {id, title}})
  }

  const onDeleteSection = (sectionId, index) => {
    dispatch({type: 'delete-section', payload: {sectionId, index}})
  }

  const changeTitle = (title, sectionId) => {
    dispatch({type: 'change-section-title', payload: {sectionId, title}})
  }

  const updateNewLessonModal = (prop, value) => {
    setNewLessonModal({
      ...newLessonModal,
      [prop]: value
    })
  }

  const addLessonClicked = (sectionId) => {
    setNewLessonModal({
      ...newLessonModal,
      visible: true,
      addTo: sectionId
    })
  }

  const onModalAccept = async () => {
    const { title } = newLessonModal 
    if(title === '') return
    updateNewLessonModal('loading', true)

    // save
    const { data } = await axios.post(`/api/courses/lessons?courseId=${courseId}`, {lesson: {title}})
    mutate(`/api/courses/lessons?courseId=${courseId}`)
    
    // update
    const newLessonId = Object.keys(data)[0]
    const sectionId = newLessonModal.addTo
    dispatch({type: 'add-lesson', payload: { newLessonId, sectionId}})

    // redirect and close modal
    const href= { pathname: '/admin/courses/[slug]/lessons', query: { s: newLessonId } }
    const as= { pathname: `/admin/courses/${course.slug}/lessons`, query: { s: newLessonId } }
    setNewLessonModal(initialModalState)
    router.push(href, as, {query: { s: newLessonId }})
  }

  const cancelNewLesson = () => {
    setNewLessonModal(initialModalState)
  }

  const onDeleteLesson = (index, sectionId) => {
    const { lessonsIds } = sections[sectionId]
    if(selectedLesson == lessonsIds[index]) {
      // is being deleted and is the selected, redirect to lessons
      const href = "/admin/courses/[slug]/lessons"
      const as = `/admin/courses/${course.slug}/lessons`
      router.push(href, as)
    }
    dispatch({type: 'delete-lesson', payload: {index, sectionId}})
  }

  if(!lessons) return 'Cargando lecciones'

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>

        <Droppable
          droppableId="sections"
          type="GLOBAL"
        >
          {(provided, snapshot) => (
            <SectionList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {sectionsOrder.map((sectionId, index) => {
                const section = sections[sectionId]
                return (
                  <Section
                    key={sectionId}
                    section={section}
                    lessonsIds={section.lessonsIds}
                    lessons={lessons}
                    index={index}
                    courseSlug={course.slug}
                    onDelete={() => onDeleteSection(sectionId, index)}
                    dragDisabled={dragDisabled}
                    onChangeTitle={(title) => changeTitle(title, sectionId)}
                    onAddLesson={() => addLessonClicked(sectionId)}
                    onDeleteLesson={(index) => onDeleteLesson(index, sectionId)}
                    selectedLesson={selectedLesson}
                  />
                )
              })}
              {provided.placeholder}
            </SectionList>
          )}
        </Droppable>
      </DragDropContext>

      {!sectionsOrder.length && emptyCourse}

      {addingSection ? (
        <NewSectionPrompt
          onAccept={addSectionFromPropmt}
          onCancel={() => setAddingSection(false)}
        />
      ):(
        <div style={{textAlign: 'right'}}>
          <Button onClick={() => setAddingSection(true)}>
            Agregar sección
          </Button>
        </div>
      )}

      <Modal
        title="Crear lección"
        visible={newLessonModal.visible}
        onOk={onModalAccept}
        okText='Crear'
        cancelText='Cancelar'
        confirmLoading={newLessonModal.loading}
        onCancel={cancelNewLesson}
      > 
        Título:
        <Input
          value={newLessonModal.title}
          style={{marginTop: 5}}
          autoFocus
          onChange={e => updateNewLessonModal('title', e.target.value)}
        />
      </Modal>
    </div>
  )
}
export default ContentBoard