import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
            <Page pageNumber={1}/>
          </Document>
        </div>
      )}

    </div>
  )
}
export default LessonPreview