import { PageHeader, message } from 'antd'
import SlideForm from '../../../../components/adminBanners/slideForm'
import AdminLayout from '../../../../components/adminLayout'
import axios from 'axios'
import { useRouter } from 'next/router'

const NewBanner = () => {

  const router = useRouter()
  
  const onFinish = async slide => {
    message.loading({ content: 'Creando banner', key: 'saving' })
    try {
      await axios.post('/api/customization/homeSlides', {slide})
      message.success({ content: 'Banner creado!', key: 'saving' });
      back()
    } catch(err) {
      console.error(err)
      message.error({ content: 'Error al crear el banner', key: 'saving' });
    }
  }
  
  const back = () => {
    router.push('/admin/customization')
  }

  return (
    <AdminLayout page="customization">
      <PageHeader
        onBack={back}
        title="Nuevo banner"
        ghost={false}
        style={{marginBottom: 20}}
      />
      <SlideForm onFinish={onFinish}/>
    </AdminLayout>
  )
}
export default NewBanner