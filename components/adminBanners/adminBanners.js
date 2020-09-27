import { DragDropContext } from 'react-beautiful-dnd'
import SlidesList from './slidesList'
import useSWR, { mutate } from 'swr'
import Link from 'next/link'
import { Button, message } from 'antd'
import axios from 'axios'

const limit = 4
const api = '/api/customization/homeSlides'

const fetcher = url => fetch(url).then(r => r.json())

const getOrderedIds = slides => {
  return Object.keys(slides).sort((a, b) => slides[a].order - slides[b].order)
}

const saveOrder = async ids => {
  message.loading({ content: 'Guardando banners', key: 'saving' })
  try {
    await axios.put(api, {ids})
    message.success({ content: 'Banners guardados', key: 'saving' });
  } catch(err) {
    message.error({ content: 'Error al crear el banner', key: 'saving' });
  }
} 

const AdminBanners = () => {

  const {data: slides = {}, error} = useSWR(api, fetcher)

  const addDisabled = slides && Object.keys(slides).length >= limit

  const ids = getOrderedIds(slides)

  const onDragEnd = async result => {
    const { destination, source, draggableId } = result
    if(!destination) return
    if(destination.index === source.index) return
      
    const newIds = Array.from(ids)
    newIds.splice(source.index, 1)
    newIds.splice(destination.index, 0, draggableId)

    let newSlides = {}
    newIds.forEach((id, i) => {
      newSlides[id] = {
        ...slides[id],
        order: i
      }
    })
    mutate(api, newSlides, false)
    await saveOrder(newIds)
    mutate(api, newSlides)
  }

  const onDelete = async id => {
    let newSlides = {...slides}
    delete newSlides[id]
    mutate(api, newSlides, false)
    await axios.delete(`${api}?id=${id}`)
    mutate(api, newSlides)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <SlidesList
          ids={ids}
          slides={slides}
          onDelete={onDelete}
        ></SlidesList>
      </DragDropContext>

      <Link href="/admin/customization/banners/new">
        <Button disabled={addDisabled}>
          Agregar Banner
        </Button>
      </Link>
    </>
  )
}
export default AdminBanners

