import Blocks, { DataProp } from 'editorjs-blocks-react-renderer'
import { useMemo } from 'react'

type RichTextProps = {
  data?: string | null
}

const RichText = ({ data }: RichTextProps) => {
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
          // TODO: Use next/image
          image: {
            className: 'mb-4 md:mb-6 last:mb-0',
            actionsClassNames: {
              // TODO
              // stretched: 'w-full h-80 object-cover',
              // withBorder: 'border border-2',
              // withBackground: 'p-2',
            },
          },
          list: {
            className: 'list-disc mb-4 md:mb-6 last:mb-0',
          },
          paragraph: {
            className: 'mb-4 md:mb-6 last:mb-0',
          },
          table: {
            className: 'm-table large-padding mb-4 md:mb-6 last:mb-0',
          },
        }}
      />
    )
  )
}

export default RichText
