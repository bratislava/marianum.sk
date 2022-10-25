import Modal, { ModalProps } from './Modal'
import PDFViewer from './PDFViewer'

type PDFModalViewerProps = {
  url: string
} & ModalProps

const PDFModalViewer = ({ url, ...rest }: PDFModalViewerProps) => {
  return (
    <Modal {...rest}>
      <PDFViewer className="py-16 px-8" url={url} />
    </Modal>
  )
}

export default PDFModalViewer
