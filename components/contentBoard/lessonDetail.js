import { useState, useEffect } from 'react'
import { Upload, message, Input, Card, Button, Typography, Popconfirm } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile, selectUploadsObj} from '../../lib/slices/uploadsSlice'
import UploadingFile from '../uploadingFile';
import LessonPreview from './lessonPreview'
import LessonTypeIcon from '../lessonTypeIcon'
import store from '../../store'
import axios from 'axios'
import { mutate } from 'swr'

const { Text } = Typography;
const { TextArea } = Input
const { Dragger } = Upload;

const updateLessonHelper = async (courseId, lessonId, updateObj) => {
  message.loading({ content: 'Guardando...', key: 'saving' })
  try {
    await axios.put(`/api/courses/lessons?courseId=${courseId}&lessonId=${lessonId}`, {lesson: updateObj})
    mutate(`/api/courses/lessons?courseId=${courseId}`)
    message.success({ content: 'Cambios guardados', key: 'saving', duration: 1 });
  } catch(err) {
    console.error(err)
    message.error({ content: 'Error al guardar los cambios', key: 'saving', duration: 2 });
  }
}

const LessonDetail = ({courseId, lesson}) => {
  const dispatch = useDispatch()

  const uploads = useSelector(selectUploadsObj)
  const fileId = lesson.id + '_file'
  const uploadingFile =  uploads[fileId]
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const legibleType = lesson.type == 'video' ? 'Video' : 'Práctica'

  useEffect(() => {
    setTitle(lesson.title)
    setNotes(lesson.notes)
  }, [lesson.title, lesson.notes])

  const updateLesson = updateObj => {
    updateLessonHelper(courseId, lesson.id, updateObj)
  }

  function beforeUpload(file) {
    const isVideo = file.type.split('/')[0] == 'video'
    if(!isVideo && file.type != 'application/pdf') return false
    updateLesson({type: isVideo ? 'video' : 'practice'})
    return true
  }

  const uploadCustomRequest = async info => {
    const path = `courses/${courseId}/files/` // only used if file is pdf
    await dispatch(uploadFile(fileId, info.file, path))
    const { uri } = store.getState().uploads[fileId]
    updateLesson({uri})
  }

  const save = () => {
    updateLesson({title, notes})
  }

  const deleteUri = () => {
    updateLesson({uri: '', type: ''})
  }

  return (
    <>
      <Card title="General">
        <Text><label htmlFor="title">Título</label></Text>
        <Input
          style={{margin: '5px 0 20px 0'}}
          id="title"
          autoFocus
          size="large"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <Text><label htmlFor="notes">Notas</label></Text>
        <TextArea
          id="notes"
          style={{margin: '5px 0 20px 0'}}
          placeholder="Notas de la lección (aparecerán abajo del video)."
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />

        <div style={{textAlign: 'right'}}>
          <Button type="primary" onClick={save}>Guardar</Button>  
        </div>
      </Card>

      
      <Card
        title="Contenido"
        style={{marginTop: 20}}
        extra={<LessonTypeIcon style={{fontSize: 20}} type={lesson.type}/>}
      >

        {lesson.uri && lesson.uri != '' ? (
          <>
            <Text style={{ display: 'block', marginBottom: 10}}>
              Tipo de lección: &nbsp;{legibleType}
            </Text>
            <Text style={{ display: 'block', marginBottom: 30}}>
              Vista previa:
            </Text>
            <LessonPreview type={lesson.type} uri={lesson.uri}/>
            <div style={{marginTop: 20, textAlign: 'right'}}>
              <Popconfirm
                placement="left"
                title={`¿Borrar ${legibleType.toLowerCase()}?`}
                okText="Si, borrar"
                cancelText="No, no borrar"
                onConfirm={deleteUri}
              >
                <Button danger>Borrar {legibleType.toLowerCase()}</Button>
              </Popconfirm>
            </div>
          </>
        ):(
          <>
            <Text>Subir archivo</Text>
            <div style={{marginTop: 5}}>
              {uploadingFile && !uploadingFile.finished ? (
                <UploadingFile file={uploadingFile}></UploadingFile> 
              ):(
                <Dragger
                  beforeUpload={beforeUpload}
                  customRequest={uploadCustomRequest}
                  accept="video/mp4,video/x-m4v,video/*,application/pdf"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Arrastrá a esta área el video o el pdf de la lección</p>
                </Dragger>
              )}
            </div>
          </>
        )}

      </Card>
    </> 
  )
}
export default LessonDetail