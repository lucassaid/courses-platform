import { useState } from 'react'
import TestimonialsList from './testimonialsList'
import TestimonialModal from './testimonialModal'
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios'
import { mutate } from 'swr'

const api = '/api/customization/testimonials'

const addOrUpdate = async (testimonial, type) => {
  return await mutate(api, async currentTestimonials => {
    let addOrUpdateData
    if(type == 'add') {
      addOrUpdateData = await axios.post(api, {testimonial})
    } else {
      addOrUpdateData = await axios.put(api, {testimonial})
    }
    const { data: newTestimonial } = addOrUpdateData 
    return {
      ...currentTestimonials,
      [newTestimonial.id]: newTestimonial
    }
  })
}

const AdminTestimonials = ({testimonials}) => {

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [visible, setModalVisible] = useState(false);
  const [editVisible, setEditModalVisible] = useState(false);
  const [editingValues, setEditingValues] = useState({}) 

  const onEdit = id => {
    setEditingValues(testimonials[id])
    setEditModalVisible(true)
  }

  const onUpdate = async testimonial => {
    console.log(testimonial)
    setConfirmLoading(true)
    await addOrUpdate(testimonial, 'update')
    setConfirmLoading(false)
    setEditModalVisible(false)
  }

  const onSave = async testimonial => {
    setConfirmLoading(true)
    await addOrUpdate(testimonial, 'add')
    setConfirmLoading(false)
    setModalVisible(false)
  }

  const onDelete = async id => {
    const newTestimonials = {...testimonials}
    delete newTestimonials[id]
    mutate(api, newTestimonials, false)
    await axios.delete(`${api}?id=${id}`)
    mutate(api, newTestimonials)
  }

  return (
    <>
      <TestimonialsList
        testimonials={testimonials}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Button
        onClick={() => {
          setModalVisible(true);
        }}
        type="dashed"
        block
        icon={<PlusOutlined />}
      >
        Agregar testimonial
      </Button>
      <TestimonialModal
        visible={visible}
        onSave={onSave}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
      <TestimonialModal
        visible={editVisible}
        onSave={onUpdate}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setEditModalVisible(false);
        }}
        values={editingValues}
      />
    </>
  )
}
export default AdminTestimonials