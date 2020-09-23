import dynamic from 'next/dynamic'

const Document = dynamic(
  import('../pdf').then(m => m.Document),
  { ssr: false }
)

const Page = dynamic(
  import('../pdf').then(m => m.Page),
  { ssr: false }
)


const LessonPreview = ({type, uri}) => {


  return (
    <div style={{marginTop: 5}}>

      {type == 'video' ? (
        <>
          <iframe
            src={`https://player.vimeo.com/video/${uri.split('/')[2]}`}
            width="100%"
            height="300"
            frameBorder="0"
          ></iframe>
        </>
      ) : (
        <div style={{width: '100%', height: 300, overflow:'auto'}}>
          <Document file={uri}>
            <Page scale={0.7} pageNumber={1}/>
          </Document>
        </div>
      )}

    </div>
  )
}
export default LessonPreview