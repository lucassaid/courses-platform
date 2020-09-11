import { useEffect } from 'react'
import AdminLayout from '../../../../components/adminLayout'
import ContentBoard from '../../../../components/contentBoard'
import LessonDetail from '../../../../components/contentBoard/lessonDetail'
import { useRouter } from 'next/router'
import { Row, Col, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { receiveContent, selectContent } from '../../../../lib/slices/contentsSlice'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const CourseContent = () => {

  const router = useRouter()
  const { s: selectedLesson, slug } = router.query

  const { data: course, error: courseError } = useSWR(`/api/courses/${slug}`, fetcher, {refreshInterval: 0})
  const { data: lessons, error: lessonsError } = useSWR(`/api/courses/${slug}/lessons`, fetcher, {refreshInterval: 0})

  const dispatch = useDispatch()
  const allContents = useSelector(selectContent)

  useEffect(() => {
    if(course && lessons) {
      dispatch(receiveContent({...course, lessons}))
    }
  }, [course, lessons])

  if(courseError || lessonsError) return 'Error'

  const content = course && allContents[course.id]
  const lesson = content && content.lessons[selectedLesson]
  const name = course ? course.name : ''

  return(
    <AdminLayout page="courses">
      <PageHeader
        ghost={false}
        style={{marginBottom: 30}}
        title={`${name} - Lecciones`}
        onBack={() => router.push('/admin/courses/[slug]', `/admin/courses/${course.slug}`)}
      />
      
      <Row gutter={[30, 30]}>
        <Col xs={24} md={10}>
          {content && (
            <ContentBoard course={course} content={content} selectedLesson={selectedLesson}/>
          )}
        </Col>
        <Col xs={24} md={14}>
          {lesson && (
            <LessonDetail courseId={course.id} lesson={lesson}/>
          )}
        </Col>
      </Row>
    </AdminLayout> 
  )
}
export default CourseContent