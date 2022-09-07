export const getBranchBySlug = (
  branchSlug: string,
  branchesIdMap: Record<string, number>,
  errorMessage: string
) => {
  if (branchSlug) {
    if (branchSlug in branchesIdMap) {
      return branchesIdMap[branchSlug];
    } else {
      throw new Error(errorMessage);
    }
  }
  return undefined;
};
