import { Strapi } from "@strapi/strapi";
import { parseDebtorsXlsx } from "../helpers/parse-debtors-xlsx";
import { getBranchesSlugIdMap } from "../helpers/get-branches-slug-id-map";
import { parseCeremoniesXlsx } from "../helpers/parse-ceremonies-xlsx";
import moment from "moment/moment";
import "moment-timezone";

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
        const branchesSlugIdMap = await getBranchesSlugIdMap(strapi, "debtors");

        const parsedDebtors = parseDebtorsXlsx(file.path, branchesSlugIdMap);

        // All the debtors are replaced when a new XLSX is uploaded.
        const deleteDebtors = () =>
          strapi.db
            .query("plugin::ceremonies-debtor-list.debtor")
            .deleteMany({});

        await deleteDebtors();

        try {
          for (const debtor of parsedDebtors) {
            // Query Engine API doesn't support relations in bulk options, so Entity Service API is used.
            // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.html
            await strapi.entityService.create(
              "plugin::ceremonies-debtor-list.debtor",
              { data: debtor }
            );
          }
        } catch (createDebtorsError) {
          // In case of failure to add some debtor we want to delete all the previously created entries, so we call the
          // delete function but rethrow the error to be caught by the parent try/catch block.
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
        const branchesSlugIdMap = await getBranchesSlugIdMap(
          strapi,
          "ceremonies"
        );

        const parsedCeremonies = parseCeremoniesXlsx(
          file.path,
          branchesSlugIdMap
        );

        // Only ceremonies in the days that are present in XLSX are deleted and replaced by new one. All the others are
        // kept as they are.
        const deleteFilters = {
          $or: parsedCeremonies.map(({ day }) => {
            const parsedDay = moment.tz(day, "dd.MM.yyyy", "Europe/Bratislava");

            return [
              {
                dateTime: {
                  $gte: parsedDay.startOf("day").toISOString(),
                },
              },
              {
                dateTime: {
                  $lt: parsedDay.endOf("day").toISOString(),
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
              // Query Engine API doesn't support relations in bulk options, so Entity Service API is used.
              // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.html
              await strapi.entityService.create(
                "plugin::ceremonies-debtor-list.ceremony",
                { data: ceremony }
              );
            }
          }
        } catch (createCeremonyError) {
          // In case of failure to add some ceremony we want to delete all the previously created entries, so we call the
          // delete function but rethrow the error to be caught by the parent try/catch block.
          await deleteCeremonies();

          throw createCeremonyError;
        }

        const successMessage = parsedCeremonies
          .map(({ day, data }) => `${day} (${data.length})`)
          .join(", ");
        ctx.body = `Nahraných ${successMessage} obradov.`;
      } catch (e) {
        ctx.status = 400;
        ctx.body = {
          message: e.toString(),
        };
        return;
      }
    },
  }),
};