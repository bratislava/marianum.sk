import cx from 'classnames'
import { useContext, useMemo } from 'react'

import MLink from '@/components/atoms/MLink'
import TabItem from '@/components/atoms/Tabs/TabItem'
import Tabs from '@/components/atoms/Tabs/Tabs'
import { sectionContext } from '@/components/layouts/SectionsWrapper'
import Section, { SectionProps } from '@/components/molecules/Section'
import { ProcedureFragment, ProceduresShortSectionFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'
import { useTailwindBreakpoint } from '@/utils/useTailwindBreakpoint'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'

type HomepageProceduresProps = Pick<SectionProps, 'background'> & {
  outsideMedicalFacility: ProcedureFragment | null | undefined
  atMedicalFacility: ProcedureFragment | null | undefined
  section: ProceduresShortSectionFragment
}

const HomepageProceduresSection = ({
  outsideMedicalFacility: outMF,
  atMedicalFacility: atMF,
  section,
  ...rest
}: HomepageProceduresProps) => {
  const { getLinkProps } = useGetLinkProps()
  const { isNull } = useTailwindBreakpoint()
  const isMobile = useMemo(() => isNull, [isNull])
  const { border } = useContext(sectionContext)

  const { showMoreButton, title } = section
  const showMore = getLinkProps(showMoreButton)

  const slicedProceduresWithKeys = useMemo(() => {
    return [
      {
        key: 'outsideMedicalFacility',
        ...outMF,
        steps: outMF?.steps?.filter(isDefined).slice(0, 3) ?? [],
      },
      {
        key: 'atMedicalFacility',
        ...atMF,
        steps: atMF?.steps?.filter(isDefined).slice(0, 3) ?? [],
      },
    ]
  }, [outMF, atMF])

  return (
    <Section {...rest}>
      <div className="text-center lg:mx-32">
        <h2 className="pb-5 md:pb-10">{title}</h2>
        <Tabs>
          {slicedProceduresWithKeys.map((procedure) => (
            <TabItem key={procedure.key} title={procedure.title}>
              <ol
                className={cx('flex', {
                  'w-full gap-4 overflow-x-auto scrollbar-hide': isMobile,
                  'flex-col gap-4': !isMobile,
                })}
              >
                {procedure.steps.map((step, index) =>
                  isMobile ? (
                    <li
                      key={step.title}
                      className={cx(
                        'flex w-[calc(100vw-6rem)] shrink-0 flex-col items-center gap-2 bg-white px-6 pb-8 pt-4',
                        {
                          'border border-border': border,
                        },
                      )}
                    >
                      <div className="text-[40px] font-bold text-primary">{index + 1}</div>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-full text-center text-h3 font-bold">{step.title}</div>
                        <div className="w-full text-center">{step.description}</div>
                      </div>
                    </li>
                  ) : (
                    <li
                      key={step.title}
                      className={cx('flex items-center bg-white p-6', {
                        'border border-border': border,
                      })}
                    >
                      <div className="pr-6 text-h1 font-bold text-primary">{index + 1}</div>
                      <div className="flex flex-col">
                        <h4 className="w-fit text-left text-h5 text-foreground-heading">
                          {step.title}
                        </h4>
                        <div className="pt-2 text-left">{step.description}</div>
                      </div>
                    </li>
                  ),
                )}
              </ol>
            </TabItem>
          ))}
        </Tabs>
        {showMoreButton && (
          <div className="mt-8">
            <MLink href={showMore.href}>{showMore.label}</MLink>
          </div>
        )}
      </div>
    </Section>
  )
}

export default HomepageProceduresSection
