import AdminLayout from '../../../components/adminLayout'
import { PageHeader, Row, Col, Card } from 'antd'
import AdminBanners from '../../../components/adminBanners'
import AdminTestimonials from '../../../components/adminTestimonials'

const Customization = () => {

  return(
    <AdminLayout page="customization">
      <PageHeader
        title="Personalización"
      ></PageHeader>

      <Row gutter={[40, 30]}>
        <Col xs={24} md={12}>
          <Card title="Banners de cabecera">
            <AdminBanners/>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Testimoniales">
            <AdminTestimonials/>
          </Card>
        </Col>
      </Row>

    </AdminLayout>
  )
}
export default Customization