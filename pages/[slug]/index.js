import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head'
import HeaderImage from '../../components/headerImage'
import Section from '../../components/section'
import CoursesList from '../../components/coursesList'
import { Typography, Row, Col, Card, Button} from 'antd'
import {
  PlayCircleOutlined,
  FileDoneOutlined,
  CoffeeOutlined,
  CommentOutlined,
  EyeOutlined
} from '@ant-design/icons'
import LessonsPreview from '../../components/lessonsPreview'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const { Title, Text } = Typography

const WhyToBuyList = ({icon, text}) => {

  const whyToBuyArr = [
    // {key: '1', icon: <PlayCircleOutlined/>, text: "20 clases en video"},
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

const Price = ({price, oldPrice}) => (
  <>
    {oldPrice && (
      <div style={{marginTop: 10}}>
        <Text style={{textDecoration: 'line-through', fontSize: '1.2rem'}} type="secondary">
          ${oldPrice}
        </Text>
      </div>
    )}
    <Title 
      style={{
        fontWeight: 300,
        margin: '10px 0',
        marginTop: oldPrice ? 0 : 10
      }}
    >
      ${price}
    </Title>
  </>
)

const fetcher = url => fetch(url).then(r => r.json())

export default function CourseOverview() {

  const router = useRouter()
  const { data: course = {}, error } = useSWR(`/api/courses/${router.query.slug}`, fetcher)

  if (error) return <div>failed to load</div>

  const buyCard = (
    <Card loading={!course.id}>
      <Text type="secondary">¡Comprá ahora!</Text>
      <Price price={course.price} oldPrice={course.old_price}/>
      {course.paylink && (
        <a href={course.paylink}>
          <Button
            style={{width: '100%', marginBottom: 10}}
            type="primary"
            size="large"
          >
            Comprar
          </Button>
        </a>
      )}
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
        image={course.id && course.cover[0]}
        alt={course.name}
      />

      <Section>
        <Row gutter={[32, 12]}>
          <Col xs={24} md={15}>
            <Title level={2}>{course.name}</Title>
            {course.desc}

            {/* <Title level={3}>Contenido del curso</Title>
            <LessonsPreview
              sections={course.sections}
              sectionsOrder={course.sectionsOrder}
            /> */}
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