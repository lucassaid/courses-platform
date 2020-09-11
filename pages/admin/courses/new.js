import { add } from '../../../firebase/client-functions'
import router from 'next/router';
import { message, PageHeader } from 'antd';
import CourseForm from '../../../components/courseForm'
import AdminLayout from '../../../components/adminLayout'

const NewCourse = () => {

  const onFinish = async values => {
    const res = await add(values, {path:['courses']})
    message.success('¡Curso creado!');
    const course = Object.values(res)[0]
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