import { Strapi } from "@strapi/strapi";

export const getCemeteriesSlugIdMap = async (
  strapi: Strapi,
  type: "debtors" | "ceremonies"
) => {
  const cemeteries = await strapi.db.query("api::cemetery.cemetery").findMany({
    select: ["id", "slug"],
    where: {
      locale: "sk", // The entities must be matched with Slovak versions only to work properly.
      ...(type === "debtors"
        ? {
            allowInDebtors: {
              $eq: true,
            },
          }
        : {}),
      ...(type === "ceremonies"
        ? {
            allowInCeremonies: {
              $eq: true,
            },
          }
        : {}),
    },
  });

  console.log(cemeteries);

  return Object.fromEntries(cemeteries.map(({ slug, id }) => [slug, id]));
};
