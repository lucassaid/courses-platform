import { Card, Skeleton, Typography} from 'antd'
const { Meta } = Card
const { Text } = Typography

const CourseCard = ({children, actions, title, extra, course = {}, showMp, loading, noHoverable}) => {

  const cover = (
    <div style={{minHeight: '150px', background: '#EEE'}}>
      <img
        alt={course.name}
        src={course.cover && course.cover[0].url}
      />
    </div>
  )

  return (
    <Card
      hoverable={!noHoverable}
      title={title}
      extra={extra}
      className="h-full"
      loading={loading}
      cover={cover}
      actions={actions}
      bodyStyle={{paddingBottom: course.old_price ? 100 : 70}}
    >
      <Meta
        title={course.name}
        description={course.desc}
      />
      
      <div
        className="absolute bottom-0 flex justify-between items-end mb-3"
        style={{width: 'calc(100% - 50px)'}}
      >
        <div>
          {course.old_price && (
            <div>
              <Text
                className="line-through font-light text-sm opacity-70"
                type="secondary"
              >
                ${course.old_price}
              </Text>
            </div>
          )}
          <Text
            className="text-2xl font-light"
            type="secondary"
          >
            ${course.price}
          </Text>
        </div>
        {showMp && (
          <img
            className="w-8 mb-1"
            src="/images/mp-logo-sm.png"
            alt="Juli Amelie Mercado Pago"
          />
        )}
      </div>
      
      {children}
    </Card>
  )
}
export default CourseCard