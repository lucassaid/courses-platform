import AdminLayout from '../../../components/adminLayout'
import AdminCourses from '../../../components/adminCourses'
import { PageHeader, Button } from 'antd'
import Link from 'next/link'
import useSWR from 'swr'

const RenderedCourses = ({courses, error}) => {
  if (error) return <div>failed to load</div>
  if (!courses) return <div>loading...</div>

  return (
    <AdminCourses courses={courses}/>
  )
}

const fetcher = url => fetch(url).then(r => r.json())

const Courses = () => {

  const { data: courses, error } = useSWR(`/api/courses`, fetcher)

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