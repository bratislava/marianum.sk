import { ComponentSectionsRichtext } from '../../graphql'
import RichText from '../atoms/RichText/RichText'
import Section, { SectionProps } from '../molecules/Section'

type RichTextSectionProps = Pick<SectionProps, 'background'> & {
  content: ComponentSectionsRichtext['content']
}

/*
  TODO: Richtext contains button option, how to implement it?
 */
const RichTextSection = ({ content, ...rest }: RichTextSectionProps) => {
  return (
    <Section {...rest}>
      <RichText content={content} />
    </Section>
  )
}

export default RichTextSection
