import { Form, Input, Button, InputNumber, Card} from 'antd';
import UploadWithCrop from './uploadWithCrop'
import { UploadOutlined } from '@ant-design/icons';
import slug from 'limax'

const { TextArea } = Input;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
}

const CourseForm = ({onFinish, initialValues}) => {

  const [form] = Form.useForm()

  const normFile = e => {
    if(Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onValuesChange = values => {
    if(Object.keys(values)[0] === 'name') {
      form.setFieldsValue({slug: slug(values.name)})
    }
  }

  return(
    <Card>
      <Form 
        {...layout}
        form={form}
        name="new-course"
        onFinish={onFinish}
        hideRequiredMark={true}
        initialValues={initialValues}
        onValuesChange={onValuesChange}
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
          name="paylink"
          label="Link de pago"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="slug"
          label="Link"
          rules={[{ required: true }]}
        >
          <Input addonBefore="ameliejulieta.com/"/>
        </Form.Item>
        <Form.Item style={{textAlign: 'right'}}>
          <Button type="primary" size="large" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Card>  
  )
}
export default CourseForm