import { useState } from 'react'
import { Menu, Dropdown, Collapse, Button } from 'antd';
import { getList } from '../../../../firebase/functions'
import withFetch from '../../../../hocs/withFetch'
import { 
  PlusOutlined,
  DownOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined
} from '@ant-design/icons'

const { Panel } = Collapse;

const Suffix = () => {
  return <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
}

const LessonMenu = ({index, arrLength, onUp, onDown}) => (
  <Menu>
    <Menu.Item 
      disabled={index === 0}
      key="1"
      icon={<CaretUpOutlined />}
      onClick={onUp}
    >
      Mover arriba
    </Menu.Item>
    <Menu.Item
      disabled={index === arrLength - 1}
      key="2"
      icon={<CaretDownOutlined />}
      onClick={onDown}
    >
      Mover abajo
    </Menu.Item>
    <Menu.Item key="3" icon={<DeleteOutlined />}>
      Eliminar
    </Menu.Item>
  </Menu>
)

const Options = ({children}) => (
  <Dropdown overlay={children}>
    <Button size="small">
      Opciones <DownOutlined />
    </Button>
  </Dropdown>
)

const Lessons = ({data}) => {

  const [lessons, setLessons] = useState({
    otroId: {
      order: 2,
      title: '3'
    },
    ad23d: {
      order: 1,
      title: 'holis'
    }
  })

  const onUp = (index) => {
    const lesson = orederLessons[index]
    const prevLesson = orederLessons[index - 1]
    setLessons({
      ...lessons,
      [lesson.id]: {...lesson, order: lesson.order - 1},
      [prevLesson.id]: {...prevLesson, order: prevLesson.order + 1}
    })
  }

  const onDown = (index) => {
    const lesson = orederLessons[index]
    const nextLesson = orederLessons[index + 1]
    setLessons({
      ...lessons,
      [lesson.id]: {...lesson, order: lesson.order + 1},
      [nextLesson.id]: {...nextLesson, order: nextLesson.order - 1}
    })
  }

  const lessonsArr = Object.keys(lessons).map(id => ({...lessons[id], id}))
  const orederLessons = lessonsArr.sort((a, b) => a.order - b.order)

  return(
    <Collapse defaultActiveKey={['1']}>
      {orederLessons.map((lesson, i) => {
        const extra = (
          <Options>
            <LessonMenu
              onUp={() => onUp(i)}
              onDown={() => onDown(i)}
              index={i}
              arrLength={orederLessons.length}
            />
          </Options>
        )

        return (
          <Panel
            header={`Lección ${lesson.order}`}
            key={lesson.id}
            extra={extra}
          >
            <p>{lesson.title}</p>
          </Panel>
        )
      })}
    </Collapse>
  )
}
export default withFetch(
  Lessons,
  (id) => getList({path: ['courses', id, 'lessons']}),
  'id'
)