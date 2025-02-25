import FormRadioGroup from '@/components/atoms/Forms/FormRadioGroup'
import RadioBox from '@/components/atoms/Radio/RadioBox'
import { ApplicationStepComponentProps } from '@/components/sections/Application/application.types'

import { ApplicationTypes } from './application-shared.types'
import { step5YupShape } from './application-shared.yup'
import { ApplicationStepWrapper, useApplicationStep } from './useApplicationStep'

const defaultValues: ApplicationTypes.Step5Model = {
  osobnaPritomnost: false,
}

const ApplicationStep5 = ({
  values,
  onContinue,
  onFormChange,
  texts,
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step5>) => {
  const { control, formState, handleSubmit } = useApplicationStep<ApplicationTypes.Step5Model>({
    yupShape: step5YupShape,
    values,
    defaultValues,
    onFormChange,
  })

  return (
    <ApplicationStepWrapper handleSubmit={handleSubmit} onContinue={onContinue}>
      <h3 className="mb-3 md:mb-6">Prajete si byť osobne prítomný pri vyhľadávaní?</h3>
      {texts.osobnaPritomnostDescription ? (
        <p className="mb-4 md:mb-6">{texts.osobnaPritomnostDescription}</p>
      ) : null}
      <FormRadioGroup
        name="osobnaPritomnost"
        control={control}
        formState={formState}
        className="grid gap-4 pb-6 md:grid-cols-2 md:gap-6"
      >
        <RadioBox value className="grow">
          Áno, chcem sa zúčastniť procesu
        </RadioBox>
        <RadioBox value={false} className="grow">
          Nie, nemám v pláne sa zúčastniť
        </RadioBox>
      </FormRadioGroup>
    </ApplicationStepWrapper>
  )
}

export default ApplicationStep5
