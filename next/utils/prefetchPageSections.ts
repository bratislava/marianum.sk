import { dehydrate, QueryClient } from '@tanstack/react-query'

import { PageEntityFragment } from '@/graphql'
import {
  ArticleType,
  getArticleJobsCategoriesSelectQuery,
  getArticleNewsCategoriesSelectQuery,
  getArticlePressCategoriesSelectQuery,
  getMeiliArticlesQuery,
} from '@/services/fetchers/articleListingFetcher'
import { getGraphqlCemeteriesQuery } from '@/services/fetchers/cemeteriesFetcher'
import { getCeremoniesArchiveSectionQuery } from '@/services/fetchers/ceremoniesArchiveSectionFetcher'
import {
  getCemeteriesInCeremoniesQuery,
  getGraphqlCeremoniesQuery,
} from '@/services/fetchers/ceremoniesSectionFetcher'
import {
  getCemeteriesInDebtorsQuery,
  getMeiliDebtorsQuery,
} from '@/services/fetchers/debtorsSectionFetcher'
import { getMeiliDisclosuresQuery } from '@/services/fetchers/disclosuresSectionFetcher'
import { getMeiliDocumentsQuery } from '@/services/fetchers/documentsSectionFetcher'
import { getGraphqlManagedObjectsQuery } from '@/services/fetchers/managedObjectsFetcher'
import { getGraphqlNewsQuery } from '@/services/fetchers/newsListingFetcher'
import { getGraphqlProceduresQuery } from '@/services/fetchers/proceduresFetcher'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  if (sectionTypes.includes('ComponentSectionsMapSection')) {
    await queryClient.prefetchQuery(getGraphqlCemeteriesQuery(locale))
  }

  if (sectionTypes.includes('ComponentSectionsProceduresSection')) {
    await queryClient.prefetchQuery(getGraphqlProceduresQuery(locale))
  }

  if (sectionTypes.includes('ComponentSectionsNewsListing')) {
    await queryClient.prefetchQuery(getGraphqlNewsQuery(locale))
  }

  if (sectionTypes.includes('ComponentSectionsMapOfManagedObjects')) {
    await queryClient.prefetchQuery(getGraphqlManagedObjectsQuery(locale))
  }

  if (sectionTypes.includes('ComponentSectionsDocumentsSection')) {
    await queryClient.prefetchQuery(getMeiliDocumentsQuery())
  }

  if (sectionTypes.includes('ComponentSectionsDisclosuresSection')) {
    await queryClient.prefetchQuery(getMeiliDisclosuresQuery())
  }

  if (sectionTypes.includes('ComponentSectionsDebtorsSection')) {
    await queryClient.prefetchQuery(getMeiliDebtorsQuery())
    await queryClient.prefetchQuery(getCemeteriesInDebtorsQuery(locale))
  }

  if (sectionTypes.includes('ComponentSectionsCeremoniesSection')) {
    await queryClient.prefetchQuery(getGraphqlCeremoniesQuery())
    await queryClient.prefetchQuery(getCemeteriesInCeremoniesQuery(locale))
  }

  if (sectionTypes.includes('ComponentSectionsCeremoniesArchiveSection')) {
    await queryClient.prefetchQuery(getCeremoniesArchiveSectionQuery())
    await queryClient.prefetchQuery(getCemeteriesInCeremoniesQuery(locale))
  }

  if (sectionTypes.includes('ComponentSectionsArticleNewsListing')) {
    await queryClient.prefetchQuery(getMeiliArticlesQuery({ type: ArticleType.News }))
    await queryClient.prefetchQuery(getArticleNewsCategoriesSelectQuery())
  }

  if (sectionTypes.includes('ComponentSectionsArticlePressListing')) {
    await queryClient.prefetchQuery(getMeiliArticlesQuery({ type: ArticleType.Press }))
    await queryClient.prefetchQuery(getArticlePressCategoriesSelectQuery())
  }

  if (sectionTypes.includes('ComponentSectionsArticleJobsListing')) {
    await queryClient.prefetchQuery(getMeiliArticlesQuery({ type: ArticleType.Jobs }))
    await queryClient.prefetchQuery(getArticleJobsCategoriesSelectQuery())
  }

  return dehydrate(queryClient)
}
