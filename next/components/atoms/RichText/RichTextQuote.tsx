// Inspired by original renderer here: https://github.com/moveyourdigital/editorjs-blocks-react-renderer/blob/master/src/renderers/quote/index.tsx

import cx from 'classnames'
import { RenderFn } from 'editorjs-blocks-react-renderer'
import { QuoteBlockData } from 'editorjs-blocks-react-renderer/dist/renderers/quote'
import HTMLReactParser from 'html-react-parser'

const RichTextList: RenderFn<QuoteBlockData> = ({ data }) => {
  return (
    <blockquote
      className={cx('mb-4 border-l-4 border-primary bg-white p-6 last:mb-0 md:mb-6 md:p-8', {
        'text-left': data.alignment === 'left' || !data.alignment,
        'text-center': data.alignment === 'center',
      })}
    >
      {data?.text &&
        data.text.split('\n\n').map((paragraph, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i}>
            {HTMLReactParser(
              // eslint-disable-next-line unicorn/no-array-reduce
              paragraph.split('\n').reduce((total, line) => [total, '<br />', line].join('')),
            )}
          </p>
        ))}
      {data.caption && (
        <footer className="mt-4 italic md:mt-6">{HTMLReactParser(data.caption)}</footer>
      )}
    </blockquote>
  )
}

export default RichTextList
