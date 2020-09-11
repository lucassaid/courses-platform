import { VideoCameraOutlined, FilePdfOutlined } from '@ant-design/icons';

const iconStyle = {
  fontSize: 20
}

const LessonTypeIcon = ({type, style}) => {
  if(!type || type == '') return <></>
  return type == 'video' ? (
    <VideoCameraOutlined style={style || iconStyle}/>
  ) : (
    <FilePdfOutlined style={style || iconStyle}/>
  )
}
export default LessonTypeIcon