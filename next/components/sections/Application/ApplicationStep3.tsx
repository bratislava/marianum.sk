import React, { useEffect } from 'react'
import * as yup from 'yup'

import FormRadioGroup from '../../atoms/Forms/FormRadioGroup'
import RadioBox from '../../atoms/Radio/RadioBox'
import { ApplicationTypes } from './application.types'
import { useApplicationStep } from './useApplicationStep'

const yupShape = {
  druhHrobovehoMiesta: yup
    .mixed<ApplicationTypes.DruhHrobovehoMiesta>()
    .oneOf(Object.values(ApplicationTypes.DruhHrobovehoMiesta)),
  typUrnovehoMiesta: yup.mixed().when(['druhHrobovehoMiesta'], {
    is: (druhHrobovehoMiesta: ApplicationTypes.DruhHrobovehoMiesta) =>
      druhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto,
    // eslint-disable-next-line unicorn/no-thenable
    then: yup
      .mixed<ApplicationTypes.TypUrnovehoMiesta>()
      .oneOf(Object.values(ApplicationTypes.TypUrnovehoMiesta)),
    otherwise: yup.mixed().equals([undefined, null]),
  }),
}

const defaultValues = { druhHrobovehoMiesta: ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto }

const ApplicationStep3 = ({
  values,
  onContinue,
  onFormChange,
}: ApplicationTypes.StepComponentProps<ApplicationTypes.Step.Step3>) => {
  const {
    setValue,
    watch,
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

  const watchDruhHrobovehoMiesta = watch('druhHrobovehoMiesta')

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {
      if (name === 'druhHrobovehoMiesta' && type === 'change') {
        if (value.druhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto) {
          setValue('typUrnovehoMiesta', ApplicationTypes.TypUrnovehoMiesta.VZemi)
        }
        if (value.druhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.HroboveMiesto) {
          setValue('typUrnovehoMiesta', null)
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [setValue, watch])

  return (
    <Wrapper>
      <h3 className="mb-3 md:mb-6">Druh hrobového miesta</h3>
      <p className="mb-4 md:mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris.
      </p>
      <FormRadioGroup
        name="druhHrobovehoMiesta"
        control={control}
        errors={errors}
        className="grid gap-4 pb-4 md:grid-cols-2 md:gap-6 md:pb-6"
      >
        <RadioBox value={ApplicationTypes.DruhHrobovehoMiesta.HroboveMiesto} className="grow">
          Hrobové miesto pre pochovanie do zeme
        </RadioBox>
        <RadioBox value={ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto} className="grow">
          Urnové miesto
        </RadioBox>
      </FormRadioGroup>
      {/* TODO: Fix and use AnimateHeight */}
      {/* <AnimateHeight */}
      {/*  isVisible={watchDruhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto} */}
      {/* > */}
      {watchDruhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto && (
        <div>
          <h4 className="mb-4">Vyberte typ urnového miesta</h4>
          <FormRadioGroup
            name="typUrnovehoMiesta"
            control={control}
            errors={errors}
            className="grid gap-4 pb-6 md:grid-cols-2 md:gap-6"
          >
            <RadioBox value={ApplicationTypes.TypUrnovehoMiesta.VZemi} className="grow">
              Urnové miesto v zemi
            </RadioBox>
            <RadioBox value={ApplicationTypes.TypUrnovehoMiesta.Stena} className="grow">
              Urnová stena (kolumbárium)
            </RadioBox>
          </FormRadioGroup>
        </div>
      )}
      {/* </AnimateHeight> */}
    </Wrapper>
  )
}

export default ApplicationStep3
