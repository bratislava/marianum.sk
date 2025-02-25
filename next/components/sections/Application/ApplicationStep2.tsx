import { AnimateHeight } from '@components/atoms/AnimateHeight'
import FormRadioGroup from '@components/atoms/Forms/FormRadioGroup'
import FormTextField from '@components/atoms/Forms/FormTextField'
import RadioBox from '@components/atoms/Radio/RadioBox'
import { useEffect } from 'react'

import { ApplicationStepComponentProps } from './application.types'
import { ApplicationTypes } from './application-shared.types'
import { step2YupShape } from './application-shared.yup'
import { ApplicationStepWrapper, useApplicationStep } from './useApplicationStep'

const defaultValues: ApplicationTypes.Step2Model = { uviestHroboveCislo: false }

const ApplicationStep2 = ({
  values,
  onContinue,
  onFormChange,
  texts,
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step2>) => {
  const { register, watch, control, setValue, formState, handleSubmit } =
    useApplicationStep<ApplicationTypes.Step2Model>({
      yupShape: step2YupShape,
      values,
      defaultValues,
      onFormChange,
    })

  const watchUviestHroboveCislo = watch('uviestHroboveCislo')

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {
      if (name === 'uviestHroboveCislo' && type === 'change') {
        setValue('hroboveCislo', value.uviestHroboveCislo ? '' : undefined)
      }
    })

    return () => subscription.unsubscribe()
  }, [setValue, watch])

  return (
    <ApplicationStepWrapper handleSubmit={handleSubmit} onContinue={onContinue}>
      <h3 className="mb-3 md:mb-6">Chcete do žiadosti uviesť konkrétne hrobové číslo?</h3>
      <FormRadioGroup
        name="uviestHroboveCislo"
        control={control}
        formState={formState}
        className="grid gap-4 pb-4 md:grid-cols-2 md:gap-6 md:pb-6"
      >
        <RadioBox value className="grow" tooltip={texts.uviestHroboveCisloAnoTooltip}>
          Áno, chcem
        </RadioBox>
        <RadioBox value={false} className="grow" tooltip={texts.uviestHroboveCisloNieTooltip}>
          Nie, nechcem
        </RadioBox>
      </FormRadioGroup>
      <AnimateHeight isVisible={watchUviestHroboveCislo}>
        <div className="pb-4 md:pb-6">
          <FormTextField
            label="Hrobové číslo vo formáte: Cintorín / sektor / hrobové miesto"
            formState={formState}
            {...register('hroboveCislo')}
          />
        </div>
      </AnimateHeight>
    </ApplicationStepWrapper>
  )
}

export default ApplicationStep2
