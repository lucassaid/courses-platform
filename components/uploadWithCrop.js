import Upload from './upload'
import ImgCrop from 'antd-img-crop';

const UploadWithCrop = ({aspect, children, ...props}) => {
  return(
    <ImgCrop aspect={aspect}>
      <Upload {...props}>
        {children}
      </Upload>
    </ImgCrop>
  )
}
export default UploadWithCrop