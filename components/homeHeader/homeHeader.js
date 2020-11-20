import { Carousel,  } from 'antd'
import useSWR from 'swr'
import styles from './homeHeader.module.css'
import Slide from './slide'

const fetcher = url => fetch(url).then(r => r.json())

const HomeHeader = ({}) => {

  const initialSlides = {placeholder: {id: 'initial'}}
  const {data: slides = initialSlides, error} = useSWR('/api/customization/homeSlides', fetcher)
  const slidesArr = Object.values(slides).sort((a, b) => a.order - b.order)

  return(
    <div style={{marginBottom: 30}}>
      <Carousel autoplay>
        {slidesArr.map(slide => (
          <div key={slide.id}>
            <div className={styles.content}>
              <Slide slide={slide}/>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
export default HomeHeader