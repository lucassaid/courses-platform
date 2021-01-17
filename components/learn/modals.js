import { SmileTwoTone } from '@ant-design/icons'
import { Button, Modal, Typography, Spin } from 'antd'
const { Title, Text } = Typography

const WrappedModal = ({children, visible}) => (
  <Modal
    bodyStyle={{textAlign: 'center'}}
    visible={visible}
    footer={null}
    centered={true}
    closable={false}
  >
    {children}
  </Modal>
)

export const NextLessonModal = ({visible}) => (
  <WrappedModal visible={visible}>
    <SmileTwoTone style={{fontSize: '4rem', marginBottom: 20}}/>
    <Title level={2}>¡Bien hecho!</Title>
    <div style={{marginTop: 30, textAlign: 'right'}}>
      <Text type="secondary">Cargando próxima lección &nbsp;</Text> <Spin/>
    </div>
  </WrappedModal> 
)

export const FinishedCourseModal = ({saved, visible}) => (
  <WrappedModal visible={visible}> 
    <img src="/images/confetti.svg" style={{margin: '0 auto', width: 100}}/>
    <Title level={2} style={{marginTop: 20}}>¡Completaste el curso!</Title>

    <Button type="primary" size="large" loading={!saved}>
      {saved ? 'Ir a mi perfil' : 'Guardando...'}
    </Button>
  </WrappedModal> 
)