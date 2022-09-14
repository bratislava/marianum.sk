import { CtaButtonFragment, ProcedureFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import MLink from '../atoms/MLink'
import Tab from '../atoms/Tabs/Tab'
import Tabs from '../atoms/Tabs/Tabs'
import Row from '../molecules/Row/Row'
import Section, { SectionProps } from '../molecules/Section'

type HomepagePoceduresProps = Pick<SectionProps, 'title' | 'background' | 'index'> & {
  procedures: ProcedureFragment[]
  showMoreButton: CtaButtonFragment | null | undefined
}

const HomepageProcedures = ({
  title,
  procedures,
  showMoreButton,
  ...rest
}: HomepagePoceduresProps) => {
  const showMoreSlug = showMoreButton?.page?.data?.attributes?.slug

  return (
    <Section {...rest}>
      <div className="text-center lg:mx-32">
        <h2 className="pb-5 md:pb-10">{title}</h2>
        <Tabs areBig>
          {procedures.map((procedure) => (
            // TODO mobile layout
            <Tab key={procedure?.title} label={procedure?.title ?? ''}>
              <div className="mt-9 flex flex-col gap-4">
                {procedure?.steps
                  ?.filter(isDefined)
                  .slice(0, 3)
                  .map((step, i) => (
                    <Row
                      key={step.title}
                      title={step.title}
                      moreContent={step.description}
                      number={i + 1}
                      border={false}
                    />
                  ))}
              </div>
            </Tab>
          ))}
        </Tabs>
        {showMoreSlug && (
          <div className="mt-8">
            <MLink href={showMoreSlug}>{showMoreButton.label}</MLink>
          </div>
        )}
      </div>
    </Section>
  )
}

export default HomepageProcedures
