import { Branch, Maybe } from '../graphql'

/**
 * As the relation in ceremonies and debtors is always with the Slovak version, we always get the Slovak version as the
 * main one, so we fetch it with all the localizations, then we return the correct title based on user's locale
 * either from the Slovak or the localized version.
 */
export const getBranchTitleInCeremoniesDebtors = (
  // Minimal schema for branch to for this to work with all variants
  branch: {
    attributes?: Maybe<{
      title?: Maybe<string>
      localizations?: Maybe<{
        data?: Maybe<{ attributes?: Maybe<{ locale?: Maybe<string>; title?: Maybe<string> }> }[]>
      }>
    }>
  },
  locale: string,
) => {
  const skBranchTitle = branch?.attributes?.title
  const localeBranchTitle = branch?.attributes?.localizations?.data?.find(
    (innerBranch) => innerBranch?.attributes?.locale === locale,
  )?.attributes?.title

  return localeBranchTitle ?? skBranchTitle
}

export type BranchMeili = Omit<Branch, '__typename' | 'localizations'> & {
  id: string
  localizations: BranchMeili[]
}

/**
 * As the relation in ceremonies and debtors is always with the Slovak version, we always get the Slovak version as the
 * main one, so we fetch it with all the localizations, then we return the correct title based on user's locale
 * either from the Slovak or the localized version.
 *
 * Differs from the Strapi version as the structure is flatter.
 */
export const getBranchTitleInCeremoniesDebtorsMeili = (branch: BranchMeili, locale: string) => {
  const skBranchTitle = branch?.title
  const localeBranchTitle = branch?.localizations.find(
    (branchInner) => branchInner.locale === locale,
  )?.title
  return localeBranchTitle ?? skBranchTitle
}
