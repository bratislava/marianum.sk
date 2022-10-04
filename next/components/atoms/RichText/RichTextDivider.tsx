import { RenderFnWithoutData } from 'editorjs-blocks-react-renderer'

import Divider from '../Divider'

const RichTextDivider: RenderFnWithoutData = ({ className = '' }) => {
  const props: {
    [s: string]: string
  } = {}

  if (className) {
    props.className = className
  }

  return <Divider {...props} />
}

export default RichTextDivider
