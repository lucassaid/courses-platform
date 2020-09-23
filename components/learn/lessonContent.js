import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { DownloadOutlined } from '@ant-design/icons'
import styles from './lessonContent.module.css'
import { Button } from 'antd'

const Document = dynamic(
  import('../pdf').then(m => m.Document),
  { ssr: false }
)

const Page = dynamic(
  import('../pdf').then(m => m.Page),
  { ssr: false }
)

const LessonContent = ({lesson}) => {

  const [pdfWidth, setPdfWidth] = useState(300)
  const [pagesArr, setPagesArr] = useState([]);

  const pdfRef = useRef({})

  useEffect(() => {
    if(pdfRef.current) {
      setPdfWidth(pdfRef.current.clientWidth)
    }
  }, [pdfRef.current])

 
  function onDocumentLoadSuccess({ numPages }) {
    setPagesArr([...Array(numPages).keys()])
  }
  
  return(
    <>
      {lesson.type === 'video' ? (
          <iframe
            src={`https://player.vimeo.com/video/${lesson.uri.split('/')[2]}`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className={styles.iframe}
          ></iframe>
        ) : (
          <>
            <div className={styles.pdfTop}>
              <a href={lesson.uri} download={lesson.title} target="_blank">
                <Button
                  type="primary"
                  size="large"
                  icon={<DownloadOutlined />}
                >
                  Descargar práctica
                </Button>
              </a>
            </div>
            <div ref={pdfRef} className={styles.pdf}>
              <Document
                file={lesson.uri}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {pagesArr.map(page => (
                  <Page
                    key={page}
                    width={pdfWidth}
                    pageNumber={page + 1}
                  />
                ))}
              </Document>
            </div>
          </>
        )}
    </>
  )
}
export default LessonContent