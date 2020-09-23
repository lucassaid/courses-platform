import { Document, Page, pdfjs } from 'react-pdf';
import { Spin } from 'antd'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const loading = (
  <>
    <div className="loading">
      <Spin/>
      <div className="text">Cargando práctica</div>
    </div>
    <style jsx>{`
      .loading {
        width: 100%;
        height: 200px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
      }

      .text {
        width: 100%;
        text-align: center;
        margin-top: 15px;
      }
    `}</style>
  </>
)

const CustomDocument = ({...props}) => { 
  return <Document {...props} loading={loading}/>
}

const CustomPage = ({...props}) => {
  return <Page {...props} loading={loading}/>
}

export { 
  CustomDocument as Document,
  CustomPage as Page
}