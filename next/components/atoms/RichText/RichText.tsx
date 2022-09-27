import cx from 'classnames'
import Blocks, { DataProp } from 'editorjs-blocks-react-renderer'
import { useMemo } from 'react'

import RichTextImage from './RichTextImage'

type RichTextProps = {
  data: string | null | undefined
  coloredTable?: boolean
}

/*
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
              className: cx('m-table mb-4 last:mb-0 md:mb-6', {
                colored: coloredTable,
              }),
            },
            embed: {
              className: 'text-',
            },
          }}
          renderers={{ image: RichTextImage }}
        />
      </div>
    )
  )
}

export default RichText
