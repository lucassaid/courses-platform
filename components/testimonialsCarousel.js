import useSWR from 'swr'
import { Card, Avatar, Row, Col, Typography } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { Meta } = Card

const fetcher = url => fetch(url).then(r => r.json())

const TestimonialsCarousel = () => {

  const {data: testimonials, error} = useSWR('/api/customization/testimonials', fetcher)

  if(!testimonials) return '...'

  return (
    <>
      <Row
        gutter={[80, 60]}
      >
        {Object.values(testimonials).map(testimonial => {
          const { id, image = [], name, text } = testimonial
          return(
            <Col xs={24} md={12} key={id}>
              <Meta
                title={<Text>{name}</Text>}
                description={<Text type="secondary">{text}</Text>}
                avatar={
                  <Avatar
                    src={image[0] && image[0].url}
                    icon={<SmileOutlined />}
                    size={60}
                  />
                }
              />
            </Col>
          )
        })}
      </Row>
    </>
  )
}
export default TestimonialsCarousel