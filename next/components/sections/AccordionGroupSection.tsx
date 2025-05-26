import RichText from '@/components/atoms/RichText'
import AccordionGroup from '@/components/molecules/Accordion/AccordionGroup'
import AccordionItem from '@/components/molecules/Accordion/AccordionItem'
import Section, { SectionProps } from '@/components/molecules/Section'
import { AccordionGroupFragment } from '@/graphql'

type AccordionGroupSectionProps = Pick<SectionProps, 'background'> & {
  section: AccordionGroupFragment
}

const AccordionGroupSection = ({ section, ...rest }: AccordionGroupSectionProps) => {
  const { title, accordions } = section

  return (
    <Section title={title} titleFontSize="h3" {...rest}>
      <AccordionGroup>
        {accordions?.map((accordion) => (
          <AccordionItem key={accordion?.id} title={accordion?.title}>
            <RichText content={accordion?.content} coloredTable={false} />
          </AccordionItem>
        ))}
      </AccordionGroup>
    </Section>
  )
}

export default AccordionGroupSection
