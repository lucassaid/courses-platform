import { Carousel } from 'antd'
import useSWR from 'swr'
import styles from './homeHeader.module.css'

const fetcher = url => fetch(url).then(r => r.json())

const HomeHeader = ({}) => {

  const {data: slides, error} = useSWR('/api/customization/homeSlides', fetcher)
  const slidesArr = slides && Object.values(slides).sort((a, b) => a.order - b.order)

  return(
    <div style={{marginBottom: 30}}>
      <Carousel autoplay>
        {slides ? slidesArr.map(slide => (
          <div key={slide.uid}>
            <div
              style={{backgroundImage: `url(${slide.url})`}}
              className={styles.content}
            />
          </div>
        )):(
          <div>
            <div className={styles.content}></div>
          </div>
        )}
      </Carousel>
    </div>
  )
}
export default HomeHeader