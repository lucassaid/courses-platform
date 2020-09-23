import { useEffect, useRef, createRef, } from 'react'
import LessonItem from './lessonItem'
import styled, {css} from 'styled-components'
import Link from 'next/link'
import { Progress } from 'antd'

const Separator = styled.div`
  padding: 8px 16px;
  background: #EEE;
  margin: 10px 0px;
`

const MenuContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: min-content auto; 
  grid-template-columns: auto;
`

const Lessons = styled.div`
  overflow-y: auto;
`

const CourseProgres = ({userProgress, lessonsOrder, style = {}}) => {
  let progress
  try {
    let completedLessons = 0
    for(let lessonId in userProgress.lessons) {
      const lesson = userProgress.lessons[lessonId]
      if(lesson.completed) completedLessons++
    }
    progress = (completedLessons / lessonsOrder.length) * 100
  } catch(err) {
    progress = 0
  }
  
  return (
    <div style={style}>
      <Progress percent={progress} showInfo={false}/>
    </div>
  )
}

const scrollContainer = (container, top) => {
  container.scroll({
    top: container.scrollTop + 150,
    left: 0,
    behavior: 'smooth'
  })
}

const Menu = ({userProgress, course, lessons, currentLesson}) => {
  if(!course || !lessons) return <></>

  const lessonsContainerRef = useRef(null)
  const lessonsRef = useRef(course.lessonsOrder.map(() => createRef()))

  useEffect(() => {
    const lessonIndex = course.lessonsOrder.indexOf(currentLesson)
    const el = lessonsRef.current[lessonIndex].current
    const { top } = el.getBoundingClientRect()
    const lessonIsHidden = top > document.body.clientHeight - 72
    if(lessonIsHidden) {
      const container = lessonsContainerRef.current
      scrollContainer(container, top)
    }
  }, [currentLesson])

  return(
    <MenuContainer>
      <div>
        <h3 style={{padding: 16, paddingBottom: 0}}>Contenido del curso</h3>

        <CourseProgres
          style={{margin: 20, marginTop: 0}}
          userProgress={userProgress}
          lessonsOrder={course.lessonsOrder}
        />
      </div>

      <Lessons ref={lessonsContainerRef}>
        {course.sectionsOrder.map(sectionId => {
          const section = course.sections[sectionId]
          return (
            <div key={sectionId}>
              <Separator>{section.title}</Separator>
              {section.lessonsIds.map(lessonId => {
                const lesson = lessons[lessonId]
                const lessonIndex = course.lessonsOrder.indexOf(lessonId)
                let done
                try {
                  done = userProgress.lessons[lessonId].completed
                } catch(err) {
                  done = false
                }

                return (
                  <Link 
                    key={lessonId}
                    href="/[slug]/learn/[id]"
                    as={`/${course.slug}/learn/${lessonId}`}
                  >
                    <a ref={lessonsRef.current[lessonIndex]} style={{color: 'inherit', textDecoration: 'none'}}>
                      <LessonItem
                        selected={currentLesson == lessonId}
                        lesson={lesson}
                        lessonNumber={lessonIndex + 1}
                        done={done}
                      />
                    </a>
                  </Link>  
                )
              })}
            </div>
          )
        })}
      </Lessons>

    </MenuContainer>
  )
}
export default Menu