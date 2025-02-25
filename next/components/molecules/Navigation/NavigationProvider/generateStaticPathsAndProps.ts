import last from 'lodash/last'
import { GetStaticPathsResult, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  getFullPathFn,
  isCurrentPathValid,
  UnionSlugEntityType,
} from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { GeneralEntityFragment, NavigationItemFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'
import { parseNavigation } from '@/utils/parseNavigation'

/**
 * Shared function to generate static paths for entities.
 *
 * What it does:
 * 1. Queries all the entities by provided getter.
 * 2. For each entity, it uses `getFullPathFn` to determine its correct path.
 * 3. Returns correct paths as params in order to generate static paths.
 *
 * TODO: Locales
 *
 * @param locale
 * @param entitiesPromiseGetter
 */
export const generateStaticPaths = async (
  locale: string | null,
  entitiesPromiseGetter: (locale?: string | null) => Promise<UnionSlugEntityType[] | undefined>,
) => {
  const [{ navigation }, entities] = await Promise.all([
    client.General({ locale }),
    entitiesPromiseGetter(locale),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  const { navMap } = parseNavigation(filteredNavigation)

  const fullPaths = (entities?.map((entity) => getFullPathFn(entity, navMap)) ?? []).filter(
    isDefined,
  )
  const fullPathsArray = fullPaths.map((path) => path.split('/')?.slice(1))

  return fullPathsArray.map(
    (fullPath) => ({ params: { fullPath, locale: 'sk' } }) as const,
  ) as GetStaticPathsResult<{ fullPath: string[] }>['paths']
}

const notFound = {
  notFound: true,
} as const

/**
 * Shared function to generate static path for a specific route.
 *
 * What it does:
 * 1. Checks whether the URL contains `fullPath` param and tries to parse the slug (the last part).
 * 2. Fetches general data (navigation, translations) and the entity itself.
 * 3. Checks whether the `fullPath` matches the expected path for the entity as defined in getFullPathFn.
 * 4. If `getAdditionalProps` is provided, it executes it to get additional parameters and spreads them into the final
 * object.
 *
 * TODO: locales
 *
 * @param locale
 * @param params
 * @param entityPromiseGetter
 * @param getAdditionalProps
 */
export const generateStaticProps = async <T extends UnionSlugEntityType, AdditionalProps>({
  locale,
  params,
  entityPromiseGetter,
  getAdditionalProps,
}: {
  locale: string
  params: { fullPath?: string[] } | undefined
  entityPromiseGetter: (getterParams: { locale?: string; slug: string }) => Promise<T | undefined>
  getAdditionalProps?: (entity: T) => Promise<AdditionalProps>
}) => {
  if (!params?.fullPath) {
    return notFound
  }

  const { fullPath } = params
  const fullPathString = `/${fullPath.join('/')}`
  const slug = last(fullPath)

  if (!slug) {
    return notFound
  }

  const [{ navigation, general }, entity, translations] = await Promise.all([
    client.General({ locale }),
    entityPromiseGetter({ locale, slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  if (!entity || !isCurrentPathValid(fullPathString, entity, filteredNavigation)) {
    return notFound
  }

  const additionalProps = getAdditionalProps
    ? await getAdditionalProps(entity)
    : ({} as AdditionalProps)

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      entity,
      ...translations,
      ...additionalProps,
    },
    revalidate: 10,
  } as GetStaticPropsResult<
    {
      navigation: NavigationItemFragment[]
      general: GeneralEntityFragment | null
      entity: T
    } & SSRConfig &
      AdditionalProps
  >
}
