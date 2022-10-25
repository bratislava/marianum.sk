import cx from 'classnames'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import Spinner from './Spinner'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

type PDFViewerProps = {
  url: string
  className?: string
}

const PDFViewer = ({ url, className }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState(0)

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: { numPages: number }) => {
    setNumPages(nextNumPages)
  }

  return (
    <div className="w-full">
      <Document
        className={cx('flex flex-col items-center justify-center gap-10', className)}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={() => <Spinner className="h-8 w-8" />}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            className="full-width-canvas-page"
            width={600}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            loading={() => <div />}
          />
        ))}
      </Document>
    </div>
  )
}

export default PDFViewer
