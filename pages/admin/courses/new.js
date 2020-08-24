import { post } from '../../../firebase/functions'
import router from 'next/router';
import { message } from 'antd';
import CourseForm from '../../../components/courseForm'
import AdminLayout from '../../../components/adminLayout'


const NewCourse = () => {

  const onFinish = async values => {
    console.log(values);
    const res = await post(values, {path:['courses']})
    message.success('¡Curso creado!');
    const id = Object.keys(res)[0]
    router.push('/admin/courses/' + id);
  }
  
  return(
    <AdminLayout>
      <CourseForm onFinish={onFinish}/>
    </AdminLayout>
  )
}
export default NewCourse