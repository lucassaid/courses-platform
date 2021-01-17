import { useState, useMemo } from 'react'
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

const getCompletedLessons = (userProgress) => {
  let completedLessons = 0
  for(const lesson of Object.values(userProgress.lessons)) {
    if(lesson.completed) completedLessons++
  }
  return completedLessons
}

const emptyCourse = {
  lessonsOrder: [],
  sectionsOrder: []
}

const emptyUserProgress = {
  lessons: {}
}

const Learn = () => {

  const [modals, setModals] = useState({next: false, finished: false}) 
  const [finishedCourseSaved, setFinishedCourseSaved] = useState(false)

  const {user, error: userError} = useUser()
  const router = useRouter()
  const { slug, id: currentLesson } = router.query
  const {data: course = emptyCourse } = useSWR(() => `/api/courses/${slug}`, fetcher)
  const {data: lessons = {} } = useSWR(() => `/api/courses/lessons?courseId=${course.id}`, fetcher)
  const {data: userProgress = emptyUserProgress } = useSWR(() => `/api/learn?courseId=${course.id}`, fetcher)

  const { lessonsOrder } = course
  const completedLessons = useMemo(() => getCompletedLessons(userProgress), [userProgress])
  const progressPercentage = (completedLessons / lessonsOrder.length) * 100
  const finishedCourse = completedLessons + 1 == lessonsOrder.length
  const lesson = lessons[currentLesson]
  const actualIndex = currentLesson && lessonsOrder.length && lessonsOrder.indexOf(currentLesson)

  const menu = (
    <Menu
      currentLesson={currentLesson}
      progressPercentage={progressPercentage}
      userProgress={userProgress}
      course={course}
      lessons={lessons}
    />
  )

  const next = async () => {
    const modalTarget = finishedCourse ? 'finished' : 'next'
    setModals({ ...modals, [modalTarget]: true})

    await mutate(`/api/learn?courseId=${course.id}`, async (oldProgress) => {
      const newProgress = await saveCompletedLesson(course.id, lesson.id)
      return { ...oldProgress, newProgress}
    })

    if(!finishedCourse) {
      const nextLesson = lessonsOrder[actualIndex + 1]
      router.push('/[slug]/learn/[id]', `/${slug}/learn/${nextLesson}`)
      setModals({...modals, next: false})
    } else {
      await saveCompletedCourse(course.id)
      setFinishedCourseSaved(true)
    }
  }
  
  return (
    <>
      <CourseLayout menu={menu} title={course.name}>
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
        <FinishedCourseModal
          saved={finishedCourseSaved}
          visible={modals.finished}
        />
      </CourseLayout>
      {modals.finished && <Confetti numberOfPieces={400}/> }

    </>
  )
}
export default Learn