import { Maybe } from '../graphql'
import { BranchMeili } from '../types/meiliTypes'

/**
 * As the relation in ceremonies and debtors is always with the Slovak version, we always get the Slovak version as the
 * main one, so we fetch it with all the localizations, then we return the correct title based on user's locale
 * either from the Slovak or the localized version.
 */
export const getBranchInfoInCeremoniesDebtors = (
  // Minimal schema for branch to for this to work with all variants
  branch: {
    attributes?: Maybe<{
      title?: Maybe<string>
      slug?: Maybe<string>
      localizations?: Maybe<{
        data?: Maybe<
          {
            attributes?: Maybe<{
              locale?: Maybe<string>
              title?: Maybe<string>
              slug?: Maybe<string>
            }>
          }[]
        >
      }>
    }>
  },
  locale: string,
) => {
  const skBranchTitle = branch?.attributes?.title
  const skBranchSlug = branch?.attributes?.slug

  const localeBranch = branch?.attributes?.localizations?.data?.find(
    (innerBranch) => innerBranch?.attributes?.locale === locale,
  )?.attributes

  const localeBranchTitle = localeBranch?.title
  const localeBranchSlug = localeBranch?.slug

  return {
    title: localeBranchTitle ?? skBranchTitle,
    slug: locale === 'sk' ? skBranchSlug : localeBranchSlug, // For the title we can fallback for SK version, but not for slug - the link wouldn't work.
  }
}

/**
 * As the relation in ceremonies and debtors is always with the Slovak version, we always get the Slovak version as the
 * main one, so we fetch it with all the localizations, then we return the correct title based on user's locale
 * either from the Slovak or the localized version.
 *
 * Differs from the Strapi version as the structure is flatter.
 */
export const getBranchInfoInCeremoniesDebtorsMeili = (branch: BranchMeili, locale: string) => {
  const skBranchTitle = branch?.title
  const skBranchSlug = branch?.slug

  const localeBranch = branch?.localizations.find((branchInner) => branchInner.locale === locale)
  const localeBranchTitle = localeBranch?.title
  const localeBranchSlug = localeBranch?.slug
  return {
    title: localeBranchTitle ?? skBranchTitle,
    slug: locale === 'sk' ? skBranchSlug : localeBranchSlug, // For the title we can fallback for SK version, but not for slug - the link wouldn't work.
  }
}
