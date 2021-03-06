import { Form, Input, Button, InputNumber, Card} from 'antd';
import UploadWithCrop from './uploadWithCrop'
import { UploadOutlined } from '@ant-design/icons';
import slug from 'limax'
import axios from 'axios'

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

  const validateSlug = (_, value) => {
    return new Promise(async (res, rej) => {
      if(value != slug(value)) rej('Formato no válido')
      const { data: courseWithSameSlug } = await axios.get(`/api/courses/${value}`)
      const editingCourseId = initialValues && initialValues.id
      if(!courseWithSameSlug.id || courseWithSameSlug.id == editingCourseId) {
        res('ok')
      } else {
        rej('Este link ya es usado por otro curso!')
      }
    })
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
          <UploadWithCrop limit={1} aspect={16/9} path="coverImages/" listType="picture">
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
          name="old_price"
          label="Precio anterior"
          extra="Establecer un precio más alto que el precio normal para mostrar el curso como 'de oferta'."
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
          rules={[
            { 
              required: true,
              validator: validateSlug
            }
          ]}
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