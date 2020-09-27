import { PageHeader, message } from 'antd'
import SlideForm from '../../../../components/adminBanners/slideForm'
import AdminLayout from '../../../../components/adminLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const NewBanner = () => {
  const {data: slides = {}, error} = useSWR('/api/customization/homeSlides', fetcher)

  const router = useRouter()
  const { id } = router.query
  const slide = slides[id]

  const onFinish = async slide => {
    message.loading({ content: 'Guardando banner', key: 'saving' })
    try {
      await axios.put('/api/customization/homeSlides', {slide: {...slide, id}})
      message.success({ content: 'Cambios guardados', key: 'saving' });
    } catch(err) {
      console.error(err)
      message.error({ content: 'Error al guardar el banner', key: 'saving' });
    }
  }

  const back = () => {
    router.push('/admin/customization')
  }

  return (
    <AdminLayout page="customization">
      <PageHeader
        onBack={back}
        title="Editar banner"
        ghost={false}
        style={{marginBottom: 20}}
      />
      {slide && (
        <SlideForm
          initialValues={slide}
          onFinish={onFinish}
        />
      )}
    </AdminLayout>
  )
}
export default NewBanner