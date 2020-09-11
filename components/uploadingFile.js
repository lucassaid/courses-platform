import { Progress } from 'antd'

const UploadingFile = ({file}) => {
  return (
    <div key={file.id} style={{margin: '10px 0'}}>
      <div>{file.name}</div>
      <Progress percent={file.progress} status={file.status} />
    </div>
  )
}
export default UploadingFile