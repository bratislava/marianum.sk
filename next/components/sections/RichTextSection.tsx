import Button from '@components/atoms/Button'
import RichText from '@components/atoms/RichText/RichText'
import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section from '@components/molecules/Section'
import { RichtextSectionFragment } from '@graphql'

type RichTextSectionProps = {
  section: RichtextSectionFragment
}

const RichTextSection = ({ section }: RichTextSectionProps) => {
  const { getFullPath } = useGetFullPath()

  return (
    <Section>
      <RichText className="lg:text-lg" content={section.content} />
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
