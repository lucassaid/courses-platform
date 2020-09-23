import { useState } from 'react'
import CourseLayout from '../courseLayout'
import useUser from '../../hooks/useUser'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import Menu from './menu'
import { Button, Typography } from 'antd'
import axios from 'axios'
import { NextLessonModal, FinishedCourseModal } from './modals'
import Confetti from 'react-confetti'
import styles from './learn.module.css'
import LessonContent from './lessonContent'

const { Text } = Typography

const fetcher = url => fetch(url).then(r => r.json())

const saveCompletedLesson = async (courseId, lessonId) => {
  const { data: courses } = await axios.put('/api/learn', {type: 'lesson-completed', courseId, lessonId})
  return courses
}

const saveCompletedCourse = async courseId => {
  return await axios.put('/api/learn', {type: 'finished-course', courseId})
}

const Learn = () => {

  const [modals, setModals] = useState({next: false, finished: false}) 
  const [finishedCourseSaved, setFinishedCourseSaved] = useState(false)

  const {user, error: userError} = useUser()
  const router = useRouter()
  const { slug, id: currentLesson } = router.query
  const {data: course, error: courseerror} = useSWR(() => `/api/courses/${slug}`, fetcher)
  const {data: lessons, error: lessonsError} = useSWR(() => `/api/courses/lessons?courseId=${course.id}`, fetcher)
  const {data: userProgress, error: progressError} = useSWR(() => `/api/learn?courseId=${course.id}`, fetcher)
  
  const finalLesson = course && currentLesson == course.lessonsOrder[course.lessonsOrder.length - 1]
  const lesson = lessons && currentLesson && lessons[currentLesson]
  const actualIndex = currentLesson && course && course.lessonsOrder.indexOf(currentLesson)

  const menu = (
    <Menu
      currentLesson={currentLesson}
      userProgress={userProgress}
      course={course}
      lessons={lessons}
    />
  )

  const next = async () => {
    const modalTarget = finalLesson ? 'finished' : 'next'
    setModals({ ...modals, [modalTarget]: true})

    await mutate(`/api/learn?courseId=${course.id}`, async (oldProgress) => {
      console.log(oldProgress)
      const newProgress = await saveCompletedLesson(course.id, lesson.id)
      return { ...oldProgress, newProgress}
    })

    if(!finalLesson) {
      const nextLesson = course.lessonsOrder[actualIndex + 1]
      router.push('/[slug]/learn/[id]', `/${slug}/learn/${nextLesson}`)
      setModals({...modals, next: false})
    } else {
      await saveCompletedCourse(course.id)
      setFinishedCourseSaved(true)
    }
  }
  
  return (
    <>
      <CourseLayout menu={menu} title={course && course.name}>
        <>
          {lesson && (
            <div className={styles.lessonContainer}>

              <LessonContent lesson={lesson}/> 
              <hr/>
              <div className={styles.bottom}>
                <Text>
                  Lección {actualIndex + 1}: {lesson.title}
                </Text>
                <Button
                  type="primary"
                  size="large"
                  onClick={next}
                >
                  Siguiente lección
                </Button>
              </div>
              <div>
                <Text type="secondary">{lesson.notes}</Text>
              </div>
            </div>
          )}
        </>
        <NextLessonModal visible={modals.next}/>
        <FinishedCourseModal saved={finishedCourseSaved} visible={modals.finished}/>
      </CourseLayout>
      {modals.finished && <Confetti numberOfPieces={400}/> }

    </>
  )
}
export default Learn