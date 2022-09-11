import { Strapi } from "@strapi/strapi";

export const getBranchesSlugIdMap = async (
  strapi: Strapi,
  type: "debtors" | "ceremonies"
) => {
  const branches = await strapi.db.query("api::branch.branch").findMany({
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

  console.log(branches);

  return Object.fromEntries(branches.map(({ slug, id }) => [slug, id]));
};
