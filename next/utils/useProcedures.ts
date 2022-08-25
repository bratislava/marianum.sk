import slugify from 'slugify'
import useSWR from 'swr'

import { ChecklistItem } from '../components/molecules/Checklist/checklistReducer'
import { ComponentGeneralProcedureItem } from '../graphql'
import { client } from './gql'
import { isDefined } from './isDefined'

export const parseSteps = (filteredSteps: ComponentGeneralProcedureItem[]) => {
  return (
    filteredSteps.map(
      ({ title, description }, index) =>
        ({
          title,
          description: description ?? null,
          key: slugify(title),
          isOpen: index === 0,
        } as ChecklistItem),
    ) ?? []
  )
}

export const useProcedures = ({ locale }: { locale: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { data, error } = useSWR(['UpcomingEvents', locale], (_key, locale) =>
    client.Procedures({ locale }),
  )

  const procedure1 = data?.procedure?.data?.attributes?.outsideMedicalFacility
  const steps1 = parseSteps(procedure1?.steps?.filter(isDefined) ?? [])

  const procedure2 = data?.procedure?.data?.attributes?.atMedicalFacility
  const steps2 = parseSteps(procedure2?.steps?.filter(isDefined) ?? [])

  const procedures = [
    { ...procedure1, steps: steps1 },
    { ...procedure2, steps: steps2 },
  ]

  const isLoading = !data && !error

  return {
    error,
    procedures,
    isLoading,
  }
}
