import { ArrowLeftIcon, ErrorIcon } from '@assets/icons'
import IconButton from '@components/atoms/IconButton'
import AccordionItem from '@components/molecules/Accordion/AccordionItem'
import { ApplicationCemeteries } from '@components/sections/Application/application.types'
import ApplicationSent from '@components/sections/Application/ApplicationSent'
import { useSendApplication } from '@components/sections/Application/useSendApplication'
import { ApplicationText } from '@graphql'
import { useLeavePageConfirm } from '@utils/useLeavePageConfirm'
import { useCallback, useMemo, useRef, useState } from 'react'
import { DeepPartial } from 'react-hook-form'

import { fixApplication, getListOfSteps } from './application.utils'
import { ApplicationTypes } from './application-shared.types'
import ApplicationStep1 from './ApplicationStep1'
import ApplicationStep2 from './ApplicationStep2'
import ApplicationStep3 from './ApplicationStep3'
import ApplicationStep4 from './ApplicationStep4'
import ApplicationStep5 from './ApplicationStep5'
import ApplicationStep6 from './ApplicationStep6'
import ApplicationStep7 from './ApplicationStep7'
import ApplicationSummary from './ApplicationSummary'

type ApplicationSectionProps = {
  cemeteries: ApplicationCemeteries
  texts: ApplicationText
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const ApplicationSection = ({ cemeteries, texts }: ApplicationSectionProps) => {
  const [application, setApplication] = useState<DeepPartial<ApplicationTypes.Application>>({})
  const [currentStep, setCurrentStep] = useState(ApplicationTypes.Step.Step1)
  const editingStep = useRef<DeepPartial<ApplicationTypes.StepModel>>()
  const { sent, sending, error: sendError, send } = useSendApplication()

  useLeavePageConfirm(!sent && (Boolean(application.step1) || editingStep.current != null))

  const currentListOfSteps = useMemo(() => getListOfSteps(application), [application])

  const handleContinue = <Step extends ApplicationTypes.Step>(
    value: ApplicationTypes.StepModelMap[Step],
    captchaToken?: string,
  ) => {
    const newApplication = fixApplication({ ...application, [currentStep]: value }, cemeteries)
    setApplication(newApplication)

    const listOfSteps = getListOfSteps(newApplication)

    const currentStepIndex = listOfSteps.indexOf(currentStep)

    if (currentStepIndex === listOfSteps.length - 1) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises,@typescript-eslint/no-non-null-assertion
      send(newApplication as ApplicationTypes.Application, captchaToken!)
    } else {
      const nextStep = listOfSteps[currentStepIndex + 1]
      setCurrentStep(nextStep)
      editingStep.current = application[nextStep]
    }
  }

  const goToStep = useCallback(
    (step: ApplicationTypes.Step) => {
      // When back / edit button pressed, the not submitted form is saved to the application model.
      const newApplication = editingStep.current
        ? fixApplication({ ...application, [currentStep]: editingStep.current }, cemeteries)
        : application
      const listOfSteps = getListOfSteps(newApplication)

      if (listOfSteps.includes(step)) {
        setApplication(newApplication)
        setCurrentStep(step)
        editingStep.current = application[step]
      }
    },
    [application, cemeteries, currentStep],
  )

  const handleGoBack = () => {
    const listOfSteps = getListOfSteps(application)

    const indexOfCurrentStep = listOfSteps.indexOf(currentStep)
    const newStep = listOfSteps[indexOfCurrentStep - 1]

    if (newStep) {
      goToStep(newStep)
    }
  }

  const handleEdit = useCallback(
    () => (step: ApplicationTypes.Step) => {
      goToStep(step)
    },
    [goToStep],
  )

  const onFormChange = (form: DeepPartial<ApplicationTypes.StepModel>) => {
    editingStep.current = form
  }

  const summary = useMemo(
    () => (
      <ApplicationSummary
        application={application}
        cemeteries={cemeteries}
        currentStep={currentStep}
        listOfSteps={currentListOfSteps}
        onEdit={handleEdit}
      />
    ),
    [application, cemeteries, currentListOfSteps, currentStep, handleEdit],
  )

  return (
    <div className="flex h-full w-full flex-col">
      <div className="sticky top-0 col-span-2 flex h-[48px] shrink-0 items-center border-b border-border bg-white md:h-[60px]">
        <div className="ml-4 w-10 md:ml-7">
          {currentStep !== ApplicationTypes.Step.Step1 && !sent ? (
            <IconButton onPress={handleGoBack}>
              <ArrowLeftIcon className="text-background-dark" />
            </IconButton>
          ) : null}
        </div>
        <div className="grow">
          <h1 className="mr-14 flex justify-center text-h5 md:hidden">Žiadosť</h1>
          <h1 className="mr-[17] hidden justify-center text-h5 md:flex">
            Žiadosť o pridelenie alebo rezerváciu hrobového miesta
          </h1>
        </div>
      </div>
      {sent ? (
        <ApplicationSent />
      ) : (
        <div className="flex grow flex-row">
          <div className="flex grow justify-center overflow-y-auto">
            <div className="mx-4 my-6 grow lg:my-10 xl:mx-[114px] xl:max-w-[696px]">
              {currentStep === ApplicationTypes.Step.Step7 && (
                <div>
                  {sendError ? (
                    <div className="mb-6 flex gap-x-5 bg-error/12 p-5 text-error">
                      <div>
                        <ErrorIcon className="mt-0.5 h-5 w-5" />
                      </div>
                      <span>Žiadosť sa nepodarilo odoslať.</span>
                    </div>
                  ) : null}
                  <div className="md:hidden">
                    <AccordionItem title="Sumár" noBoxStyles>
                      {summary}
                    </AccordionItem>
                    <div className="my-4 h-0.5 bg-background-beige" />
                  </div>
                </div>
              )}
              {currentStep === ApplicationTypes.Step.Step1 ? (
                <ApplicationStep1
                  values={application.step1}
                  onContinue={handleContinue}
                  onFormChange={onFormChange}
                  texts={texts}
                />
              ) : null}
              {currentStep === ApplicationTypes.Step.Step2 ? (
                <ApplicationStep2
                  values={application.step2}
                  onContinue={handleContinue}
                  onFormChange={onFormChange}
                  texts={texts}
                />
              ) : null}
              {currentStep === ApplicationTypes.Step.Step3 ? (
                <ApplicationStep3
                  values={application.step3}
                  onContinue={handleContinue}
                  onFormChange={onFormChange}
                  texts={texts}
                />
              ) : null}
              {currentStep === ApplicationTypes.Step.Step4 ? (
                <ApplicationStep4
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  step3={application.step3}
                  values={application.step4}
                  onContinue={handleContinue}
                  onFormChange={onFormChange}
                  cemeteries={cemeteries}
                  texts={texts}
                />
              ) : null}
              {currentStep === ApplicationTypes.Step.Step5 ? (
                <ApplicationStep5
                  values={application.step5}
                  onContinue={handleContinue}
                  onFormChange={onFormChange}
                  texts={texts}
                />
              ) : null}
              {currentStep === ApplicationTypes.Step.Step6 ? (
                <ApplicationStep6
                  values={application.step6}
                  onContinue={handleContinue}
                  onFormChange={onFormChange}
                  texts={texts}
                />
              ) : null}
              {currentStep === ApplicationTypes.Step.Step7 ? (
                <ApplicationStep7
                  values={application.step7}
                  onContinue={handleContinue}
                  onFormChange={onFormChange}
                  texts={texts}
                  sending={sending}
                />
              ) : null}
            </div>
          </div>
          <div className="hidden w-[370px] shrink-0 overflow-y-auto bg-background-beige p-10 md:block lg:w-[516px]">
            {summary}
          </div>
        </div>
      )}
    </div>
  )
}
