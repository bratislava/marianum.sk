import { Strapi } from "@strapi/strapi";
import { readFile, utils } from "xlsx";
import { parseDebtorsXlsx } from "../helpers/parse-debtors-xlsx";
import { getBranchesSlugMap } from "../helpers/get-branches-slug-map";
import { parseCeremoniesXlsx } from "../helpers/parse-ceremonies-xlsx";
import { endOfDay, parse, startOfDay } from "date-fns";

export default {
  debtorsCeremoniesController: ({ strapi }: { strapi: Strapi }) => ({
    async updateDebtors(ctx) {
      const file = ctx.request.files?.file;
      if (!file) {
        ctx.status = 400;
        ctx.body = {
          message: "Chýba súbor.",
        };
        return;
      }

      try {
        const branchesIdMap = await getBranchesSlugMap(strapi, "debtors");

        const parsedDebtors = parseDebtorsXlsx(file.path, branchesIdMap);

        const deleteDebtors = () =>
          strapi.db
            .query("plugin::ceremonies-debtor-list.debtor")
            .deleteMany({});

        await deleteDebtors();

        try {
          for (const debtor of parsedDebtors) {
            // Query Engine API doesn't support relations in bulk options, so Entity Service API is used
            // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.html
            await strapi.entityService.create(
              "plugin::ceremonies-debtor-list.debtor",
              { data: debtor }
            );
          }
        } catch (createDebtorsError) {
          await deleteDebtors();

          throw createDebtorsError;
        }

        ctx.body = `Nahraných ${parsedDebtors.length} dlžníkov.`;
      } catch (e) {
        ctx.status = 400;
        ctx.body = {
          message: e.toString(),
        };
      }
    },
    async updateCeremonies(ctx) {
      const file = ctx.request.files?.file;
      if (!file) {
        ctx.status = 400;
        ctx.body = {
          message: "Chýba súbor.",
        };
        return;
      }

      try {
        const branchesIdMap = await getBranchesSlugMap(strapi, "ceremonies");

        const parsedCeremonies = parseCeremoniesXlsx(file.path, branchesIdMap);

        console.log(parsedCeremonies);

        const deleteFilters = {
          $or: parsedCeremonies.map(({ day }) => {
            const parsedDay = parse(day, "dd.MM.yyyy", new Date());

            return [
              {
                dateTime: {
                  $gte: startOfDay(parsedDay).toISOString(),
                },
              },
              {
                dateTime: {
                  $lt: endOfDay(parsedDay).toISOString(),
                },
              },
            ];
          }),
        };

        const deleteCeremonies = () =>
          strapi.db
            .query("plugin::ceremonies-debtor-list.ceremony")
            .deleteMany({
              filters: deleteFilters,
            });

        await deleteCeremonies();

        try {
          for (const { data: ceremonies } of parsedCeremonies) {
            for (const ceremony of ceremonies) {
              await strapi.entityService.create(
                "plugin::ceremonies-debtor-list.ceremony",
                { data: ceremony }
              );
            }
          }
        } catch (createCeremonyError) {
          await deleteCeremonies();

          throw createCeremonyError;
        }

        const message = parsedCeremonies
          .map(({ day, data }) => `${day} (${data.length})`)
          .join(", ");
        ctx.body = `Nahraných ${message} obradov.`;
      } catch (e) {
        console.error(e);
        ctx.status = 400;
        ctx.body = {
          message: e.toString(),
        };
        return;
      }
    },
  }),
};
