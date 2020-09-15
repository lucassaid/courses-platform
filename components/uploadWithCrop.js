import Upload from './upload'
import ImgCrop from 'antd-img-crop';

const UploadWithCrop = ({
  aspect,
  children,
  shape = "rect",
  ...props
}) => {
  return(
    <ImgCrop shape={shape} aspect={aspect}>
      <Upload {...props}>
        {children}
      </Upload>
    </ImgCrop>
  )
}
export default UploadWithCrop