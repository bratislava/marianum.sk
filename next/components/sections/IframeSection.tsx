import RichText from '@components/atoms/RichText'
import { sectionContext } from '@components/layouts/SectionsWrapper'
import Section from '@components/molecules/Section'
import { IframeSectionFragment } from '@graphql'
import { useContext } from 'react'
import { useWindowSize } from 'usehooks-ts'

const IframeSection = ({ section }: { section: IframeSectionFragment }) => {
  const { height } = useWindowSize()
  const { border } = useContext(sectionContext)

  return (
    <Section title={section.title}>
      {section.body?.length ? <RichText content={section.body} /> : null}
      <div className="relative not-first:mt-6 not-first:md:mt-8">
        <iframe
          src={section.url}
          title={section.iframeTitle}
          width="100%"
          style={{ height: height * 0.85 }}
          className={border ? 'border border-border' : undefined}
        />
      </div>
    </Section>
  )
}

export default IframeSection
