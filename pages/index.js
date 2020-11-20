import Head from 'next/head'
import Layout, { name, siteTitle } from '../components/layout'
import Section from '../components/section'
import { Avatar, Row, Col, Typography } from 'antd'
import CoursesList from '../components/coursesList'
import utilStyles from '../styles/utils.module.css'
import HomeHeader from '../components/homeHeader'
import TestimonialsCarousel from '../components/testimonialsCarousel'
import SocialLinks from '../components/socialLinks'

const { Title, Paragraph, Text } = Typography;

const IndexPage = ({slides}) => {

  // const items = [
  //   {
  //     title: 'Mi producto',
  //     unit_price: 100,
  //     quantity: 1,
  //   }
  // ]
  // const setMercadoPagoPreferences = async () => {
  //   const initPoint = await fetch('/api/payments/mercado_preference', {
  //     method: 'POST',
  //     body: JSON.stringify({items}),
  //   }).then(res => res.json());
  //   const script = document.createElement('script');
  //   script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
  //   script.async = true;
  //   script.setAttribute('data-preference-id', initPoint.preferenceId);
  //   document.getElementById('mercadoForm').appendChild(script);
  // };
  
  // useEffect(() => {
  //   setMercadoPagoPreferences();
  // }, []);
  

  return (
    <Layout page="home">
      <Head>
        <title>{siteTitle}</title>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
      </Head>

      {/* <form action="/procesar-pago" method="POST" id="mercadoForm" /> */}

      <HomeHeader/>

      <Section className={utilStyles.headingMd}>
        <Row gutter={[8, 24]}>
          <Col xs={24} md={8} style={{textAlign: 'center'}}>
            <Avatar size={170} src="/images/juli-amelie.png"/>
            <SocialLinks style={{marginTop: 5, justifyContent: 'center'}}/>
          </Col>
          <Col xs={24} md={16}>
            <Title  style={{fontFamily: "'Pacifico', cursive", fontWeight: 100}}>Hola!</Title>
            <Paragraph>
              Soy Julieta Amelie, Mentora de mujeres apasionadas. Pero antes de todo eso soy mamá y mujer. Me encanta poder motivar a otras mujeres a que aparte de apostar en un emprendimiento primero apuesten en ellas mismas, en conectar primero desde el amor. Luego, todo llega a su tiempo!
            </Paragraph>
          </Col>
        </Row>
      </Section>

      <Section bg className={utilStyles.headingMd}>
        <Row
          style={{flexDirection: 'row-reverse'}}
          gutter={[40, 40]}
          align="middle"
        >
          <Col xs={24} md={12}>
            <img src="/images/learn.svg" alt=""/>
          </Col>
          <Col xs={24} md={12}>
            <Paragraph>
              Acá vas a encontrar todos mis cursos online con diferentes temáticas: Para aprender y para emprender. Espero poder acompañarte en cada paso y que juntas vayamos por todos tus objetivos!
            </Paragraph>
            <Paragraph>
              ¡Sí podés, sí sos capaz, sí te lo merecés!
            </Paragraph>
          </Col>
        </Row>
      </Section>

      <Section>
        <div style={{marginBottom: 40}}>
          <Title style={{fontFamily: "'Pacifico', cursive", fontWeight: 100}}>Cursos</Title>
          <Text type="secondary">
            ¿Estás lista para tomar acción?
          </Text>
        </div>
        <CoursesList/>
        
      </Section>

      <Section bg bgSoft>
        <div style={{marginBottom: 50}}>
          <Title style={{fontFamily: "'Pacifico', cursive", fontWeight: 100}}>¡Vos también podés!</Title>
          {/* <Text type="secondary">
            Testimoniales
          </Text> */}
        </div>
        <TestimonialsCarousel/>
        
      </Section>
    </Layout>
  )
}

export default IndexPage


// export async function getServerSideProps(context) {
//   const slides = await getHomeSlides()
//   return {
//     props: { slides },
//   }
// }