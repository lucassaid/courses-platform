import router from 'next/router';
import { message, PageHeader } from 'antd';
import CourseForm from '../../../components/courseForm'
import AdminLayout from '../../../components/adminLayout'
import axios from 'axios'
import { mutate } from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const NewCourse = () => {

  const onFinish = async values => {
    message.loading({ content: 'Creando curso', key: 'creating' })
    try {
      let course = {}
      await mutate('/api/courses', async courses => {
        const { data } = await axios.post(`/api/courses`, {course: values})
        course = data
        return {
          ...courses,
          [course.id]: course
        }
      })

      const backLinkData = [
        '/admin/courses/[slug]',
        `/admin/courses/${course.slug}`
      ]
      message.success({ content: '¡Curso creado!', key: 'creating' });
      router.push(...backLinkData);
    } catch(err) {
      console.warn(err)
      message.error({ content: 'Error al crear curso', key: 'creating' });
    }
  }
  
  return(
    <AdminLayout>
      <PageHeader
        title="Nuevo Curso"
        onBack={() => router.push('/admin/courses/')}
      />
      <CourseForm onFinish={onFinish}/>
    </AdminLayout>
  )
}
export default NewCourse