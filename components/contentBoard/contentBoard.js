import React, {useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Section from './section'
import { Button, Typography } from 'antd'
import NewSectionPrompt from './newSectionPrompt'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { update } from '../../firebase/client-functions'
import { message, Modal, Input } from 'antd'
import { useRouter } from 'next/router'
import store from '../../store'

import {
  addSection,
  deleteSection,
  reorderSections,
  changeSectionTitle,
  reorderLessons,
  selectContent,
  addLesson,
  deleteLesson
} from '../../lib/slices/contentsSlice'

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

const saveSectionsHelper = async (courseId, setDragDisabled) => {
  const state = store.getState()
  const { sections, sectionsOrder } = state.contents[courseId]

  try {
    setDragDisabled(true)
    message.loading({ content: 'Guardando...', key: 'saving' })
    const config = { path: ['courses', courseId] }
    await update({ sections, sectionsOrder }, config)
    message.success({ content: 'Cambios guardados', key: 'saving', duration: 1 });
  } catch(e) {
    message.error({ content: 'Error al guardar los cambios', key: 'saving', duration: 2 });
  } finally {
    setDragDisabled(false)
  }
}

const ContentBoard = ({course, content, selectedLesson, }) => {

  const router = useRouter()
  const dispatch = useDispatch()
  
  const courseId = course.id
  const [addingSection, setAddingSection] = useState(false)
  const [dragDisabled, setDragDisabled] = useState(false)
  const [newLessonModal, setNewLessonModal] = useState(initialModalState)
  const { lessons = {}, sections = {}, sectionsOrder = []} = content

  const saveSections = async () => {
    await saveSectionsHelper(courseId, setDragDisabled)
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
      dispatch(reorderSections({...result, courseId}))
    } else {
      dispatch(reorderLessons({result, courseId, sections}))
    }
    saveSections()
  }

  const addSectionFromPropmt = (title) => {
    setAddingSection(false)
    const id = `section-${sectionsOrder.length + 1}-${Date.now()}`
    dispatch(addSection({id, title, courseId}))
    saveSections()
  }

  const onDeleteSection = (sectionId, index) => {
    dispatch(deleteSection({courseId, sectionId, index}))
    saveSections()
  }

  const changeTitle = (title, sectionId) => {
    dispatch(changeSectionTitle({courseId, sectionId, title}))
    saveSections()
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
    if(newLessonModal.title === '') return
    updateNewLessonModal('loading', true)
    const { payload } = await dispatch(addLesson({
      sectionId: newLessonModal.addTo,
      courseId,
      title: newLessonModal.title
    }))
    await saveSections()
    const newLessonId = Object.keys(payload)[0]
    const href= { pathname: '/admin/courses/[slug]/lessons', query: { s: newLessonId } }
    const as= { pathname: `/admin/courses/${course.slug}/lessons`, query: { s: newLessonId } }
    setNewLessonModal(initialModalState)
    router.push(href, as)
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
    dispatch(deleteLesson({index, sectionId, courseId}))
    saveSections()
  }

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
                const sectionLessons = section.lessonsIds.map(lessonId => lessons[lessonId])
                return (
                  <Section
                    key={sectionId}
                    section={section}
                    lessons={sectionLessons}
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