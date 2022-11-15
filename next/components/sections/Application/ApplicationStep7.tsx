import React from 'react'
import * as yup from 'yup'

import FormCheckbox from '../../atoms/Forms/FormCheckbox'
import TextField from '../../atoms/TextField'
import { ApplicationTypes } from './application.types'
import { useApplicationStep } from './useApplicationStep'

const yupShape = {
  poznamka: yup.string(),
  suhlasSOdoslanim: yup.boolean().isTrue(),
  suhlasSOsobnymiUdajmi: yup.boolean().isTrue(),
  suhlasNewsletter: yup.boolean().required(),
}

const defaultValues: ApplicationTypes.Step7Model = {
  poznamka: '',
  suhlasSOdoslanim: false,
  suhlasSOsobnymiUdajmi: false,
  suhlasNewsletter: false,
}

const ApplicationStep7 = ({
  values,
  onContinue,
  onFormChange,
}: ApplicationTypes.StepComponentProps<ApplicationTypes.Step.Step7>) => {
  const {
    register,
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
      <h3 className="mb-3 md:mb-6">Poznámka</h3>
      <TextField area {...register('poznamka')} />

      <h3 className="mt-8 mb-4">Súhlasy</h3>
      <div className="grid gap-4 pb-4 md:pb-6">
        <FormCheckbox name="suhlasSOdoslanim" control={control} errors={errors}>
          Súhlasím s vyhlásením o záväznosti odoslanej žiadosti a platnosti údajov v nej uvedených.
          *
        </FormCheckbox>
        <FormCheckbox name="suhlasSOsobnymiUdajmi" control={control} errors={errors}>
          Súhlasím so spracovaním osobných údajov. *
        </FormCheckbox>
        <FormCheckbox name="suhlasNewsletter" control={control} errors={errors}>
          Súhlasím so spracovaním osobných údajov na marketingové účely a registráciou na odber
          noviniek.
        </FormCheckbox>
      </div>
    </Wrapper>
  )
}

export default ApplicationStep7
