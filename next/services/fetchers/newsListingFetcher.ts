import { client } from '@services/graphql/gqlClient'
import { Key } from 'swr'

export const getNewsListingSwrKey = (locale: string) => ['News', locale] as Key

export const newsListingFetcher = (locale: string) => () => client.News({ locale })

export const getNewsListingPrefetch = (locale: string) =>
  ({
    sectionTypename: 'ComponentSectionsNewsListing',
    key: getNewsListingSwrKey(locale),
    fetcher: newsListingFetcher(locale),
  }) as const
