import { client } from '@services/graphql/gqlClient'

export const reviewsFetcher = (locale: string) => () => client.Reviews({ locale })

export const getReviewPrefetch = (locale: string) =>
  ({
    sectionTypename: 'ComponentSectionsReviewListing',
    key: 'reviews',
    fetcher: reviewsFetcher(locale),
  } as const)
