import { client } from '@services/graphql/gqlClient'
import { Key } from 'swr'

export const partnersSectionSwrKey = 'PartnersSection' as Key

export const partnersSectionFetcher = () => client.Partners()

export const partnersSectionPrefetch = {
  sectionTypename: 'ComponentSectionsPartnersSection',
  key: partnersSectionSwrKey,
  fetcher: partnersSectionFetcher,
} as const
