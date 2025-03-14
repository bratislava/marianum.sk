import Button from '@/components/atoms/Button'
import RichText from '@/components/atoms/RichText'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'
import Section from '@/components/molecules/Section'
import { RichtextSectionFragment } from '@/graphql'

type RichTextSectionProps = {
  section: RichtextSectionFragment
}

const RichTextSection = ({ section }: RichTextSectionProps) => {
  const { getLinkProps } = useGetLinkProps()
  const linkProps = getLinkProps(section.button)

  return (
    <Section>
      <RichText className="lg:text-lg" content={section.content} />
      {section.button ? <Button
          href={linkProps.href ?? ''}
          className="mt-5 w-full md:mt-4 md:w-auto"
        >
          {linkProps.label}
        </Button> : null}
    </Section>
  )
}

export default RichTextSection
