import { Form, Input, Button, Popconfirm } from 'antd';
import UploadWithCrop from '../uploadWithCrop'
import { DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './testimonials.module.css'

const Testimonials = ({testimonials = {}, onSave}) => {

  const normFile = e => {
    if(Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onFinish = values => {
    onSave({...values.testimonials})
  }

  const [form] = Form.useForm()

  const initialValues = { testimonials: Object.values(testimonials)}
  form.setFieldsValue(initialValues)

  return (
    <Form
      form={form}
      name="testimonialsForm"
      onFinish={onFinish}
    >
      <Form.List name="testimonials">
        {(fields, { add, remove }) => {
          console.log(fields)
          return (
            <>
            <div className={styles.list}>
              {fields.map(field => (
                <div key={field.key} className={styles.testimonial} align="start">
                  <Form.Item
                    {...field}
                    style={{display: 'inline-block', marginBottom: 10}}
                    name={[field.name, 'image']}
                    fieldKey={[field.fieldKey, 'image']}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <UploadWithCrop avatar shape="round" limit={1} aspect={1/1} path="coverImages/">
                      <Button icon={<UploadOutlined/> }>
                        Imagen
                      </Button>
                    </UploadWithCrop>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    style={{display: 'inline-block', margin:'0 10px'}}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[{ required: true, message: 'Debes escribir el nombre' }]}
                  >
                    <Input placeholder="Nombre" />
                  </Form.Item>
                  <Popconfirm
                    placement="left"
                    title="Eliminar testimonial?"
                    okText="Si"
                    onConfirm={() => remove(field.name)}
                  >
                    <Button 
                      icon={<DeleteOutlined/>}
                    />
                  </Popconfirm>
                  <Form.Item
                    {...field}
                    style={{marginBottom: 0}}
                    name={[field.name, 'text']}
                    fieldKey={[field.fieldKey, 'text']}
                    rules={[{ required: true, message: 'Debes escribir un texto' }]}
                  >
                    <Input placeholder="Texto" />
                  </Form.Item>
                </div>
              ))}
            </div>
            <Button
              type="dashed"
              onClick={() => {
                add();
              }}
              block
            >
              <PlusOutlined /> Agregar testimonial
            </Button>
            </>
          );

        }}
      </Form.List>

      <Form.Item style={{marginBottom: 0, marginTop: 20, textAlign: 'right'}}>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Testimonials