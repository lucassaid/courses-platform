import { getAllCoursesIds, getCourseData } from '../../lib/courses'
import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head'
import HeaderImage from '../../components/headerImage'
import Section from '../../components/section'
import utilStyles from '../../styles/utils.module.css'
import CoursesList from '../../components/coursesList'
import { Typography, Collapse, Row, Col, Card, Button} from 'antd'
import {
  PlayCircleOutlined,
  FileDoneOutlined,
  CoffeeOutlined,
  CommentOutlined,
  EyeOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Panel } = Collapse

const WhyToBuyList = ({icon, text}) => {

  const whyToBuyArr = [
    {key: '1', icon: <PlayCircleOutlined/>, text: "20 clases en video"},
    {key: '2', icon: <FileDoneOutlined/>, text: "Material para descargar"},
    {key: '3', icon: <CoffeeOutlined/>, text: "Hacelo a tu ritmo"},
    {key: '4', icon: <CommentOutlined/>, text: "Ayuda para lo que necesites"},
    {key: '5', icon: <EyeOutlined />, text: "Acceso de por vida"}
  ]

  return (
    <>
      {whyToBuyArr.map(reason => (
        <div key={reason.key} style={{margin: '5px 0'}}>
          {reason.icon}&nbsp; {reason.text}
        </div>
      ))}
    </>
  )
}


export default function Post({course}) {

  const buyCard = (
    <Card>
      <Text type="secondary">¡Comprá ahora!</Text>
      <Title style={{fontWeight: 300, margin: '10px 0'}} >${course.price}</Title>
      <Button
        style={{width: '100%', marginBottom: 10}}
        type="primary"
        size="large"
      >
        Comprar
      </Button>
      <WhyToBuyList></WhyToBuyList>
      <br/><br/>
      <div style={{textAlign:'right'}}>
        <span>Compra segura con </span>&nbsp;&nbsp;
        <img style={{width: 80, display: 'inline'}} src="/images/mp-h-sm.png" alt=""/>
      </div>
    </Card>
  )
  
  return (
    <Layout>
      <Head>
        <title>{siteTitle} {course.name}</title>
      </Head>

      <HeaderImage
        src={course.cover[0].url}
        alt={course.name}
      />

      <Section className={utilStyles.headingMd}>
        <Row gutter={[32, 12]}>
          <Col xs={24} md={15}>
            <Title level={2}>{course.name}</Title>
            {course.desc}

            <Title level={3}>Contenido del curso</Title>
            <Collapse defaultActiveKey={['1']} >
              <Panel header="Introducción" key="1" extra="5 lecciones">
                <p>leccion</p>
              </Panel>
              <Panel header="Armado y planificación" key="2" extra="5 lecciones">
                <p>leccion</p>
              </Panel>
              <Panel header="Calcular cantidades" key="3" disabled extra="5 lecciones">
                <p>leccion</p>
              </Panel>
            </Collapse>
          </Col>
          <Col xs={24} md={9}>
            {buyCard}
          </Col>

        </Row>
      </Section>

      <Section title="Otros cursos">
        <CoursesList></CoursesList>
      </Section>
      {/* <div dangerouslySetInnerHTML={{ __html: course.contentHtml }} /> */}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const course = await getCourseData(context.params.id)
  return {
    props: {
      course
    }
  }
}