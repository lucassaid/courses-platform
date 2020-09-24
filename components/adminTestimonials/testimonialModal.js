import { useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import UploadWithCrop from '../uploadWithCrop'
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input

const TestimonialModal = ({visible, onSave, onCancel, values, confirmLoading}) => {

  const [form] = Form.useForm();

  const normFile = e => {
    if(Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  useEffect(() => {
    if(visible && values) {
      form.resetFields()
      form.setFieldsValue(values)
    }
  }, [values, visible])

  return (
    <Modal
      visible={visible}
      title="Agregar testimonial"
      okText="Guardar"
      cancelText="Cancelar"
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={() => {
        form
          .validateFields()
          .then(async (formValues) => {
            await onSave({ ...values || {}, ...formValues });
            form.resetFields();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="testimonialsForm"
        preserve={false}
      >
        <Form.Item
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <UploadWithCrop listType="picture" shape="round" limit={1} aspect={1/1} path="coverImages/">
            <Button icon={<UploadOutlined/> }>
              Imagen
            </Button>
          </UploadWithCrop>
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Debes escribir el nombre' }]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          name="text"
          rules={[{ required: true, message: 'Debes escribir un texto' }]}
        >
          <TextArea placeholder="Texto" autoSize={{ minRows: 2, maxRows: 6 }}/>
        </Form.Item>
      </Form>

    </Modal>
  )
}
export default TestimonialModal