import Button from '@/components/atoms/Button'
import RichText from '@/components/atoms/RichText'
import Section from '@/components/molecules/Section'
import { RichtextSectionFragment } from '@/graphql'
import { useGetLinkProps } from '@/utils/useGetLinkProps'

type RichTextSectionProps = {
  section: RichtextSectionFragment
}

const RichTextSection = ({ section }: RichTextSectionProps) => {
  const { getLinkProps } = useGetLinkProps()
  const linkProps = getLinkProps(section.button)

  return (
    <Section>
      <RichText className="lg:text-size-p-large" content={section.content} />
      {section.button ? (
        <Button {...linkProps} className="mt-5 w-full md:mt-4 md:w-auto">
          {linkProps.label}
        </Button>
      ) : null}
    </Section>
  )
}

export default RichTextSection
