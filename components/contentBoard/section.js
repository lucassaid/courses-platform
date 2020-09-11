import styled, {css} from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Lesson from './lesson'
import { Button, Typography, Tooltip } from 'antd'
import { DeleteOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import TitleEditable from '../titleEditable'

const { Text } = Typography

const Container = styled.div`
  position: relative;
  margin-bottom: 25px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  transition: border-color 0.3s ease;
  transition: box-shadow 0.3s ease;
  background-color: white;
  ${props => props.isDragging && css`
    border-color: #91d6ff;
    box-shadow: 0 0 15px 0 rgba(0,130,255,0.3);
  `}
`

const LessonList = styled.div`
  transition: background-color 0.2s ease;
  padding: 8px;
  padding-bottom: 56px;
  /* min-height: 100px; */
  ${props => props.isDraggingOver && css`
    background-color: #E7E7E7;
  `}
`

const Top = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`

const Bottom = styled.div`
  padding: 8px;
  position: absolute;
  right: 0;
  bottom: 0;
`

const emptySection = (
  <Text type="secondary">
    Hacé click en el botón <PlusCircleOutlined /> para agregar una lección.
  </Text>
)

const Section = ({
  section,
  lessons,
  onDelete,
  index,
  dragDisabled,
  onChangeTitle,
  onAddLesson,
  onDeleteLesson,
  courseSlug,
  selectedLesson
}) => {

  const router = useRouter()
  const { slug } = router.query

  const TopSection = ({handleProps}) => (
    <Top {...handleProps}>
      <TitleEditable
        title={section.title}
        onAccept={onChangeTitle}
      />
      {!lessons.length ? (
        <Button
          style={{marginLeft: 'auto'}}
          type="text"
          icon={<DeleteOutlined />}
          onClick={onDelete}
          shape="circle"
        />
      ) : (
        <Text
          style={{marginLeft: 'auto'}}
          type="secondary"
        >
          {lessons.length} {lessons.length > 1 ? 'lecciones' : 'lección'}
        </Text>
      )}
    </Top>
  )

  return(
    <Draggable
      draggableId={section.id}
      index={index}
      isDragDisabled={dragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <TopSection
            handleProps={provided.dragHandleProps}
          />
          <Droppable droppableId={section.id}>
            {(provided, snapshot) => (
              <LessonList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {lessons.map((lesson, index) => (
                  <Lesson
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                    dragDisabled={dragDisabled}
                    onDelete={() => onDeleteLesson(index)}
                    courseSlug={courseSlug}
                    selectedLesson={selectedLesson}
                  />
                ))}
                {provided.placeholder}
              </LessonList>
            )}
          </Droppable>
          <Bottom>
            <Tooltip placement="right" title="Agregar lección">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={onAddLesson}
              ></Button>
            </Tooltip>
          </Bottom>
        </Container>
      )}
    </Draggable>
  )
}
export default Section