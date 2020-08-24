import React, { useEffect } from 'react'
import { getDoc } from '../../../firebase/functions'
import withFetch from '../../../hocs/withFetch'
import CourseCard from '../../../components/courseCard'
import AdminLayout from '../../../components/adminLayout'

const CourseOverview = ({data = {}}) => {
  
  const id = Object.keys(data)[0]
  const course = data[id]
  
  const renderedOverview = (
    course && (<>
      <CourseCard 
        title="Datos principales"
        extra={<a href={`/admin/courses/${id}/edit`}>Editar</a>} 
        course={course}
      >
        <br/>
        Precio: ${course.price}
        <br/>
        link: <a>ameliejulieta.com/{course.slug}</a>
      </CourseCard>
    </>)
  )

  return(
    <AdminLayout>
      {course ? renderedOverview : 'cargando...'}
    </AdminLayout>
  )
}
export default withFetch(
  CourseOverview,
  (id) => getDoc(id, { path: ['courses'] }),
  'id'
)