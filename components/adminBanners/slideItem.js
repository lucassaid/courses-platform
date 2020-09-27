import styled, {css} from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd'
import Slide from '../homeHeader/slide'
import { useRouter } from 'next/router'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  padding: 8px;
  background-color: white;
  ${props => props.isDragging && css`
    border-color: #91d6ff;
    box-shadow: 0 0 10px 0 rgba(0,130,255,0.3);
  `}
`

const Buttons = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
`

const SlideItem = ({slide, index, onDelete}) => {

  const router = useRouter()

  const toEdit = () => {
    const prefix = '/admin/customization/banners'
    router.push(`${prefix}/[id]`, `${prefix}/${slide.id}`)
  }

  return (
    <Draggable
      draggableId={slide.id}
      index={index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
        >
          <Slide style={{height: 150}} mode="desktop" slide={slide}/>
          <Buttons>
            <Popconfirm
              title="Borrar banner?"
              onConfirm={onDelete}
              okText="Si, borrar"
              cancelText="No"
            >
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
              />
            </Popconfirm>
            <Button
              style={{marginLeft: 10}}
              icon={<EditOutlined />}
              shape="circle"
              onClick={toEdit}
            />
          </Buttons>
        </Container>
      )}
    </Draggable>
  )
}
export default SlideItem