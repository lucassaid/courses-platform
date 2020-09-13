import styled, {css} from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-bottom-color: #EEE;
  padding: 8px;
  background-color: white;
  ${props => props.isDragging && css`
    border-color: #91d6ff;
    box-shadow: 0 0 10px 0 rgba(0,130,255,0.3);
  `}
`

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`

const DeleteButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`

const CourseItem = ({slide, index, onDelete}) => {

  return (
    <Draggable
      draggableId={slide.uid}
      index={index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
        >
          <Image src={slide.url}/>
          <DeleteButton>
            <Popconfirm
              title="Borrar imagen?"
              onConfirm={onDelete}
              okText="Si, borrar"
              cancelText="No"
            >
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
              />
            </Popconfirm>
          </DeleteButton>
        </Container>
      )}
    </Draggable>
  )
}
export default CourseItem