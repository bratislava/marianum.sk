import { DeepPartial } from 'react-hook-form'

import { CemeteryInApplicationEntityFragment } from '../../../graphql'
import { isDefined } from '../../../utils/isDefined'
import { ApplicationTypes } from './application.types'

export const getListOfSteps = (application: DeepPartial<ApplicationTypes.Application>) => {
  return [
    ApplicationTypes.Step.Step1,
    // The second step is only for reservation.
    application.step1?.typZiadosti === ApplicationTypes.TypZiadosti.Rezervacia
      ? ApplicationTypes.Step.Step2
      : null,
    ApplicationTypes.Step.Step3,
    ApplicationTypes.Step.Step4,
    ApplicationTypes.Step.Step5,
    ApplicationTypes.Step.Step6,
    ApplicationTypes.Step.Step7,
  ].filter(isDefined)
}

export const partitionCemeteries = (cemeteries: CemeteryInApplicationEntityFragment[]) => {
  return {
    all: cemeteries,
    hroboveMiesto: cemeteries.filter((c) => c.attributes?.ziadostHroboveMiesto),
    urnoveMiestoVZemi: cemeteries.filter((c) => c.attributes?.ziadostUrnoveMiestoVZemi),
    urnovaStena: cemeteries.filter((c) => c.attributes?.ziadostUrnovaStena),
  }
}

/**
 * As the user can go back and forth through the application, before each save we should fix the application if it's
 * containing the data it shouldn't.
 */
export const fixApplication = (
  applicationToFix: DeepPartial<ApplicationTypes.Application>,
  cemeteries: ApplicationTypes.Cemeteries,
) => {
  const newApplication = { ...applicationToFix }

  // The second step is only for reservation.
  if (newApplication.step1?.typZiadosti !== ApplicationTypes.TypZiadosti.Rezervacia) {
    delete newApplication.step2
  }

  // Cemeteries are different for step 3 options, if they change, and they don't share the same cemetery, it's deleted
  // from the data.
  if (
    (newApplication.step3?.druhHrobovehoMiesta ===
      ApplicationTypes.DruhHrobovehoMiesta.HroboveMiesto &&
      !cemeteries.hroboveMiesto.some((c) => c.id === newApplication.step4?.cintorin)) ||
    (newApplication.step3?.druhHrobovehoMiesta ===
      ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto &&
      newApplication.step3?.typUrnovehoMiesta === ApplicationTypes.TypUrnovehoMiesta.VZemi &&
      !cemeteries.urnoveMiestoVZemi.some((c) => c.id === newApplication.step4?.cintorin)) ||
    (newApplication.step3?.druhHrobovehoMiesta ===
      ApplicationTypes.DruhHrobovehoMiesta.UrnoveMiesto &&
      newApplication.step3?.typUrnovehoMiesta === ApplicationTypes.TypUrnovehoMiesta.Stena &&
      !cemeteries.urnovaStena.some((c) => c.id === newApplication.step4?.cintorin))
  ) {
    delete newApplication.step4
  }

  return newApplication
}
