// Due to bug in Strapi it's not possible to include files from another folder. The easiest way to share resources
// between Strapi and Next is to keep this file in sync manually when there's a change.
//
// Next path: next/components/sections/Application/application-shared.types.ts
// Strapi path: strapi/src/api/application/services/application-shared.types.ts

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ApplicationTypes {
  export enum TypZiadosti {
    Pridelenie = 'Pridelenie',
    Rezervacia = 'Rezervacia',
  }

  export enum DruhHrobovehoMiesta {
    HroboveMiesto = 'HroboveMiesto',
    UrnoveMiesto = 'UrnoveMiesto',
  }

  export enum TypUrnovehoMiesta {
    VZemi = 'VZemi',
    Stena = 'Stena',
  }

  export enum Step {
    Step1 = 'step1',
    Step2 = 'step2',
    Step3 = 'step3',
    Step4 = 'step4',
    Step5 = 'step5',
    Step6 = 'step6',
    Step7 = 'step7',
  }

  export interface Step1Model {
    typZiadosti: TypZiadosti
  }

  export interface Step2Model {
    uviestHroboveCislo: boolean
    hroboveCislo?: string | null
  }

  export interface Step3Model {
    druhHrobovehoMiesta: DruhHrobovehoMiesta
    typUrnovehoMiesta?: TypUrnovehoMiesta | null
  }

  export interface Step4Model {
    cintorin: string | null
  }

  export interface Step5Model {
    osobnaPritomnost: boolean
  }

  export interface Step6Model {
    meno: string
    priezvisko: string
    email: string
    telefon: string
    adresa: string
    mesto: string
    psc: string
  }

  export interface Step7Model {
    poznamka: string
    suhlasSOdoslanim: boolean
    suhlasSOsobnymiUdajmi: boolean
    suhlasNewsletter: boolean
  }

  export type StepModel =
    | Step1Model
    | Step2Model
    | Step3Model
    | Step4Model
    | Step5Model
    | Step6Model
    | Step7Model

  export interface StepModelMap {
    [Step.Step1]: Step1Model
    [Step.Step2]: Step2Model
    [Step.Step3]: Step3Model
    [Step.Step4]: Step4Model
    [Step.Step5]: Step5Model
    [Step.Step6]: Step6Model
    [Step.Step7]: Step7Model
  }

  export interface Application {
    step1?: Step1Model
    step2?: Step2Model
    step3?: Step3Model
    step4?: Step4Model
    step5?: Step5Model
    step6?: Step6Model
    step7?: Step7Model
  }
}
