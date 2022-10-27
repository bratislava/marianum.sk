import { RichtextSectionFragment } from '../../graphql'
import Button from '../atoms/Button'
import RichText from '../atoms/RichText/RichText'
import { useGetFullPath } from '../molecules/Navigation/NavigationProvider/useGetFullPath'
import Section from '../molecules/Section'

type RichTextSectionProps = {
  section: RichtextSectionFragment
}

const RichTextSection = ({ section }: RichTextSectionProps) => {
  const { getFullPath } = useGetFullPath()

  return (
    <Section>
      <RichText content={section.content} />
      {section.button ? (
        <Button
          href={getFullPath(section.button.page?.data) ?? ''}
          className="mt-5 w-full md:mt-4 md:w-auto"
        >
          {section.button.label}
        </Button>
      ) : null}
    </Section>
  )
}

export default RichTextSection
