import FormTextField from '@/components/atoms/Forms/FormTextField'
import { ApplicationStepComponentProps } from '@/components/sections/Application/application.types'

import { ApplicationTypes } from './application-shared.types'
import { step6YupShape } from './application-shared.yup'
import { ApplicationStepWrapper, useApplicationStep } from './useApplicationStep'

const defaultValues: ApplicationTypes.Step6Model = {
  meno: '',
  priezvisko: '',
  email: '',
  telefon: '',
  adresa: '',
  mesto: '',
  psc: '',
}

const ApplicationStep6 = ({
  values,
  onContinue,
  onFormChange,
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step6>) => {
  const { register, formState, handleSubmit } = useApplicationStep<ApplicationTypes.Step6Model>({
    yupShape: step6YupShape,
    values,
    defaultValues,
    onFormChange,
  })

  return (
    <ApplicationStepWrapper handleSubmit={handleSubmit} onContinue={onContinue}>
      <h3 className="mb-3 md:mb-6">Osobné údaje</h3>
      <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-4 md:gap-6 md:pb-6">
        <div className="md:col-span-2">
          <FormTextField
            autoComplete="given-name"
            label="Meno"
            {...register('meno')}
            formState={formState}
          />
        </div>
        <div className="md:col-span-2">
          <FormTextField
            autoComplete="family-name"
            label="Priezvisko"
            {...register('priezvisko')}
            formState={formState}
          />
        </div>
        <div className="md:col-span-2">
          <FormTextField
            autoComplete="email"
            label="Email"
            {...register('email')}
            formState={formState}
          />
        </div>
        <div className="md:col-span-2">
          <FormTextField
            autoComplete="tel"
            label="Telefón"
            {...register('telefon')}
            formState={formState}
          />
        </div>
        <div className="md:col-span-4">
          <FormTextField
            autoComplete="street-address"
            label="Adresa"
            {...register('adresa')}
            formState={formState}
          />
        </div>
        <div className="md:col-span-3">
          <FormTextField
            autoComplete="address-level2"
            label="Mesto"
            {...register('mesto')}
            formState={formState}
          />
        </div>
        <div className="md:col-span-1">
          <FormTextField
            autoComplete="postal-code"
            label="PSČ"
            {...register('psc')}
            formState={formState}
          />
        </div>
      </div>
    </ApplicationStepWrapper>
  )
}

export default ApplicationStep6
