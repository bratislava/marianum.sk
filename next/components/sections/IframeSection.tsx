import IframeResizer from '@iframe-resizer/react'
import { useContext } from 'react'

import RichText from '@/components/atoms/RichText'
import { sectionContext } from '@/components/layouts/SectionsWrapper'
import Section from '@/components/molecules/Section'
import { IframeSectionFragment } from '@/graphql'

type IframeSectionProps = {
  section: IframeSectionFragment
  variant?: 'full' | 'short'
}

const IframeSection = ({ section, variant = 'full' }: IframeSectionProps) => {
  const { border } = useContext(sectionContext)

  return (
    <Section
      className={variant === 'short' ? 'bg-white' : undefined}
      title={variant === 'full' ? section.title : undefined}
    >
      {section.body?.length ? <RichText content={section.body} /> : null}
      <div className="relative not-first:mt-6 not-first:md:mt-8">
        {section.url.includes('spominam.sk') ? (
          <IframeResizer
            license="GPLv3"
            src={section.url}
            title={section.iframeTitle}
            width="100%"
            // ignoring variant for "spominam.sk" iframes
            style={{ height: '100dvh' }}
            className={border ? 'border border-border' : undefined}
          />
        ) : (
          <iframe
            src={section.url}
            title={section.iframeTitle}
            width="100%"
            // dvh - viewport height dynamically adjusts based on the visibility of URL bar
            style={{ height: variant === 'short' ? '416px' : '85dvh' }}
            className={border ? 'border border-border' : undefined}
          />
        )}
      </div>
    </Section>
  )
}

export default IframeSection
