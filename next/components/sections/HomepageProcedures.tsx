import cx from 'classnames'
import { useMemo } from 'react'

import { CtaButtonFragment, ProcedureFragment } from '../../graphql'
import { useTailwindBreakpoint } from '../../hooks/useTailwindBreakpoint'
import { isDefined } from '../../utils/isDefined'
import MLink from '../atoms/MLink'
import Tab from '../atoms/Tabs/Tab'
import Tabs from '../atoms/Tabs/Tabs'
import Row from '../molecules/Row/Row'
import Section, { SectionProps } from '../molecules/Section'

type HomepagePoceduresProps = Pick<SectionProps, 'title' | 'background'> & {
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

  const breakpoint = useTailwindBreakpoint()

  const isMobile = useMemo(() => breakpoint === null, [breakpoint])

  const slicedProcedures = useMemo(() => {
    return procedures.map((procedure) => ({
      ...procedure,
      steps: procedure?.steps?.filter(isDefined).slice(0, 3) ?? [],
    }))
  }, [procedures])

  return (
    <Section {...rest}>
      <div className="text-center lg:mx-32">
        <h2 className="pb-5 md:pb-10">{title}</h2>
        <Tabs areBig>
          {slicedProcedures.map((procedure) => (
            <Tab key={procedure?.title} label={procedure?.title ?? ''}>
              <div
                className={cx('flex', {
                  'w-full gap-4 overflow-x-auto pt-4': isMobile,
                  'flex-col gap-4 pt-8': !isMobile,
                })}
              >
                {procedure.steps.map((step, index) =>
                  isMobile ? (
                    <div
                      key={step.title}
                      className="flex w-[calc(100vw-6rem)] shrink-0 flex-col items-center gap-2 bg-white"
                    >
                      <div className="text-[40px] font-bold text-primary">{index + 1}</div>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-full text-center text-h3 font-bold">{step.title}</div>
                        <div className="w-full text-center">{step.description}</div>
                      </div>
                    </div>
                  ) : (
                    <Row
                      key={step.title}
                      title={step.title}
                      moreContent={step.description}
                      number={index + 1}
                      border={false}
                    />
                  ),
                )}
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
