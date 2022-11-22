import { AnimateHeight } from '@components/atoms/AnimateHeight'
import FormRadioGroup from '@components/atoms/Forms/FormRadioGroup'
import RadioBox from '@components/atoms/Radio/RadioBox'
import { ApplicationStepComponentProps } from '@components/sections/Application/application.types'
import { useEffect } from 'react'

import { ApplicationTypes } from './application-shared.types'
import { step3YupShape } from './application-shared.yup'
import { useApplicationStep } from './useApplicationStep'

const defaultValues = {
  druhHrobovehoMiesta: ApplicationTypes.DruhHrobovehoMiesta.HroboveMiesto,
}

const ApplicationStep3 = ({
  values,
  onContinue,
  onFormChange,
  texts,
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step3>) => {
  const {
    setValue,
    watch,
    control,
    formState: { errors },
    Wrapper,
  } = useApplicationStep({
    yupShape: step3YupShape,
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
      <p className="mb-4 md:mb-6" />
      <FormRadioGroup
        name="druhHrobovehoMiesta"
        control={control}
        errors={errors}
        className="grid gap-4 pb-4 md:grid-cols-2 md:gap-6 md:pb-6"
      >
        <RadioBox
          value={ApplicationTypes.DruhHrobovehoMiesta.HroboveMiesto}
          className="grow"
          tooltip={texts.druhHroboveMiestoTooltip}
        >
          Hrobové miesto pre pochovanie do zeme
        </RadioBox>
        <RadioBox
          value={ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto}
          className="grow"
          tooltip={texts.druhUrnoveMiestoTooltip}
        >
          Urnové miesto
        </RadioBox>
      </FormRadioGroup>
      <AnimateHeight
        isVisible={watchDruhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto}
      >
        <div>
          <h4 className="mb-4">Vyberte typ urnového miesta</h4>
          <FormRadioGroup
            name="typUrnovehoMiesta"
            control={control}
            errors={errors}
            className="grid gap-4 pb-6 md:grid-cols-2 md:gap-6"
          >
            <RadioBox
              value={ApplicationTypes.TypUrnovehoMiesta.VZemi}
              className="grow"
              tooltip={texts.druhUrnoveMiestoVZemiTooltip}
            >
              Urnové miesto v zemi
            </RadioBox>
            <RadioBox
              value={ApplicationTypes.TypUrnovehoMiesta.Stena}
              className="grow"
              tooltip={texts.druhUrnovaStenaTooltip}
            >
              Urnová stena (kolumbárium)
            </RadioBox>
          </FormRadioGroup>
        </div>
      </AnimateHeight>
    </Wrapper>
  )
}

export default ApplicationStep3
