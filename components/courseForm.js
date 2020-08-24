import { Form, Input, Button, InputNumber} from 'antd';
import UploadWithCrop from './uploadWithCrop'
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

const CourseForm = ({onFinish, initialValues}) => {

  const normFile = e => {
    if(Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  return(
    <Form 
      {...layout}
      name="new-course"
      onFinish={onFinish}
      hideRequiredMark={true}
      initialValues={initialValues}
    >
      <Form.Item 
        name="name"
        label="Nombre"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="desc"
        label="Descrición breve"
        rules={[{ required: true }]}
      >
        <TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item
        name="cover"
        label="Imagen de portada"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true }]}
      >
        <UploadWithCrop aspect={16/9} folder="courses" listType="picture">
          <Button>
            <UploadOutlined/> Elegir imagen
          </Button>
        </UploadWithCrop>
      </Form.Item>
      <Form.Item
        name="price"
        label="Precio"
        rules={[{ required: true }]}
      >
        <InputNumber
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        name="slug"
        label="Link"
        rules={[{ required: true }]}
      >
        <Input addonBefore="ameliejulieta.com/"/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  )
}
export default CourseForm