import router from 'next/router';
import { message, PageHeader } from 'antd';
import CourseForm from '../../../components/courseForm'
import AdminLayout from '../../../components/adminLayout'
import axios from 'axios'
import { mutate } from 'swr'

const NewCourse = () => {

  const onFinish = async values => {
    console.log("ABER", values)
    const { data } = await axios.post(`/api/courses`, {course: values})
    mutate('/api/courses')
    message.success('¡Curso creado!');
    const course = Object.values(data)[0]
    const backLinkData = [
      '/admin/courses/[slug]',
      `/admin/courses/${course.slug}`
    ]
    router.push(...backLinkData);
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