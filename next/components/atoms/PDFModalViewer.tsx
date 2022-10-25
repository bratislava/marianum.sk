import Modal, { ModalProps } from './Modal'
import PDFViewer from './PDFViewer'

type PDFModalViewerProps = {
  url: string
} & ModalProps

const PDFModalViewer = ({ url, ...rest }: PDFModalViewerProps) => {
  return (
    <Modal overlayClassName="max-w-[600px]" underlayClassName="py-16" {...rest}>
      <PDFViewer url={url} />
    </Modal>
  )
}

export default PDFModalViewer
