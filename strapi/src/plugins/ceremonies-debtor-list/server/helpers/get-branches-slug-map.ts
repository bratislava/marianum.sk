import { Strapi } from "@strapi/strapi";

export const getBranchesSlugMap = async (
  strapi: Strapi,
  type: "debtors" | "ceremonies"
) => {
  const branches = await strapi.db.query("api::branch.branch").findMany({
    select: ["id", "slug"],
    where: {
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

  return Object.fromEntries(branches.map(({ slug, id }) => [slug, id]));
};
