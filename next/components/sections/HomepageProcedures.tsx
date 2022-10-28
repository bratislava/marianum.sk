import cx from 'classnames'
import { useMemo } from 'react'

import { CtaButtonFragment, ProcedureFragment } from '../../graphql'
import { useTailwindBreakpoint } from '../../hooks/useTailwindBreakpoint'
import { isDefined } from '../../utils/isDefined'
import MLink from '../atoms/MLink'
import Tab from '../atoms/Tabs/Tab'
import Tabs from '../atoms/Tabs/Tabs'
import { useSlug } from '../molecules/Navigation/NavigationProvider/useFullSlug'
import Section, { SectionProps } from '../molecules/Section'

type HomepageProceduresProps = Pick<SectionProps, 'title' | 'background'> & {
  procedures: ProcedureFragment[]
  showMoreButton: CtaButtonFragment | null | undefined
}

const HomepageProcedures = ({
  title,
  procedures,
  showMoreButton,
  ...rest
}: HomepageProceduresProps) => {
  const { getFullSlug } = useSlug()
  const { isNull } = useTailwindBreakpoint()
  const isMobile = useMemo(() => isNull, [isNull])

  const showMoreSlug = getFullSlug(showMoreButton?.page?.data)

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
        <Tabs>
          {slicedProcedures.map((procedure) => (
            <Tab key={procedure?.title} title={procedure?.title ?? ''}>
              <div
                className={cx('flex', {
                  'w-full gap-4 overflow-x-auto': isMobile,
                  'flex-col gap-4': !isMobile,
                })}
              >
                {procedure.steps.map((step, index) =>
                  isMobile ? (
                    <div
                      key={step.title}
                      className="flex w-[calc(100vw-6rem)] shrink-0 flex-col items-center gap-2 bg-white px-6 pt-4 pb-8"
                    >
                      <div className="text-[40px] font-bold text-primary">{index + 1}</div>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-full text-center text-h3 font-bold">{step.title}</div>
                        <div className="w-full text-center">{step.description}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={step.title} className="flex items-center bg-white p-6">
                      <div className="pr-6 text-h1 font-bold text-primary">{index + 1}</div>
                      <div className="flex flex-col">
                        <h4 className="w-fit text-left text-h5 text-foreground-heading">
                          {step.title}
                        </h4>
                        <div className="pt-2 text-left">{step.description}</div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
        {showMoreSlug && (
          <div className="mt-8">
            <MLink href={showMoreSlug}>{showMoreButton?.label}</MLink>
          </div>
        )}
      </div>
    </Section>
  )
}

export default HomepageProcedures
