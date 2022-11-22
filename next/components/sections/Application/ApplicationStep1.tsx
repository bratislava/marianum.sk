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
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step1>) => {
  const {
    control,
    Wrapper,
    formState: { errors },
  } = useApplicationStep({
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
        errors={errors}
        className="grid gap-4 pb-6 md:grid-cols-2 md:gap-6"
      >
        <RadioBox value={ApplicationTypes.TypZiadosti.Pridelenie} className="grow">
          Žiadam o pridelenie hrobového miesta
        </RadioBox>
        <RadioBox value={ApplicationTypes.TypZiadosti.Rezervacia} className="grow">
          Žiadam o rezerváciu hrobového miesta
        </RadioBox>
      </FormRadioGroup>
    </Wrapper>
  )
}

export default ApplicationStep1
