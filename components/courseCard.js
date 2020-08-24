import { Card, Skeleton, Typography} from 'antd'
import styles from './courseCard.module.css'
const { Meta } = Card
const { Text } = Typography

const CourseCard = ({children, actions, title, extra, course, showMp}) => {

  const cover = (
    <div style={{minHeight: '100px', background: '#EEE'}}>
      <img
        alt={course.name}
        src={course.cover && course.cover[0].url}
      />
    </div>
  )

  return (
    <Card
      hoverable
      title={title}
      extra={extra}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      loading={!course.name}
      cover={cover}
      actions={actions}
      bodyStyle={{paddingBottom: 70}}
    >
      <Meta
        title={course.name}
        description={course.desc}
      />
      
      <div className={styles.bottom}>
        <Text className={styles.price} type="secondary">${course.price}</Text>
        {showMp && (
          <img
            style={{width: 30}}
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