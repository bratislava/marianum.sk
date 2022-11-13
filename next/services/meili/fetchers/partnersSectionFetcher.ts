import { client } from '@services/gqlClient'
import { Key } from 'swr'

export const partnersSectionSwrKey = 'PartnersSection' as Key

export const partnersSectionFetcher = () => client.Partners()

export const partnersSectionPrefetch = {
  sectionTypename: 'ComponentSectionsPartnersSection',
  key: partnersSectionSwrKey,
  fetcher: partnersSectionFetcher,
} as const
