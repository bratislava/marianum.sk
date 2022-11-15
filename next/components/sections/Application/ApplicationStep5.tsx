import FormRadioGroup from '@components/atoms/Forms/FormRadioGroup'
import RadioBox from '@components/atoms/Radio/RadioBox'
import * as yup from 'yup'

import { ApplicationTypes } from './application.types'
import { useApplicationStep } from './useApplicationStep'

const yupShape = {
  osobnaPritomnost: yup.boolean().required(),
}

const defaultValues: ApplicationTypes.Step5Model = {
  osobnaPritomnost: false,
}

const ApplicationStep5 = ({
  values,
  onContinue,
  onFormChange,
}: ApplicationTypes.StepComponentProps<ApplicationTypes.Step.Step5>) => {
  const {
    control,
    formState: { errors },
    Wrapper,
  } = useApplicationStep({
    yupShape,
    values,
    defaultValues,
    onContinue,
    onFormChange,
  })

  return (
    <Wrapper>
      <h3 className="mb-4">Prajete si byť osobne prítomný pri vyhľadávaní?</h3>
      <p className="mb-4 md:mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris.
      </p>
      <FormRadioGroup
        name="osobnaPritomnost"
        control={control}
        errors={errors}
        className="grid gap-4 pb-6 md:grid-cols-2 md:gap-6"
      >
        <RadioBox value className="grow">
          Áno, chcem sa zúčastniť procesu
        </RadioBox>
        <RadioBox value={false} className="grow">
          Nie, nemám v pláne sa zúčastniť
        </RadioBox>
      </FormRadioGroup>
    </Wrapper>
  )
}

export default ApplicationStep5
