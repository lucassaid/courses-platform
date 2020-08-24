import { Container } from './section'
import styles from './headerImage.module.css'

const HeaderImage = ({src, alt}) => {

  return(
    <div className={styles.container}>
      <Container>
        <img className={styles.img} src={src} alt={alt}/>
      </Container>
      <div 
        style={{backgroundImage: `url(${src})`}}
        className={styles.background}></div>
    </div>
  )
}
export default HeaderImage