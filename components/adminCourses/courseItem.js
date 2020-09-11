import styled, {css} from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { MenuOutlined } from '@ant-design/icons'
import { Avatar, Typography, Space, Tag } from 'antd'
import Link from 'next/link'

const { Text } = Typography

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-bottom-color: #EEE;
  padding: 8px;
  transition: all 0.2s ease;
  transition-property: border-color, box-shadow;
  background-color: white;
  ${props => props.isDragging && css`
    border-color: #91d6ff;
    box-shadow: 0 0 10px 0 rgba(0,130,255,0.3);
  `}
`

const Handle = styled.div`
  padding: 4px 15px 4px 10px;
  margin-right: 5px;
`

const Extra = styled.div`
  margin-left: auto;
`

const CourseItem = ({course, index, disabled}) => {

  return (
    <Draggable
      isDragDisabled={disabled}
      draggableId={course.id}
      index={index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          disabled={disabled}
        >
          <Handle {...provided.dragHandleProps}>
            <MenuOutlined />
          </Handle>
          <Link
            href="/admin/courses/[slug]"
            as={`/admin/courses/${course.slug}`}
          >
            <a style={{color: 'inherit'}}>
              <Space size="middle">
                <Avatar shape="square" size="large" src={course.cover[0].url} />
                <Text>{course.name}</Text>
                <Text>${course.price}</Text>
                <Extra>
                  {!course.published && <Tag color="default">No publicado</Tag>}
                </Extra>
              </Space>
            </a>
          </Link>
        </Container>
      )}
    </Draggable>
  )
}
export default CourseItem