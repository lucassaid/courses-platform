import { useState } from 'react'
import Upload from '../upload'
import {Button} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext } from 'react-beautiful-dnd'
import SlidesList from './slidesList'

const limit = 4

const getOrderedIds = slides => {
  return Object.keys(slides).sort((a, b) => slides[a].order - slides[b].order)
}

const HeaderSlides = ({slides: initialSlides, onSave}) => {

  const [slides, setSlides] = useState(initialSlides)
  
  const ids = getOrderedIds(slides)

  const onChange = fileList => {
    for(const file of fileList) {
      if(file.status == 'done') {
        setSlides({
          ...slides,
          [file.uid] : file
        })
      }
    }
  }

  const onDragEnd = result => {
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
    console.log(newSlides)
    setSlides(newSlides)
  }

  const onDelete = id => {
    let newSlides = {...slides}
    delete newSlides[id]
    setSlides(newSlides)
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

      <Upload
        onChange={onChange}
        multiple
        path="homeHeaders/"
        limit={limit}
        listType="picture"
        hideUploaded
      >
        <Button
          style={{marginTop: 10}}
          disabled={Object.keys(slides).length == limit}
          icon={<PlusOutlined />}
        >
          Agregar imagen
        </Button>
      </Upload>

      <div style={{marginTop: 20, textAlign: 'right'}}>
        <Button
          type="primary"
          onClick={() => onSave(slides)}
        >
          Guardar
        </Button>
      </div>
    </>
  )
}
export default HeaderSlides

