import { client } from '../gql'

export const partnersSectionSwrKey = 'PartnersSection'

export const partnersSectionFetcher = () => client.Partners()

export const partnersSectionPrefetch = {
  sectionTypename: 'ComponentSectionsPartnersSection',
  key: partnersSectionSwrKey,
  fetcher: partnersSectionFetcher,
} as const
