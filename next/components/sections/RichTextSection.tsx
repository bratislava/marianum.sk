import Blocks, { DataProp } from 'editorjs-blocks-react-renderer'
import { useMemo } from 'react'

import { ComponentSectionsRichtext } from '../../graphql'
import Section, { SectionProps } from '../molecules/Section'

type RichTextSectionProps = Pick<SectionProps, 'isContainer' | 'background' | 'index'> & {
  content: ComponentSectionsRichtext['content']
}

/*
  TODO: Richtext contains button option, how to implement it?
 */
const RichTextSection = ({ content, ...rest }: RichTextSectionProps) => {
  const parsedContent = useMemo(() => {
    if (!content) {
      return null
    }

    try {
      return JSON.parse(content) as DataProp
    } catch (error) {
      return null
    }
  }, [content])

  return (
    <Section {...rest}>
      {parsedContent && (
        <Blocks
          data={parsedContent}
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
      )}
    </Section>
  )
}

export default RichTextSection
