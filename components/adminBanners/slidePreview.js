import { useState } from 'react'
import { Tabs, } from 'antd'
import Slide from '../homeHeader/slide'
import { DesktopOutlined, MobileOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const styles = {
  mobile: {
    height: 350
  },
  desktop: {
    height: 250
  }
}

const SlidePreview = ({slide}) => {

  const [mode, setMode] = useState('mobile')

  const onChange = e => {
    setMode(e == '1' ? 'mobile' : 'desktop')
  }


  console.log(mode)

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane
          tab={
            <span>
              <MobileOutlined />
              Celular
            </span>
          }
          key="1"
        />
        <TabPane
          tab={
            <span>
              <DesktopOutlined />
              Escritorio
            </span>
          }
          key="2"
        />
      </Tabs>

      <Slide style={styles[mode]} mode={mode} slide={slide}/>
    </>
  )
}
export default SlidePreview