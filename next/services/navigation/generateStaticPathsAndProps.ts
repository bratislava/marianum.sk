import last from 'lodash/last'
import { GetStaticPathsResult, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import { GeneralEntityFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import { fetchNavigation } from '@/services/navigation/fetchNavigation'
import { getNavigationStaticProps } from '@/services/navigation/getNavigationStaticProps'
import {
  getEntityForStrapiEntity,
  getPathForEntity,
  StrapiEntity,
} from '@/services/navigation/getPathForEntity'
import { navigationConfig } from '@/services/navigation/navigationConfig'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'
import { NOT_FOUND } from '@/utils/consts'
import { isDefined } from '@/utils/isDefined'

type FullPathParams = { fullPath: string[] }

/** `/a/b/c` -> `{ params: { fullPath: ['a', 'b', 'c'] }, locale }` */
const toStaticPath = (path: string, locale: string) => ({
  params: { fullPath: path.split('/').slice(1) },
  locale,
})

/**
 * Static paths of all pages, built from the page tree.
 */
export const generatePagesStaticPaths = async (): Promise<
  GetStaticPathsResult<FullPathParams>['paths']
> => {
  const navigation = await fetchNavigation(navigationConfig)

  return Object.entries(navigation).flatMap(([locale, localeNavigation]) =>
    Object.values(localeNavigation?.pagePathsMap ?? {})
      .filter(isDefined)
      .map(({ path }) => toStaticPath(path, locale)),
  )
}

/**
 * Shared function to generate static paths for detail entities.
 *
 * What it does:
 * 1. Queries all the entities by provided getter.
 * 2. For each entity, it uses `getPathForEntity` to determine its correct path.
 * 3. Returns correct paths as params in order to generate static paths.
 *
 * @param locale
 * @param entitiesPromiseGetter
 */
export const generateStaticPaths = async (
  locale: string,
  entitiesPromiseGetter: (locale: string) => Promise<StrapiEntity[] | undefined>,
): Promise<GetStaticPathsResult<FullPathParams>['paths']> => {
  const [navigation, entities] = await Promise.all([
    fetchNavigation(navigationConfig),
    entitiesPromiseGetter(locale),
  ])

  return (entities ?? [])
    .map((entity) => {
      const routeEntity = getEntityForStrapiEntity(entity)

      return routeEntity ? getPathForEntity(navigation, { ...routeEntity, locale }) : null
    })
    .filter(isDefined)
    .map((path) => toStaticPath(path, locale))
}

/**
 * Shared function to generate static props for a page or a detail entity.
 *
 * What it does:
 * 1. Checks whether the URL contains `fullPath` param and tries to parse the slug (the last part).
 * 2. Fetches general data, translations, navigation and the entity itself.
 * 3. Checks whether the `fullPath` matches the path of the entity (see `getPathForEntity`). Otherwise, whatever path
 *    that ends with the slug would work.
 * 4. If `getAdditionalProps` is provided, it executes it to get additional parameters and spreads them into the final
 *    object.
 *
 * @param locale
 * @param params
 * @param entityPromiseGetter
 * @param getAdditionalProps
 */
export const generateStaticProps = async <T extends StrapiEntity, AdditionalProps>({
  locale,
  params,
  entityPromiseGetter,
  getAdditionalProps,
}: {
  locale: string
  params: { fullPath?: string[] } | undefined
  entityPromiseGetter: (getterParams: { locale: string; slug: string }) => Promise<T | undefined>
  getAdditionalProps?: (entity: T) => Promise<AdditionalProps>
}) => {
  if (!params?.fullPath) {
    return NOT_FOUND
  }

  const { fullPath } = params
  const fullPathString = `/${fullPath.join('/')}`
  const slug = last(fullPath)

  if (!slug) {
    return NOT_FOUND
  }

  const [{ general }, entity, translations] = await Promise.all([
    client.General({ locale }),
    entityPromiseGetter({ locale, slug }),
    serverSideTranslations(locale),
  ])

  const routeEntity = getEntityForStrapiEntity(entity)
  if (!entity || !routeEntity) {
    return NOT_FOUND
  }

  const navigationStaticProps = await getNavigationStaticProps({
    locale,
    currentEntity: routeEntity,
  })

  if (
    getPathForEntity(navigationStaticProps.navigation, { ...routeEntity, locale }) !==
    fullPathString
  ) {
    return NOT_FOUND
  }

  const additionalProps = getAdditionalProps
    ? await getAdditionalProps(entity)
    : ({} as AdditionalProps)

  return {
    props: {
      navigationStaticProps,
      general: general?.data ?? null,
      entity,
      ...translations,
      ...additionalProps,
    },
    revalidate: 10,
  } as GetStaticPropsResult<
    {
      general: GeneralEntityFragment | null
      entity: T
    } & NavigationPageProps &
      SSRConfig &
      AdditionalProps
  >
}
