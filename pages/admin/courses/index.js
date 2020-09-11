import AdminLayout from '../../../components/adminLayout'
import AdminCourses from '../../../components/adminCourses'
import { PageHeader, Button } from 'antd'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'

const RenderedCourses = ({courses, error}) => {
  if (error) return <div>failed to load</div>
  if (!courses) return <div>loading...</div>
  
  const handleOrderChanged = newCourses => {
    mutate(`/api/courses?admin=true`, newCourses)
  }

  return (
    <AdminCourses 
      courses={courses}
      onOrderChanged={handleOrderChanged}  
    />
  )
}

const fetcher = url => fetch(url).then(r => r.json())

const Courses = () => {

  const { data: courses, error } = useSWR(`/api/courses?admin=true`, fetcher)

  return(
    <AdminLayout page="courses">
      <PageHeader
        title="Cursos"
        extra={[
          <Link key="1" href="/admin/courses/new">
            <Button type="primary">
              Crear curso
            </Button>
          </Link>
        ]}
      ></PageHeader>
      
      <RenderedCourses courses={courses} error={error}/>
    </AdminLayout>
  )
}
export default Courses