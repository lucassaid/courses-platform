import { update, getDoc } from '../../../../firebase/functions'
import router from 'next/router';
import { message } from 'antd';
import CourseForm from '../../../../components/courseForm'
import withFetch from '../../../../hocs/withFetch'

const EditCourse = ({data}) => {
  
  if(!data) return <></>

  const id = Object.keys(data)[0]

  const onFinish = async values => {
    await update(values, {path:['courses', id]})
    message.success('Cambios guardados');
    router.push('/admin/courses/' + id);
  }
  
  return(
    <>
      <CourseForm 
        onFinish={onFinish}
        initialValues={data[id]}
      />
    </>
  )
}
export default withFetch(
  EditCourse,
  (id) => getDoc(id, {path: ['courses']}),
  'id'
)