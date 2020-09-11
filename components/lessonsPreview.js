import { Collapse, Empty } from 'antd'

const { Panel } = Collapse

const Lesson = ({lesson = {}}) => {
  return (
    <div>Leccion: {lesson.title}</div>
  )
}

const LessonsPreview = ({sections = {}, sectionsOrder = [], lessons = {}}) => {

  if(!sectionsOrder.length) {
    return <Empty description="Sin lecciones" image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  return (
    <Collapse>
      {sectionsOrder.map(sectionId => {
        const section = sections[sectionId]
        const lessonsLegnth = section.lessonsIds.length
        const extra = lessonsLegnth == 1 ? '1 lección' : `${lessonsLegnth} lecciones`
        return (
          <Panel
            header={section.title}
            key={section.id}
            extra={extra}
          >
            {section.lessonsIds.map(lessonId => (
              <Lesson key={lessonId} lesson={lessons[lessonId]}/>
            ))}
          </Panel>
        )
      })}
    </Collapse>
  )
}
export default LessonsPreview