import utilStyles from '../styles/utils.module.css'
import styles from './section.module.css'
import { Typography } from 'antd'
const { Title } = Typography

export const Container = ({children, className = ''}) => (
  <div className={`${styles.container} ${className}`}>
    {children}
  </div>
)

const Section = ({
  children,
  title,
  bg,
  bgMirror,
  bgHigh,
  style = {},
  className = '',
  ...props
}) => {

  let bgClassName = bg ? styles.sectionBg : '' 
  if(bgMirror) bgClassName += ` ${styles.sectionBgMirror}`
  if(bgHigh) bgClassName += ` ${styles.sectionBgHigh}`
  let fullClass = `${bgClassName} ${styles.section} ${utilStyles.mb20} ${className}`

  return (
    <section 
      style={style}
      className={fullClass}
    >
      <Container className={styles.content}>
        {title && <Title level={3}>{title}</Title>}
        {children}
      </Container>
    </section>
  )
}
export default Section