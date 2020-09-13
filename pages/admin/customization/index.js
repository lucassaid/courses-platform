import AdminLayout from '../../../components/adminLayout'
import { PageHeader, message, Button, Table, Avatar, Row, Col, Card } from 'antd'
import HeaderSlides from '../../../components/headerSlides/headerSlides'
import useSWR, {mutate} from 'swr'
import axios from 'axios'

const fetcher = url => fetch(url).then(r => r.json())

const saveHeaderSlides = async slides => {    
  message.loading({ content: 'Guardando...', key: 'saving' })
  try {
    await axios.put('/api/customization/homeSlides', { slides })
    mutate(`/api/customization/homeSlides`)
    message.success({ content: 'Cambios guardados!', key: 'saving' });
  } catch(e) {
    console.warn(e)
    message.error({ content: 'Error al guardar', key: 'saving' });
  }
}


const Customization = () => {

  const {data: headerSlides, error: slidesError} = useSWR('/api/customization/homeSlides', fetcher)

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
                onSave={saveHeaderSlides}
              />
            )}
          </Card>
        </Col>
      </Row>

    </AdminLayout>
  )
}
export default Customization