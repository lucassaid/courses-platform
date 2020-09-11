import React, {useState, useEffect} from 'react'
import CourseCard from '../../../../components/courseCard'
import AdminLayout from '../../../../components/adminLayout'
import { Modal, PageHeader, Button, Row, Col, Card, message, Badge } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import LessonsPreview from '../../../../components/lessonsPreview'
import { update } from '../../../../firebase/client-functions'
import useSWR, { mutate } from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const CourseOverview = () => {

  const router = useRouter()
  const { slug } = router.query
  const { data: course = {}, error } = useSWR(`/api/courses/${slug}`, fetcher)
  const { data: lessons = {}, error: lessonsError } = useSWR(`/api/courses/${slug}/lessons`, fetcher)
  const [updatingCourse, setUpdatingCourse] = useState(false)
  
  const config = {path: ['courses', course.id]}

  const handlePublish = async () => {
    setUpdatingCourse(true)
    const published = !course.published
    await update({published}, config)
    mutate(`/api/courses/${slug}`, {...course, published})
    setUpdatingCourse(false)
  }

  const deleteCourse = async () => {
    // this only sets 'archived' = true
    setUpdatingCourse(true)
    await update({archived: true}, config)
    message.success({ content: 'Curso eliminado', duration: 1 });
    router.push('/admin/courses/')
    return 'ok'
  }

  const handleDelete = () => {
    Modal.confirm({
      title: '¿Eliminar curso?',
      content: '¡Vas a eliminar todo el contenido de este curso! Si un alumno está haciéndolo no podrá completarlo.',
      cancelText: 'No, no eliminar',
      okText: 'Eliminar curso',
      okButtonProps: {danger: true, type: 'primary'},
      onOk: deleteCourse
    })
  }
  
  return (
    <AdminLayout page="courses">
      <PageHeader
        ghost={false}
        style={{marginBottom: 30}}
        title={course.name}
        onBack={() => router.push('/admin/courses/')}
        extra={[
          <Button
            key="1"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            type="text"
          >
            Eliminar
          </Button>,
          <Button
            key="2"
            type={course.published ? 'text' : 'primary'}
            icon={course.published ? <EyeInvisibleOutlined /> : false}
            onClick={handlePublish}
            disabled={updatingCourse}
          >
            {course.published ? 'Dejar de publicar' : 'Publicar'}
          </Button>
        ]}
      />

      {error || lessonsError && <div>failed to load</div>}

      <Row gutter={[40, 30]}>
        <Col xs={24} md={12}>
          <CourseCard
            noHoverable={true}
            title="Datos principales"
            extra={
              <Link
                href="/admin/courses/[slug]/edit"
                as={`/admin/courses/${course.slug}/edit`}
              >
                <a>Editar</a>
              </Link>
            } 
            course={course}
            loading={!course == {}}
          >
            <br/>
            link:
            <Link href="/courses/[slug]" as={`/courses/${course.slug}`}>
              <a> ameliejulieta.com/{course.slug}</a>
            </Link>
          </CourseCard>
        </Col>
        <Col xs={24} md={12}>
          <Badge.Ribbon text="Proximamente!" placement="end">
            <Card
              title="Lecciones"
              // extra={
              //   <Link
              //     href="/admin/courses/[slug]/lessons"
              //     as={`/admin/courses/${course.slug}/lessons`}
              //   >
              //     <a>Editar</a>
              //   </Link>
              // }
            >
              <LessonsPreview
                sections={course.sections}
                sectionsOrder={course.sectionsOrder}
                lessons={lessons}
              />
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>
      
    </AdminLayout>
  )
}
export default CourseOverview