import cx from 'classnames'
import { RenderFn } from 'editorjs-blocks-react-renderer'
import { QuoteBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/quote'

const RichTextList: RenderFn<QuoteBlockData> = ({ data }) => {
  return (
    <blockquote
      className={cx('mb-4 border-l-4 border-primary bg-white p-6 last:mb-0 md:mb-6 md:p-8', {
        'text-left': data.alignment === 'left' || !data.alignment,
        'text-center': data.alignment === 'center',
      })}
    >
      <p>{data.text}</p>
      {data.caption && <p className="mt-4 italic md:mt-6">{data.caption}</p>}
    </blockquote>
  )
}

export default RichTextList
