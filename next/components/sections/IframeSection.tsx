import { useContext } from 'react'
import { useWindowSize } from 'usehooks-ts'

import RichText from '@/components/atoms/RichText'
import { sectionContext } from '@/components/layouts/SectionsWrapper'
import Section from '@/components/molecules/Section'
import { IframeSectionFragment } from '@/graphql'

type IframeSectionProps = {
  section: IframeSectionFragment
  variant?: 'full' | 'short'
}

const IframeSection = ({ section, variant = 'full' }: IframeSectionProps) => {
  const { height } = useWindowSize()
  const { border } = useContext(sectionContext)

  return (
    <Section
      className={variant === 'short' ? 'bg-white' : undefined}
      title={variant === 'full' ? section.title : undefined}
    >
      {section.body?.length ? <RichText content={section.body} /> : null}
      <div className="relative not-first:mt-6 not-first:md:mt-8">
        <iframe
          src={section.url}
          title={section.iframeTitle}
          width="100%"
          style={{ height: variant === 'short' ? '416px' : height * 0.85 }}
          className={border ? 'border border-border' : undefined}
        />
      </div>
    </Section>
  )
}

export default IframeSection
