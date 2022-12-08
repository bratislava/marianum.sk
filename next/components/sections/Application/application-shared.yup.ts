// Due to bug in Strapi it's not possible to include files from another folder. The easiest way to share resources
// between Strapi and Next is to keep this file in sync manually when there's a change.
//
// Next path: next/components/sections/Application/application-shared.yup.ts
// Strapi path: strapi/src/api/application/services/application-shared.yup.ts

import * as yup from 'yup'

import { ApplicationTypes } from './application-shared.types'

export const step1YupShape = {
  typZiadosti: yup
    .mixed<ApplicationTypes.TypZiadosti>()
    .oneOf(Object.values(ApplicationTypes.TypZiadosti)),
}

export const step2YupShape = {
  uviestHroboveCislo: yup.boolean().required(),
  hroboveCislo: yup.mixed().when(['uviestHroboveCislo'], {
    is: (uviestHroboveCislo: boolean) => uviestHroboveCislo,
    // eslint-disable-next-line unicorn/no-thenable
    then: yup.string().required('required'),
    otherwise: yup.mixed().notRequired().nullable(),
  }),
}

export const step3YupShape = {
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
    otherwise: yup.mixed().notRequired().nullable(),
  }),
}

export const step4YupShape = {
  cintorin: yup.string().required('required'),
}

export const step5YupShape = {
  osobnaPritomnost: yup.boolean().required('required'),
}

export const step6YupShape = {
  meno: yup.string().required('required'),
  priezvisko: yup.string().required('required'),
  email: yup.string().required('required').email('invalidEmail'),
  telefon: yup.string().required('required'),
  adresa: yup.string().required('required'),
  mesto: yup.string().required('required'),
  psc: yup.string().required('required'),
}

export const step7YupShape = {
  poznamka: yup.string(),
  suhlasSOdoslanim: yup.boolean().required('required').isTrue('mustBeTrue'),
  suhlasSOsobnymiUdajmi: yup.boolean().required('required').isTrue('mustBeTrue'),
  suhlasNewsletter: yup.boolean().required('required'),
}

export const applicationShape = yup.object({
  step1: yup.object(step1YupShape),
  step2: yup.mixed().when(['step1'], {
    is: (step1: ApplicationTypes.Step1Model) =>
      step1.typZiadosti === ApplicationTypes.TypZiadosti.Rezervacia,
    // eslint-disable-next-line unicorn/no-thenable
    then: yup.object(step2YupShape),
  }),
  step3: yup.object(step3YupShape),
  step4: yup.object(step4YupShape),
  step5: yup.object(step5YupShape),
  step6: yup.object(step6YupShape),
  step7: yup.object(step7YupShape),
})
