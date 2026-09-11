import { CeremonyEntityFragment, Maybe } from '@/graphql'
import { CemeteryMeili, CeremonyMeili } from '@/services/meili/meiliTypes'

/**
 * As the relation in ceremonies and debtors is always with the Slovak version, we always get the Slovak version as the
 * main one, so we fetch it with all the localizations, then we return the correct title based on user's locale
 * either from the Slovak or the localized version.
 */
export const getCemeteryInfoInCeremoniesDebtors = (
  // Minimal schema for cemetery to for this to work with all variants
  cemetery: Maybe<{
    title?: Maybe<string>
    slug?: Maybe<string>
    localizations?: Maybe<
      Maybe<{
        locale?: Maybe<string>
        title?: Maybe<string>
        slug?: Maybe<string>
      }>[]
    >
  }>,
  locale: string,
) => {
  const skCemeteryTitle = cemetery?.title
  const skCemeterySlug = cemetery?.slug

  const localeCemetery = cemetery?.localizations?.find(
    (innerCemetery) => innerCemetery?.locale === locale,
  )

  const localeCemeteryTitle = localeCemetery?.title
  const localeCemeterySlug = localeCemetery?.slug

  return {
    title: localeCemeteryTitle ?? skCemeteryTitle,
    slug: locale === 'sk' ? skCemeterySlug : localeCemeterySlug, // For the title we can fallback for SK version, but not for slug - the link wouldn't work.
  }
}

/**
 * As the relation in ceremonies and debtors is always with the Slovak version, we always get the Slovak version as the
 * main one, so we fetch it with all the localizations, then we return the correct title based on user's locale
 * either from the Slovak or the localized version.
 *
 * Differs from the Strapi version as the structure is flatter.
 */
export const getCemeteryInfoInCeremoniesDebtorsMeili = (
  cemetery: CemeteryMeili,
  locale: string,
) => {
  const skCemeteryTitle = cemetery.title
  const skCemeterySlug = cemetery.slug

  const localeCemetery = cemetery.localizations.find(
    (cemeteryInner) => cemeteryInner.locale === locale,
  )
  const localeCemeteryTitle = localeCemetery?.title
  const localeCemeterySlug = localeCemetery?.slug

  return {
    title: localeCemeteryTitle ?? skCemeteryTitle,
    slug: locale === 'sk' ? skCemeterySlug : localeCemeterySlug, // For the title we can fallback for SK version, but not for slug - the link wouldn't work.
  }
}

/**
 * Some ceremonies that are uploaded into strapi belong to cemeteries that are not managed by Marianum
 * These cemeteries are not kept as a relation to a Cemetery entry in strapi, only their name is set via a separate field
 */
export const getCemeteryInfoFromCeremony = (
  ceremony: Maybe<CeremonyEntityFragment>,
  locale: string,
) => {
  if (ceremony?.cemeteryNameIfOutsideMarianum) {
    return { title: ceremony.cemeteryNameIfOutsideMarianum, slug: undefined }
  }

  return ceremony?.cemetery ? getCemeteryInfoInCeremoniesDebtors(ceremony.cemetery, locale) : null
}

export const getCemeteryInfoFromCeremonyMeili = (ceremony: CeremonyMeili, locale: string) => {
  if (ceremony.cemeteryNameIfOutsideMarianum) {
    return { title: ceremony.cemeteryNameIfOutsideMarianum, slug: undefined }
  }

  return getCemeteryInfoInCeremoniesDebtorsMeili(ceremony.cemetery, locale)
}
