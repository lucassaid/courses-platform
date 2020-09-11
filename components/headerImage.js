import { useState, useEffect, useRef } from 'react'
import { Container } from './section'
import styles from './headerImage.module.css'

const HeaderImage = ({src, alt}) => {

  const [imageStyle, setImageStyle] = useState({})
  const [imageLoaded, setImageLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    console.log(imageLoaded, ref.current)
    if((!imageLoaded || !src) && ref.current) {
      const height = ref.current.offsetWidth / (16/9)
      setImageStyle({height})
    }
  }, [ref.current, imageLoaded, src])

  const imageLoad = e => {
    setImageLoaded(true)
    setImageStyle({})
  }

  return(
    <div
      style={imageStyle}
      className={styles.container}
    >
      <Container>
        <img
          ref={ref}
          onLoad={imageLoad}
          className={styles.img}
          src={src}
          alt={alt}
        />
      </Container>
      <div 
        style={{backgroundImage: `url(${src})`}}
        className={styles.background}></div>
    </div>
  )
}
export default HeaderImage