import {useState} from 'react'
import CourseCard from './courseCard'
import { Row, Col } from 'antd'
import { getList } from '../firebase/functions'
import withFetch from '../hocs/withFetch'
import Link from 'next/link'

const CoursesList = ({data, ...props}) => {

  const courses = data ? (
    Object.keys(data).map(id => ({...data[id], id})) 
  ): [{},{},{},{},{},{}]

  return(
    <Row gutter={[12, 30]}>
      {courses.map((course, i) => (
        <Col key={course.id || i} xs={24} sm={12} md={8}>
          <Link href={`/courses/${course.slug}`}>
            <a alt={course.name} style={{textDecoration: 'none'}}>
              <CourseCard showMp course={course}></CourseCard>
            </a>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
export default withFetch(
  CoursesList,
  () => getList({path: ['courses']})
)