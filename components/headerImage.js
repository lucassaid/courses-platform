import { useState, useEffect, useRef } from 'react'
import { Container } from './section'
import { Image } from 'antd'
import styles from './headerImage.module.css'

const HeaderImage = ({image, alt}) => {
  const src = image && image.url
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
  }

  return(
    <div
      style={imageStyle}
      className={styles.container}
    >
      <Container>
        <div ref={ref}>
          <Image
            onLoad={imageLoad}
            className={styles.img}
            src={src}
            alt={alt}
            preview={false}
            placeholder={
              image && <img src={image.placeholder}/>
            }
          />
        </div>
      </Container>
      <div 
        style={{backgroundImage: `url(${src})`}}
        className={styles.background}></div>
    </div>
  )
}
export default HeaderImage