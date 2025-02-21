export const getCemeteryIdBySlug = (
  cemeterySlug: string,
  cemeteriesSlugIdMap: Record<string, number>,
  errorMessage: string
) => {
  if (cemeterySlug) {
    if (cemeterySlug in cemeteriesSlugIdMap) {
      return cemeteriesSlugIdMap[cemeterySlug];
    } else {
      throw new Error(errorMessage);
    }
  }
  return undefined;
};
