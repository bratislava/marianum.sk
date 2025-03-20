import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import TabItem from '@/components/atoms/Tabs/TabItem'
import Tabs from '@/components/atoms/Tabs/Tabs'
import Checklist from '@/components/molecules/Checklist/Checklist'
import ChecklistSkeleton from '@/components/molecules/Checklist/ChecklistSkeleton'
import {
  getGraphqlProceduresQueryKey,
  graphqlProceduresFetcher,
} from '@/services/fetchers/proceduresFetcher'
import { isDefined } from '@/utils/isDefined'

const ProcedureTabs = () => {
  const { i18n } = useTranslation()
  const locale = i18n.language

  const { data, isPending, isError, error } = useQuery({
    queryKey: getGraphqlProceduresQueryKey(locale),
    queryFn: () => graphqlProceduresFetcher(locale),
  })

  if (isPending) {
    return (
      // Skeleton layout
      <div className="flex flex-1 animate-pulse flex-col gap-9">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row">
          <div className="relative flex flex-1 flex-wrap items-center justify-center gap-2 border border-gray bg-gray px-8 pb-6 pt-5">
            <div className="h-4 w-16 rounded bg-white" />
            <div className="h-4 w-28 rounded bg-white" />
            <div className="h-4 w-12 rounded bg-white" />
            <div className="h-4 w-32 rounded bg-white" />
            <div className="absolute -bottom-3 hidden size-6 rotate-[-39deg] skew-x-12 bg-gray sm:block" />
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-2 border border-border px-8 pb-6 pt-5">
            <div className="h-4 w-16 rounded bg-gray" />
            <div className="h-4 w-24 rounded bg-gray" />
            <div className="h-4 w-8 rounded bg-gray" />
          </div>
        </div>
        <ChecklistSkeleton />
      </div>
    )
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  const { outsideMedicalFacility, atMedicalFacility } = data.procedures?.data?.attributes ?? {}

  const proceduresWithKeys = [
    { key: 'outsideMedicalFacility', ...outsideMedicalFacility },
    { key: 'atMedicalFacility', ...atMedicalFacility },
  ]

  return (
    <Tabs>
      {proceduresWithKeys.filter(isDefined).map((procedure) => (
        <TabItem key={procedure.key} title={procedure.title}>
          <div>
            <Checklist
              localStorageId={procedure.key}
              updatedAt={data.procedures?.data?.attributes?.updatedAt}
              items={(procedure.steps ?? []).filter(isDefined)}
              downloadFile={procedure.downloadFile?.data}
            />
          </div>
        </TabItem>
      ))}
    </Tabs>
  )
}

export default ProcedureTabs
