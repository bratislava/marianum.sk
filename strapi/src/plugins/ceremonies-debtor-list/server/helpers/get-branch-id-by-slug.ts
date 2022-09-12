export const getBranchIdBySlug = (
  branchSlug: string,
  branchesSlugIdMap: Record<string, number>,
  errorMessage: string
) => {
  if (branchSlug) {
    if (branchSlug in branchesSlugIdMap) {
      return branchesSlugIdMap[branchSlug];
    } else {
      throw new Error(errorMessage);
    }
  }
  return undefined;
};
