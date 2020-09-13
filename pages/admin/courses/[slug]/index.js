import React, { useState } from 'react'
import CourseCard from '../../../../components/courseCard'
import AdminLayout from '../../../../components/adminLayout'
import { Modal, PageHeader, Button, Row, Col, Card, message, Badge, Typography } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import LessonsPreview from '../../../../components/lessonsPreview'
import useSWR, { mutate } from 'swr'
import axios from 'axios'

const { Text } = Typography

const fetcher = url => fetch(url).then(r => r.json())

const CourseOverview = () => {

  const router = useRouter()
  const { slug } = router.query
  const { data: course = {}, error } = useSWR(`/api/courses/${slug}`, fetcher)
  const { data: lessons = {}, error: lessonsError } = useSWR(() =>`/api/courses/lessons?courseId=${course.id}`, fetcher)
  const [updatingCourse, setUpdatingCourse] = useState(false)
  
  const handlePublish = async () => {
    setUpdatingCourse(true)
    await axios.put(`/api/courses`, {courses: {[course.id]: {published: !course.published}}})
    mutate(`/api/courses/${slug}`, {...course, published: !course.published})
    setUpdatingCourse(false)
  }

  const deleteCourse = async () => {
    // this only sets 'archived' = true
    setUpdatingCourse(true)
    await axios.put(`/api/courses`, {courses: {[course.id]: {archived: true}}})
    mutate(`/api/courses/${slug}`, {...course, archived: true})
    message.success({ content: 'Curso eliminado', duration: 1 });
    router.push('/admin/courses/')
    setUpdatingCourse(false)
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
            <div>
              link en la pagina:
              <Link href="/courses/[slug]" as={`/courses/${course.slug}`}>
                <a>&nbsp; ameliejulieta.com/{course.slug}</a>
              </Link>
            </div>
            <br/>
            <div>
              link de pago: &nbsp;
              {course.paylink ? (
                <a target="_blank" href={course.paylink}>
                  <Button>Comprar</Button>
                </a>
              ):(
                <Text type="secondary"> Este curso no tiene link de pago todavía</Text>
              )}
            </div>
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