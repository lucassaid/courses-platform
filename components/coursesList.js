import CourseCard from './courseCard'
import { Row, Col } from 'antd'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const getOrderedCourses = courses => {
  return Object.values(courses).sort((a, b) => a.order - b.order)
}

const CoursesList = () => {

  const { data, error } = useSWR('/api/courses?hideUnpublished=true', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const courses = data ? (
    getOrderedCourses(data)
  ): [{},{},{},{},{},{}]

  return(
    <Row gutter={[12, 30]}>
      {courses.map((course, i) => (
        <Col key={course.id || i} xs={24} sm={12} md={8}>
          {course.id ? (
            <Link href="/[slug]" as={`/${course.slug}`}>
              <a alt={course.name} style={{textDecoration: 'none'}}>
                <CourseCard showMp course={course}></CourseCard>
              </a>
            </Link>
          ):(
            <CourseCard loading></CourseCard>
          )}
        </Col>
      ))}
    </Row>
  )
}
export default CoursesList