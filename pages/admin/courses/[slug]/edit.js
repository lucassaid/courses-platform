import { message, PageHeader } from 'antd';
import CourseForm from '../../../../components/courseForm'
import AdminLayout from '../../../../components/adminLayout'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import axios from 'axios'

const fetcher = url => fetch(url).then(r => r.json())

const backLinkData = slug => [
  '/admin/courses/[slug]',
  `/admin/courses/${slug}`
]

const EditCourse = () => {

  const router = useRouter()
  const { slug } = router.query
  const apiRoute = `/api/courses/${slug}`

  const { data: course, error } = useSWR(apiRoute, fetcher, {refreshInterval: 0})
  
  const onFinish = async values => {
    await axios.put(`/api/courses`, {courses: {[course.id]: values}})
    mutate(apiRoute, values)
    message.success('Cambios guardados')
    router.push(...backLinkData(values.slug))
  }

  if(error) return 'Error'
  
  return(
    <AdminLayout page="courses">
      { course && (
        <>
          <PageHeader
            ghost={false}
            style={{marginBottom: 30}}
            title={`Editar ${course.name}`}
            onBack={() => router.push(...backLinkData(course.slug))}
          />
          <CourseForm 
            onFinish={onFinish}
            initialValues={course}
          />
        </>
      )}
    </AdminLayout>
  )
}
export default EditCourse