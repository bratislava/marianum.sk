// Inspired by original renderer here: https://github.com/moveyourdigital/editorjs-blocks-react-renderer/blob/master/src/renderers/paragraph/index.tsx

import { RenderFn } from 'editorjs-blocks-react-renderer'
import { ParagraphBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/paragraph'
import parse from 'html-react-parser'

// import MLink from '../MLink'

const RichTextParagraph: RenderFn<ParagraphBlockData> = ({ data, className = '' }) => {
  const props: {
    [s: string]: string
  } = {}

  if (className) {
    props.className = className
  }

  return (
    <p {...props}>
      {data?.text &&
        parse(data.text, {
          replace: (domNode) => {
            console.log(domNode)
            // if (domNode.name === 'a' && domNode.attributes) {
            //   return <MLink href={domNode.attributes.href ?? ''}>{domNode.attributes}</MLink>
            // }
          },
        })}
    </p>
  )
}

export default RichTextParagraph
