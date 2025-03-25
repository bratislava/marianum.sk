import { dehydrate, QueryClient } from '@tanstack/react-query'

import { PageEntityFragment } from '@/graphql'
import {
  getGraphqlCemeteriesQueryKey,
  graphqlCemeteriesFetcher,
} from '@/services/fetchers/cemeteriesFetcher'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  // TODO prefetch all needed sections
  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  if (sectionTypes.includes('ComponentSectionsMapSection')) {
    await queryClient.prefetchQuery({
      queryKey: getGraphqlCemeteriesQueryKey(locale),
      queryFn: () => graphqlCemeteriesFetcher(locale),
    })
  }

  return dehydrate(queryClient)
}
