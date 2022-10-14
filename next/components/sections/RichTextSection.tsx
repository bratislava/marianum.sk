import { RichtextSectionFragment } from '../../graphql'
import Button from '../atoms/Button'
import RichText from '../atoms/RichText/RichText'
import { useSlug } from '../molecules/Navigation/NavigationProvider/useFullSlug'
import Section from '../molecules/Section'

type RichTextSectionProps = {
  section: RichtextSectionFragment
}

const RichTextSection = ({ section }: RichTextSectionProps) => {
  const { getFullSlug } = useSlug()

  return (
    <Section>
      <RichText content={section.content} />
      {section.button ? (
        <Button
          href={getFullSlug(section.button.page?.data) ?? ''}
          className="mt-5 w-full md:mt-4 md:w-auto"
        >
          {section.button.label}
        </Button>
      ) : null}
    </Section>
  )
}

export default RichTextSection
