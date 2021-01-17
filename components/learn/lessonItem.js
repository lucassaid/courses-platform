import styled, {css} from 'styled-components'
import LessonTypeIcon from '../lessonTypeIcon'
import { Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { useRef, useEffect } from 'react'

const { Text } = Typography

const Lesson = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 200ms ease;
  position: relative;
  &:hover {
    background-color: #F4F4F4;
    color: white
  }
  ${props => props.selected && css`
    background-color: #F4F4F4;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 4px;
      bottom: 0;
      background: var(--primary-color);
    }
  `}
`

const Left = styled.div`
  padding: 0 15px 0 5px;
  ${props => props.done && css`
    padding: 0 13px 0 2px;
  `}
`

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #DDD;
`

const checkStyle = {
  background: '#5CB85C',
  color: 'white',
  borderRadius: '50%',
  padding: 4,
  fontSize: 15
}

const scrollContainer = (container, top) => {
  console.log(container, top)
  container.scrollTo({top, behavior: 'smooth'})
}

const LessonItem = ({lesson = {}, lessonNumber, done, selected, containerRef}) => {

  const lessonRef = useRef(null)

  useEffect(() => {
    if(!selected) return
    const { top } = lessonRef.current.getBoundingClientRect()
    const lessonIsHidden = top > document.body.clientHeight - 72
    if(lessonIsHidden) {
      const container = containerRef.current
      const targetTop = container.scrollTop + top - 100
      scrollContainer(container, targetTop)
    }
  }, [selected])

  return (
    <Lesson
      selected={selected}
      ref={lessonRef}
    >
      <Left done={done}>
        {done ? (
          <CheckOutlined style={checkStyle} />
        ): (
          <Circle />
        )}
      </Left>
      <div>
        <div>
          <Text type="secondary" style={{fontSize: '0.8rem'}}>
            <LessonTypeIcon type={lesson.type}/>
            &nbsp; Lección {lessonNumber}
          </Text>
        </div>
        <div><Text>{lesson.title}</Text></div>
      </div>
    </Lesson>
  )
}
export default LessonItem