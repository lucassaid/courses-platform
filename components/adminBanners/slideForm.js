import { useState } from 'react'
import { Button, Form, Input, Row, Col, Slider, Divider, Radio, Select, Affix } from 'antd'
import Upload from '../upload'
import { UploadOutlined } from '@ant-design/icons'
import ColorPicker from './colorPicker'
import SlidePreview from './slidePreview'

const { Option } = Select

const defaultValues = {
  overlay: 0,
  backgroundColor: '#F78DA7',
  desktopImageAlign: 'center',
  desktopImageJustify: 'center',
  contentType: 'text',
  contentImageScale: 30,
  alignItems: 'center',
  justifyContent: 'center',
  textColor: '#333333',
  title: '',
  desc: '',
  mobileImage: [],
  desktopImage: []
}

const SlideForm = ({onFinish, initialValues = defaultValues}) => {

  const [slide, setSlide] = useState(initialValues)

  const normFile = e => {
    if(Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onChange = values => {
    console.log(values)
    setSlide({ ...slide, ...values})
  }

  return (
    <Row gutter={[40, 40]}>
      <Col xs={12}>
        <Form
          layout="vertical"
          name="testimonialsForm"
          onValuesChange={onChange}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Divider orientation="left">Fondo</Divider>

          <Form.Item
            name="mobileImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Tamaño recomendado: 850 x 650"
          >
            <Upload
              listType="picture"
              limit={1}
              path="homeHeaders/"
            >
              <Button icon={<UploadOutlined/> }>
                Fondo
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="desktopImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Tamaño recomendado: 1920 x 500"
          >
            <Upload
              listType="picture"
              limit={1}
              path="homeHeaders/"
            >
              <Button icon={<UploadOutlined/> }>
                Fondo (escritorio)
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="desktopImageAlign" label="Alineación">
            <Radio.Group>
              <Radio.Button value="flex-start">Arriba</Radio.Button>
              <Radio.Button value="center">Centro</Radio.Button>
              <Radio.Button value="flex-end">Abajo</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="backgroundColor"
            label="Color del fondo"
            valuePropName="color"
          >
            <ColorPicker color={slide.backgroundColor}/>
          </Form.Item>

          <Form.Item name="overlay" label="Sombra">
            <Slider tooltipVisible={false}/>
          </Form.Item>

          <Divider orientation="left">Contenido</Divider>

          <Form.Item
            name="contentType"
            noStyle
          >
            <Select style={{width: 100, marginBottom: 20}}>
              <Option value="text">Texto</Option>
              <Option value="image">Imagen</Option>
            </Select>
          </Form.Item>

          {slide.contentType == 'text' ? (
            <>
              <Form.Item
                name="title"
                label="Texto principal"
              >
                <Input placeholder="Texto principal" />
              </Form.Item>

              <Form.Item
                name="desc"
                label="Texto secundario"
              >
                <Input placeholder="Texto secundario" />
              </Form.Item>

              <Form.Item
              name="textColor"
              label="Color del texto"
              valuePropName="color"
              >
                <ColorPicker color={slide.textColor}/>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="contentImage"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Preferentemente en formato 'svg'"
              >
                <Upload
                  listType="picture"
                  limit={1}
                  path="homeHeaders/"
                >
                  <Button icon={<UploadOutlined/> }>
                    Subir Imagen
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="contentImageScale"
                label="Escala"
              >
                <Slider tooltipVisible={false} min={20} max={100}/>
              </Form.Item>
            </>
          )}

          <Divider orientation="left">Alinear contenido</Divider>

          <Form.Item name="justifyContent" label="Alineación horizontal">
            <Radio.Group>
              <Radio.Button value="flex-start">Izquierda</Radio.Button>
              <Radio.Button value="center">Centro</Radio.Button>
              <Radio.Button value="flex-end">Derecha</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="alignItems" label="Alineación vertical">
            <Radio.Group>
              <Radio.Button value="flex-start">Arriba</Radio.Button>
              <Radio.Button value="center">Centro</Radio.Button>
              <Radio.Button value="flex-end">Abajo</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <div style={{marginTop: 20, textAlign: 'right'}}>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={12}>
        <Divider orientation="left">Vista previa</Divider>
        <SlidePreview slide={slide}/>
      </Col>
    </Row>
  )
}
export default SlideForm