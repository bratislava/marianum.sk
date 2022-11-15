import FormRadioGroup from '@components/atoms/Forms/FormRadioGroup'
import FormTextField from '@components/atoms/Forms/FormTextField'
import RadioBox from '@components/atoms/Radio/RadioBox'
import { useEffect } from 'react'
import * as yup from 'yup'

import { ApplicationTypes } from './application.types'
import { useApplicationStep } from './useApplicationStep'

const yupShape = {
  uviestHroboveCislo: yup.boolean().required(),
  hroboveCislo: yup.mixed().when(['uviestHroboveCislo'], {
    is: (uviestHroboveCislo: boolean) => uviestHroboveCislo,
    // eslint-disable-next-line unicorn/no-thenable
    then: yup.string().min(1).required(),
    otherwise: yup.mixed().equals([undefined, null]),
  }),
}

const defaultValues: ApplicationTypes.Step2Model = { uviestHroboveCislo: false }

const ApplicationStep2 = ({
  values,
  onContinue,
  onFormChange,
}: ApplicationTypes.StepComponentProps<ApplicationTypes.Step.Step2>) => {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
    Wrapper,
  } = useApplicationStep({
    yupShape,
    values,
    defaultValues,
    onContinue,
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
    <Wrapper>
      <h3 className="mb-4">Chcete do žiadosti uviesť konkrétne hrobové číslo?</h3>
      <p className="mb-4 md:mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris.
      </p>
      <FormRadioGroup
        name="uviestHroboveCislo"
        control={control}
        errors={errors}
        className="grid gap-4 pb-4 md:grid-cols-2 md:gap-6 md:pb-6"
      >
        <RadioBox value className="grow">
          Áno, chcem
        </RadioBox>
        <RadioBox value={false} className="grow">
          Nie, nechcem
        </RadioBox>
      </FormRadioGroup>
      {/* TODO: Fix and use AnimateHeight */}
      {/* <AnimateHeight isVisible={watchUviestHroboveCislo}> */}
      {watchUviestHroboveCislo && (
        <div className="pb-4 md:pb-6">
          <FormTextField
            label="Hrobové číslo vo formáte: Cintorín / sektor / hrobové miesto"
            errors={errors}
            {...register('hroboveCislo')}
          />
        </div>
      )}
      {/* </AnimateHeight> */}
    </Wrapper>
  )
}

export default ApplicationStep2
