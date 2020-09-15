import AdminLayout from '../../../components/adminLayout'
import { PageHeader, message, Button, Table, Avatar, Row, Col, Card } from 'antd'
import HeaderSlides from '../../../components/headerSlides'
import Testimonials from '../../../components/testimonials'

import useSWR, {mutate} from 'swr'
import axios from 'axios'

const fetcher = url => fetch(url).then(r => r.json())

const onSave = async (prop, updateObj, api) => {   
  message.loading({ content: 'Guardando...', key: 'saving' })
  try {
    await axios.put(`/api/customization/${api}`, { [prop]: updateObj })
    mutate(`/api/customization/${api}`)
    message.success({ content: 'Cambios guardados!', key: 'saving' });
  } catch(e) {
    console.warn(e)
    message.error({ content: 'Error al guardar', key: 'saving' });
  }
}


const Customization = () => {

  const {data: headerSlides, error: slidesError} = useSWR('/api/customization/homeSlides', fetcher)
  const {data: testimonials, error: testimonialsError} = useSWR('/api/customization/testimonials', fetcher)

  return(
    <AdminLayout page="customization">
      <PageHeader
        title="Personalización"
      ></PageHeader>

      <Row gutter={[40, 30]}>
        <Col xs={24} md={12}>
          <Card title="Imágenes de cabecera">
            {headerSlides && (
              <HeaderSlides 
                slides={headerSlides}
                onSave={(obj) => onSave('slides', obj, 'homeSlides')}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Testimoniales">
            <Testimonials 
              testimonials={testimonials}
              onSave={(obj) => onSave('testimonials', obj, 'testimonials')}
            />
          </Card>
        </Col>
      </Row>

    </AdminLayout>
  )
}
export default Customization