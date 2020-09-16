import { useState } from 'react'
import { Carousel, Image } from 'antd'
import useSWR from 'swr'
import styles from './homeHeader.module.css'

const fetcher = url => fetch(url).then(r => r.json())

const HomeHeader = ({}) => {

  const initialSlides = {placeholder: {}}
  const [imageLoaded, setImageLoaded] = useState(false)
  const {data: slides = initialSlides, error} = useSWR('/api/customization/homeSlides', fetcher)
  const slidesArr = Object.values(slides).sort((a, b) => a.order - b.order)

  const onLoad = () => {
    setImageLoaded(true)
  }

  return(
    <div style={{marginBottom: 30}}>
      <Carousel autoplay>
        {slides ? slidesArr.map(slide => (
          <div key={slide.uid}>
            <div className={styles.content}>
              <img
                onLoad={onLoad}
                src={slide.url}
                className={styles.image}
              />
              {!imageLoaded && (
                <img
                  src={slide.placeholder}
                  className={`${styles.image} ${styles.placeholder}`}
                />
              )}
              {/* <Image
                src={slide.url}
                className={styles.image}
                preview={false}
                placeholder={
                  <img
                    className={`${styles.image} ${styles.placeholder}`}
                    src={slide.placeholder}
                  />
                }
              /> */}
            </div>
          </div>
        )):(
          <div>
            <div className={styles.image}></div>
          </div>
        )}
      </Carousel>
    </div>
  )
}
export default HomeHeader