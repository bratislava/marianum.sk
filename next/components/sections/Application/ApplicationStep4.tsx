import { MapMarkerSvg } from '@assets'
import FormRadioGroup from '@components/atoms/Forms/FormRadioGroup'
import RadioCircle from '@components/atoms/Radio/RadioCircle'
import { CemeteryInApplicationEntityFragment } from '@graphql'
import { RadioGroup } from '@headlessui/react'
import { useMemo } from 'react'
import { DeepPartial } from 'react-hook-form'

import { ApplicationCemeteries, ApplicationStepComponentProps } from './application.types'
import { ApplicationTypes } from './application-shared.types'
import { step4YupShape } from './application-shared.yup'
import { ApplicationStepWrapper, useApplicationStep } from './useApplicationStep'

const CemeteryRadioBox = ({ cemetery }: { cemetery: CemeteryInApplicationEntityFragment }) => {
  return (
    <RadioGroup.Option
      value={cemetery.id}
      className="flex w-full cursor-pointer border-b border-border md:last:border-b-0"
    >
      {({ active, checked, disabled }) => (
        <div className="flex w-full justify-between px-5 py-3">
          <div className="flex grow gap-x-4">
            <div className="flex items-center">
              <MapMarkerSvg width="12px" height={null} />
            </div>
            <div className="flex flex-col">
              <RadioGroup.Label className="font-semibold text-primary">
                {cemetery.attributes?.title}
              </RadioGroup.Label>
              <span>{cemetery.attributes?.address}</span>
            </div>
          </div>

          <div className="ml-3.5 flex items-center">
            <RadioCircle checked={checked} disabled={disabled} active={active} />
          </div>
        </div>
      )}
    </RadioGroup.Option>
  )
}

const ApplicationStep4 = ({
  step3,
  values,
  onContinue,
  onFormChange,
  cemeteries,
}: ApplicationStepComponentProps<ApplicationTypes.Step.Step4> & {
  step3: DeepPartial<ApplicationTypes.Step3Model> | undefined
  cemeteries: ApplicationCemeteries
}) => {
  const list = useMemo(() => {
    if (step3?.druhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.HroboveMiesto) {
      return cemeteries.hroboveMiesto
    }
    if (
      step3?.druhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto &&
      step3.typUrnovehoMiesta === ApplicationTypes.TypUrnovehoMiesta.VZemi
    ) {
      return cemeteries.urnoveMiestoVZemi
    }
    if (
      step3?.druhHrobovehoMiesta === ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto &&
      step3.typUrnovehoMiesta === ApplicationTypes.TypUrnovehoMiesta.Stena
    ) {
      return cemeteries.urnovaStena
    }

    return []
  }, [cemeteries, step3])

  const defaultValues = useMemo(
    () => ({ cintorin: list.length > 0 ? (list[0]?.id ?? null) : null }),
    [list],
  )

  const { control, formState, handleSubmit } = useApplicationStep<ApplicationTypes.Step4Model>({
    yupShape: step4YupShape,
    values,
    defaultValues,
    onFormChange,
  })

  return (
    <ApplicationStepWrapper handleSubmit={handleSubmit} onContinue={onContinue}>
      <h3 className="mb-3 md:mb-6">Výber cintorína</h3>
      <FormRadioGroup
        // @ts-ignore
        value="5"
        name="cintorin"
        control={control}
        formState={formState}
        className="mb-6 flex w-full flex-row flex-wrap md:border md:border-border"
      >
        {list.map((cemetery) => (
          <CemeteryRadioBox key={cemetery.id} cemetery={cemetery} />
        ))}
      </FormRadioGroup>
    </ApplicationStepWrapper>
  )
}

export default ApplicationStep4
