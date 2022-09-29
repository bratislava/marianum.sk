import cx from 'classnames'
import Blocks, { DataProp } from 'editorjs-blocks-react-renderer'
import { useMemo } from 'react'

import RichTextDivider from './RichTextDivider'
import RichTextImage from './RichTextImage'
import RichTextList from './RichTextList'
// import RichTextParagraph from './RichTextParagraph'
import RichTextQuote from './RichTextQuote'

type RichTextProps = {
  data: string | null | undefined
  coloredTable?: boolean
}

/*
 TODO: Use custom RichTextParagraph parser
 TODO: It uses `html-react-parser`, explore XSS risks.
 */
const RichText = ({ data, coloredTable = true }: RichTextProps) => {
  const parsedData = useMemo(() => {
    if (!data) {
      return null
    }

    try {
      return JSON.parse(data) as DataProp
    } catch (error) {
      return null
    }
  }, [data])

  return (
    parsedData && (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div className="editorjs-wrapper">
        <Blocks
          data={parsedData}
          config={{
            delimiter: {
              className: 'mb-4 md:mb-6 last:mb-0',
            },
            header: {
              className: 'mb-3 md:mb-4 last:mb-0',
            },
            image: {
              className: 'mb-4 md:mb-6 last:mb-0',
            },
            list: {
              className: 'list-disc mb-4 md:mb-6 last:mb-0',
            },
            paragraph: {
              className: 'm-link-inline mb-4 md:mb-6 last:mb-0',
            },
            table: {
              className: cx('m-table mb-4 last:mb-0 md:mb-6', {
                colored: coloredTable,
              }),
            },
          }}
          renderers={{
            image: RichTextImage,
            list: RichTextList,
            quote: RichTextQuote,
            // paragraph: RichTextParagraph,
          }}
        />
      </div>
    )
  )
}

export default RichText
