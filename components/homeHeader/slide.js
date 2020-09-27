import { useState, useEffect } from 'react'
import styles from './slide.module.css'
import Image from '../image'
import { Typography } from 'antd'

const { Title, Text } = Typography

const SlideImage = ({image, verticalAlign, horizontalAlign}) => {

  if(!image) return <></> 
  return (
    <div 
      className={styles.imageContainer}
      style={{
        alignItems: verticalAlign,
        justifyContent: horizontalAlign
      }}
    >
      <Image image={image}/>
    </div>
  )
}

const SlideText = ({color, align, title, desc}) => {

  if(align == 'flex-start') align = 'left' 
  if(align == 'flex-end') align = 'right' 

  return (
    <div
      className={`${styles.content} ${styles.contentText}`}
      style={{textAlign: align}}
    >
      <Title
        level={2}
        style={{ color, margin: 0 }}
      >
        {title}
      </Title>
      <Text style={{color}}>
        {desc}
      </Text>
    </div>
  )
}

const HomeHeaderSlide = ({slide, mode: initialMode, style}) => {
  if(!slide) return <>vacio</>

  const [mode, setMode] = useState(initialMode)

  useEffect(() => {
    function updateSize() {
      const computedMode = document.body.clientWidth < 767 ? 'mobile' : 'desktop'
      setMode(initialMode || computedMode)
    }
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [initialMode]);

  const {
    backgroundColor,
    overlay,
    desktopImage = [],
    mobileImage = [],
    desktopImageAlign,
    desktopImageJustify,
    contentType,
    contentImage = [],
    contentImageScale,
    justifyContent,
    alignItems,
    title,
    desc,
    textColor,
  } = slide

  const overlayOpacity = overlay / 100

  const slideClass = mode == 'desktop' ? 'desktopSlide' : 'mobileSlide'

  const mainImage = _getMainImage(mobileImage[0], desktopImage[0], mode)

  return(
    <div
      className={`${styles.slide} ${styles[slideClass]}`}
      style={{
        ...style,
        justifyContent,
        alignItems,
        backgroundColor
      }}
    >
      {contentType == 'text' ? (
        <SlideText
          title={title}
          desc={desc}
          color={textColor}
          align={justifyContent}
        />
      ) : (
        <img
          className={`${styles.content} ${styles.contentImage}`}
          style={{width: `${contentImageScale}%`}}
          src={contentImage[0] && contentImage[0].url}
        />
      )}
      <SlideImage
        image={mainImage}
        verticalAlign={desktopImageAlign}
        horizontalAlign={desktopImageJustify}
      />
      <div
        className={styles.overlay}
        style={{
          backgroundColor: `rgba(0,0,0,${overlayOpacity})`
        }}
      />
    </div>
  )
}
export default HomeHeaderSlide

const _getMainImage = (mobileImage, desktopImage, mode) => {
  if(!mode) return null
  if(!mobileImage && !desktopImage) return null

  if(mobileImage && !desktopImage) return mobileImage
  if(desktopImage && !mobileImage) return desktopImage

  return mode == 'mobile' ? mobileImage : desktopImage
}