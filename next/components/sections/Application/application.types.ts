import { partitionCemeteries } from '@components/sections/Application/application.utils'
import { ApplicationText } from '@graphql'
import { DeepPartial } from 'react-hook-form'

import { ApplicationTypes } from './application-shared.types'

export type ApplicationStepComponentProps<T extends ApplicationTypes.Step> = {
  values?: DeepPartial<ApplicationTypes.StepModelMap[T]>
  onContinue: (values: ApplicationTypes.StepModelMap[T]) => void
  onFormChange: (values: DeepPartial<ApplicationTypes.StepModelMap[T]>) => void
  texts: ApplicationText
  sending?: boolean
}

export type ApplicationCemeteries = ReturnType<typeof partitionCemeteries>
