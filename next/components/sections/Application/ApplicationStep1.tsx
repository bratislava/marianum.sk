import FormRadioGroup from '@components/atoms/Forms/FormRadioGroup'
import RadioBox from '@components/atoms/Radio/RadioBox'
import { ApplicationStepComponentProps } from '@components/sections/Application/application.types'

import { ApplicationTypes } from './application-shared.types'
import { step1YupShape } from './application-shared.yup'
import { useApplicationStep } from './useApplicationStep'

const defaultValues: ApplicationTypes.Step1Model = {
  typZiadosti: ApplicationTypes.TypZiadosti.Rezervacia,
}

const ApplicationStep1 = ({
  values,
  onContinue,
  onFormChange,
  texts,
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step1>) => {
  const { control, Wrapper, formState } = useApplicationStep({
    yupShape: step1YupShape,
    values,
    defaultValues,
    onContinue,
    onFormChange,
  })

  return (
    <Wrapper>
      <h3 className="mb-3 md:mb-6">Typ žiadosti</h3>
      <FormRadioGroup
        name="typZiadosti"
        control={control}
        formState={formState}
        className="grid gap-4 pb-6 md:grid-cols-2 md:gap-6"
      >
        <RadioBox
          value={ApplicationTypes.TypZiadosti.Pridelenie}
          className="grow"
          tooltip={texts.typZiadostiPridelenieTooltip}
        >
          Žiadam o pridelenie hrobového miesta
        </RadioBox>
        <RadioBox
          value={ApplicationTypes.TypZiadosti.Rezervacia}
          className="grow"
          tooltip={texts.typZiadostiRezervaciaTooltip}
        >
          Žiadam o rezerváciu hrobového miesta
        </RadioBox>
      </FormRadioGroup>
    </Wrapper>
  )
}

export default ApplicationStep1
