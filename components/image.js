import { useState } from 'react'
import styles from './image.module.css'

const Image = ({image}) => {

  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <img
        onLoad={() => setLoaded(true)}
        src={image.url}
        className={styles.image}
      />
      {!loaded && (
        <img
          src={image.placeholder}
          className={`${styles.image} ${styles.placeholder}`}
        />
      )}
    </>
  )
}
export default Image