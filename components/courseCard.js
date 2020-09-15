import { Card, Skeleton, Typography} from 'antd'
import styles from './courseCard.module.css'
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
      className={styles.card}
      loading={loading}
      cover={cover}
      actions={actions}
      bodyStyle={{paddingBottom: course.old_price ? 100 : 70}}
    >
      <Meta
        title={course.name}
        description={course.desc}
      />
      
      <div className={styles.bottom}>
        <div>
          {course.old_price && (
            <div>
              <Text className={styles.oldPrice} type="secondary">${course.old_price}</Text>
            </div>
          )}
          <Text className={styles.price} type="secondary">${course.price}</Text>
        </div>
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