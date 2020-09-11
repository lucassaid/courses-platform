import { Drawer, Typography } from 'antd'
import UploadingFile from './uploadingFile'

const { Text } = Typography

const UploadsDrawer = ({uploads, visible, onClose}) => {

  return (
    <Drawer
      title="Subiendo archivos:"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={350}
    >
      {uploads.map(file => (
        <UploadingFile key={file.id} file={file}/>
      ))}

      {!uploads.length && (
        <>
          <Text type="secondary">No hay archivos subiéndose</Text>
        </>
      )}
    </Drawer>
  )
}
export default UploadsDrawer