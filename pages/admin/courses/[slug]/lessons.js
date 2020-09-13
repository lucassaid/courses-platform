import AdminLayout from '../../../../components/adminLayout'
import ContentBoard from '../../../../components/contentBoard'
import LessonDetail from '../../../../components/contentBoard/lessonDetail'
import { useRouter } from 'next/router'
import { Row, Col, PageHeader } from 'antd'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const CourseContent = () => {

  const router = useRouter()
  const { s: selectedLesson, slug } = router.query

  const { data: course, error: courseError } = useSWR(`/api/courses/${slug}`, fetcher)
  const { data: lessons, error: lessonsError } = useSWR(() =>`/api/courses/lessons?courseId=${course.id}`, fetcher)

  if(courseError || lessonsError) return 'Error'

  const name = course ? course.name : ''
  const lesson = lessons && lessons[selectedLesson]

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
          {course && (
            <ContentBoard course={course} lessons={lessons} selectedLesson={selectedLesson}/>
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