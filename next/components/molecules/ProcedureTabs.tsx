import { useTranslation } from 'next-i18next'
import slugify from 'slugify'
import useSWR from 'swr'

import { getProceduresSwrKey, proceduresFetcher } from '../../utils/fetchers/proceduresFetcher'
import { isDefined } from '../../utils/isDefined'
import Tab from '../atoms/Tabs/Tab'
import Tabs from '../atoms/Tabs/Tabs'
import Checklist from './Checklist/Checklist'
import ChecklistSkeleton from './Checklist/ChecklistSkeleton'

const ProcedureTabs = () => {
  const { i18n } = useTranslation()

  const fetcher = proceduresFetcher(i18n.language)
  const { data, error } = useSWR(getProceduresSwrKey(i18n.language), fetcher)

  const { outsideMedicalFacility, atMedicalFacility } = data?.procedures?.data?.attributes ?? {}
  const procedures = [outsideMedicalFacility, atMedicalFacility].filter(isDefined)

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data && !error) {
    return (
      <div className="flex flex-1 animate-pulse flex-col gap-9">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row">
          <div className="relative flex flex-1 flex-wrap items-center justify-center gap-2 border border-gray bg-gray px-8 pt-5 pb-6">
            <div className="h-4 w-16 rounded bg-white" />
            <div className="h-4 w-28 rounded bg-white" />
            <div className="h-4 w-12 rounded bg-white" />
            <div className="h-4 w-32 rounded bg-white" />
            <div className="absolute -bottom-3 hidden h-6 w-6 rotate-[-39deg] skew-x-12 bg-gray sm:block" />
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-2 border border-border px-8 pt-5 pb-6">
            <div className="h-4 w-16 rounded bg-gray" />
            <div className="h-4 w-24 rounded bg-gray" />
            <div className="h-4 w-8 rounded bg-gray" />
          </div>
        </div>
        <ChecklistSkeleton />
      </div>
    )
  }

  return (
    <Tabs areBig>
      {procedures.map((procedure) => (
        <Tab key={procedure?.title} label={procedure?.title ?? ''}>
          <div>
            <Checklist
              items={
                procedure?.steps?.filter(isDefined).map((step, index) => ({
                  ...step,
                  key: slugify(step.title),
                  isOpen: index === 0,
                })) ?? []
              }
              downloadFile={procedure?.downloadFile?.data}
            />
          </div>
        </Tab>
      ))}
    </Tabs>
  )
}

export default ProcedureTabs
