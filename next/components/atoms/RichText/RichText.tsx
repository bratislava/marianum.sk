import cx from 'classnames'
import Blocks, { DataProp } from 'editorjs-blocks-react-renderer'
import { useMemo } from 'react'

import RichTextImage from './RichTextImage'

type RichTextProps = {
  data?: string | null
  coloredTable?: boolean
}

/*
 TODO: Links don't have any style.
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
      <Blocks
        data={parsedData}
        config={{
          delimiter: {
            className: 'border border-border w-full mb-4 md:mb-6 last:mb-0',
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
            className: 'mb-4 md:mb-6 last:mb-0',
          },
          table: {
            className: cx('m-table large-padding mb-4 last:mb-0 md:mb-6', {
              colored: coloredTable,
            }),
          },
        }}
        renderers={{ image: RichTextImage }}
      />
    )
  )
}

export default RichText
