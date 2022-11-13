import { EditIcon } from '@assets/icons'
import React, { PropsWithChildren } from 'react'
import { DeepPartial } from 'react-hook-form'

import IconButton from '../../atoms/IconButton'
import { ApplicationTypes } from './application.types'

type StepCardProps = {
  title?: string
  enableEdit?: boolean
  onEdit?: () => void
}

const StepCard = ({
  title,
  enableEdit = true,
  onEdit = () => {},
  children,
}: PropsWithChildren<StepCardProps>) => {
  return (
    <div className="flex flex-col border border-border bg-white p-3 md:border-0 md:p-4 ">
      {title ? (
        <div className="mb-4 flex">
          <h3 className="grow text-h6">{title}</h3>
          {enableEdit ? (
            <div className="-mt-1 -ml-1 text-primary md:-mt-2 md:-ml-2">
              <IconButton onPress={onEdit} size="small">
                <EditIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
      ) : null}
      <p>{children}</p>
    </div>
  )
}

type ApplicationSummaryProps = {
  application: DeepPartial<ApplicationTypes.Application>
  cemeteries: ApplicationTypes.Cemeteries
  currentStep: ApplicationTypes.Step
  listOfSteps: ApplicationTypes.Step[]
  onEdit: (step: ApplicationTypes.Step) => void
}

const ApplicationSummary = ({
  application,
  cemeteries,
  currentStep,
  listOfSteps,
  onEdit,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
ApplicationSummaryProps) => {
  const isEditEnabledForStep = (step: ApplicationTypes.Step) => {
    const currentStepIndex = listOfSteps.indexOf(currentStep)
    const stepIndex = listOfSteps.indexOf(step)

    // It is not possible to edit steps after the current step.
    return stepIndex < currentStepIndex
  }

  return (
    <div className="flex flex-col gap-y-2 md:gap-y-3">
      <h2 className="mb-4 hidden text-h3 md:block">Sumár</h2>
      {!application.step1 ? (
        <StepCard enableEdit={false}>
          Vyplňte povinné údaje označené * a stlačte tlačidlo “Pokračovať”.
        </StepCard>
      ) : null}
      {application.step1 ? (
        <StepCard
          title="Typ žiadosti"
          onEdit={() => onEdit(ApplicationTypes.Step.Step1)}
          enableEdit={isEditEnabledForStep(ApplicationTypes.Step.Step1)}
        >
          {application.step1.typZiadosti === ApplicationTypes.TypZiadosti.Pridelenie
            ? 'Žiadam o pridelenie hrobového miesta'
            : null}
          {application.step1.typZiadosti === ApplicationTypes.TypZiadosti.Rezervacia
            ? 'Žiadam o rezerváciu hrobového miesta'
            : null}
        </StepCard>
      ) : null}
      {application.step2 ? (
        <StepCard
          title="Hrobové číslo"
          onEdit={() => onEdit(ApplicationTypes.Step.Step2)}
          enableEdit={isEditEnabledForStep(ApplicationTypes.Step.Step2)}
        >
          {application.step2.uviestHroboveCislo ? 'Áno' : 'Nie'}
          {application.step2.hroboveCislo ? ` • ${application.step2.hroboveCislo}` : null}
        </StepCard>
      ) : null}
      {application.step3 ? (
        <StepCard
          title="Druh hrobového miesta"
          onEdit={() => onEdit(ApplicationTypes.Step.Step3)}
          enableEdit={isEditEnabledForStep(ApplicationTypes.Step.Step3)}
        >
          {application.step3.druhHrobovehoMiesta ===
          ApplicationTypes.DruhHrobovehoMiesta.HroboveMiesto
            ? 'Hrobové miesto pre pochovanie do zeme'
            : null}
          {application.step3.druhHrobovehoMiesta ===
            ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto &&
          application.step3.typUrnovehoMiesta === ApplicationTypes.TypUrnovehoMiesta.VZemi
            ? 'Urnové miesto v zemi'
            : null}
          {application.step3.druhHrobovehoMiesta ===
            ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto &&
          application.step3.typUrnovehoMiesta === ApplicationTypes.TypUrnovehoMiesta.Stena
            ? 'Urnová stena (kolumbárium)'
            : null}
        </StepCard>
      ) : null}
      {application.step4 ? (
        <StepCard
          title="Cintorín"
          onEdit={() => onEdit(ApplicationTypes.Step.Step4)}
          enableEdit={isEditEnabledForStep(ApplicationTypes.Step.Step4)}
        >
          {cemeteries.all.find((c) => c.id === application?.step4?.cintorin)?.attributes?.title}
        </StepCard>
      ) : null}
      {application.step5 ? (
        <StepCard
          title="Osobná prítomnosť"
          onEdit={() => onEdit(ApplicationTypes.Step.Step5)}
          enableEdit={isEditEnabledForStep(ApplicationTypes.Step.Step5)}
        >
          {application.step5.osobnaPritomnost ? 'Áno' : 'Nie'}
        </StepCard>
      ) : null}
      {application.step6 ? (
        <StepCard
          title="Osobné údaje"
          onEdit={() => onEdit(ApplicationTypes.Step.Step6)}
          enableEdit={isEditEnabledForStep(ApplicationTypes.Step.Step6)}
        >
          {application.step6.meno && application.step6.priezvisko ? (
            <>
              {application.step6.meno} {application.step6.priezvisko}
              <br />
            </>
          ) : null}
          {application.step6.telefon ? (
            <>
              {application.step6.telefon}
              <br />
            </>
          ) : null}
          {application.step6.adresa && application.step6.psc && application.step6.mesto ? (
            <>
              {application.step6.adresa}, {application.step6.psc} {application.step6.mesto}
              <br />
            </>
          ) : null}
          {application.step6.email ? (
            <>
              {application.step6.email}
              <br />
            </>
          ) : null}
        </StepCard>
      ) : null}
    </div>
  )
}

export default ApplicationSummary
