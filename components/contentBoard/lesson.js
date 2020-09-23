import styled, {css} from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Popconfirm, Typography } from 'antd'
import { MenuOutlined, DeleteOutlined } from '@ant-design/icons'
import Link from 'next/link'
import LessonTypeIcon from '../lessonTypeIcon'

const { Text } = Typography

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-bottom-color: #EEE;
  padding: 8px;
  /* margin-bottom: 8px; */
  border-radius: 3px;
  transition: all 0.2s ease;
  transition-property: border-color, background-color, box-shadow;
  background-color: white;
  ${props => props.isDragging && css`
    border: 1px solid #91d6ff;
    box-shadow: 0 0 10px 0 rgba(0,130,255,0.3);
  `}
  ${props => props.selected && css`
    background-color: #44A8FE;
    color: white;
  `}
`

const Handle = styled.div`
  padding: 3px;
  margin-right: 10px;
`

const linkStyles = {
  color: 'inherit',
  width: '100%',
  height: '34px',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  marginRight: 15
}

const Lesson = ({
  courseSlug,
  lessonId,
  lesson,
  index,
  onDelete,
  selectedLesson,
  dragDisabled
}) => {

  const selected = selectedLesson == lessonId

  return (
    <Draggable
      draggableId={lessonId}
      index={index}
      isDragDisabled={dragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          selected={selected}
        >
          <Handle {...provided.dragHandleProps}>
            <MenuOutlined></MenuOutlined>  
          </Handle>
          <Link
            key={lessonId}
            href={{ pathname: '/admin/courses/[slug]/lessons', query: { s: lessonId } }}
            as={{ pathname: `/admin/courses/${courseSlug}/lessons`, query: { s: lessonId } }}
          >
            <a style={linkStyles}>
              {lesson && lesson.title}
            </a>
          </Link>
          <LessonTypeIcon
            style={{
              fontSize: 17,
              opacity: 0.5,
              marginRight: 10
            }}
            type={lesson.type}
          />
          <Popconfirm
            title="¿Borrar lección?"
            onConfirm={onDelete}
            okText="Si, borrar"
            cancelText="No, no borrar"
          >
            <Button
              type="text"
              icon={<DeleteOutlined/>}
              style={{
                color: selected ? 'white' : 'inherit'
              }}
            />
          </Popconfirm>
        </Container>
      )}
    </Draggable>
  )
}
export default Lesson