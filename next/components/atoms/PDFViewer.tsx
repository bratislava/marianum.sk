import cx from 'classnames'
import { useMemo, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'

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

  const { ref: containerRef, width: containerWidth } = useResizeDetector()

  const width = useMemo(() => {
    return Math.min(containerWidth ?? 0, 600)
  }, [containerWidth])

  return (
    <div ref={containerRef} className="h-full w-full overflow-y-auto overflow-x-hidden">
      <Document
        className={cx(
          'flex min-h-full w-full flex-col items-center justify-center gap-10',
          className,
        )}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={() => (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        )}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            width={width}
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
