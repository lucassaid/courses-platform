import { SmileOutlined } from '@ant-design/icons'
import { List, Avatar, Skeleton, Popconfirm, Typography } from 'antd';

const { Paragraph } = Typography

const TestimonialList = ({testimonials, onDelete, onEdit}) => {

  const testimonialsArr = testimonials && Object.values(testimonials)

  const getActions = (id) => [
    <a key="edit" onClick={() => onEdit(id)}>editar</a>,
    <Popconfirm
      title="¿Eliminar testimonial?"
      okText="Si, eliminar"
      cancelText="No"
      placement="left"
      onConfirm={() => onDelete(id)}
    >
      <a key="list-loadmore-more">eliminar</a>
    </Popconfirm>
  ]
  
  const Description = ({text}) => {
    return (
      <Paragraph
        type="secondary"
        ellipsis={{
          rows: 2,
          expandable: true,
        }}
        
      >
        {text}
      </Paragraph>
    )
  }

  return (
    <List
      loading={!testimonialsArr}
      itemLayout="horizontal"
      dataSource={testimonialsArr}
      renderItem={({image = [], name, text, id, ...item}) => (
        <List.Item
          actions={getActions(id)}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={image[0] && image[0].url}
                  icon={<SmileOutlined />}
                  size="large"
                />
              }
              title={name}
              description={<Description text={text}/>}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}
export default TestimonialList