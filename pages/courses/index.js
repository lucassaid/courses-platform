import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import Section from '../../components/section'
import { Typography } from 'antd'
import CoursesList from '../../components/coursesList'
import utilStyles from '../../styles/utils.module.css'

const { Title, Paragraph, Text } = Typography;

const Courses = () => {

  return (
    <Layout page="home">
      <Head>
        <title>{siteTitle}</title>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
      </Head>

      <Section>
        <div style={{marginBottom: 40}}>
          <Title style={{fontFamily: "'Pacifico', cursive", fontWeight: 100}}>Cursos</Title>
          <Text type="secondary">
            ¿Estás lista para tomar acción?
          </Text>
        </div>
        <CoursesList></CoursesList>
      </Section>
    </Layout>
  )
}

export default Courses
