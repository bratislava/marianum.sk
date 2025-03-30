import { dehydrate, QueryClient } from '@tanstack/react-query'

import { PageEntityFragment } from '@/graphql'
import {
  getArticleJobsCategoriesSelectQuery,
  getArticleNewsCategoriesSelectQuery,
  getArticlePressCategoriesSelectQuery,
} from '@/services/fetchers/articles/articleCategoriesSelectFetcher'
import { ArticleType, getMeiliArticlesQuery } from '@/services/fetchers/articles/articlesFetcher'
import { getGraphqlNewsListingQuery } from '@/services/fetchers/articles/newsListingFetcher'
import { getGraphqlCemeteriesQuery } from '@/services/fetchers/cemeteries/cemeteriesFetcher'
import { getCemeteriesInCeremoniesQuery } from '@/services/fetchers/cemeteries/cemeteriesInCeremoniesFetcher'
import { getCemeteriesInDebtorsQuery } from '@/services/fetchers/cemeteries/cemeteriesInDebtorsFetcher'
import { getCeremoniesArchiveSectionQuery } from '@/services/fetchers/ceremonies/ceremoniesArchiveSectionFetcher'
import { getGraphqlCeremoniesSectionQuery } from '@/services/fetchers/ceremonies/ceremoniesSectionFetcher'
import { getMeiliDebtorsQuery } from '@/services/fetchers/debtorsFetcher'
import { getMeiliDisclosuresQuery } from '@/services/fetchers/disclosuresFetcher'
import { getMeiliDocumentsQuery } from '@/services/fetchers/documentsFetcher'
import { getGraphqlManagedObjectsQuery } from '@/services/fetchers/managedObjectsFetcher'
import { getGraphqlProceduresQuery } from '@/services/fetchers/proceduresFetcher'
import { getGraphqlReviewsQuery } from '@/services/fetchers/reviewsFetcher'

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
    await queryClient.prefetchQuery(getGraphqlNewsListingQuery(locale))
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
    await queryClient.prefetchQuery(getGraphqlCeremoniesSectionQuery())
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

  if (sectionTypes.includes('ComponentSectionsReviewListing')) {
    await queryClient.prefetchQuery(getGraphqlReviewsQuery(locale))
  }

  return dehydrate(queryClient)
}
