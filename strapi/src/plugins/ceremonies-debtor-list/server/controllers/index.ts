import { Strapi } from "@strapi/strapi";
import { parseDebtorsXlsx } from "../helpers/parse-debtors-xlsx";
import { getCemeteriesSlugIdMap } from "../helpers/get-cemeteries-slug-id-map";
import { parseCeremoniesXlsx } from "../helpers/parse-ceremonies-xlsx";
import moment from "moment/moment";
import "moment-timezone";
import { parseDisclosuresXlsx } from "../helpers/parse-disclosures-xlsx";
import { v4 as uuid } from "uuid";

export default {
  importXlsxController: ({ strapi }: { strapi: Strapi }) => ({
    async updateDebtors(ctx) {
      ctx.request.socket.setTimeout(120000);

      const file = ctx.request.files?.file;
      if (!file) {
        ctx.status = 400;
        ctx.body = {
          message: "Chýba súbor.",
        };
        return;
      }

      const meilisearch = strapi.plugin("meilisearch").service("meilisearch");

      try {
        const cemeteriesSlugIdMap = await getCemeteriesSlugIdMap(
          strapi,
          "debtors"
        );

        const importId = uuid();
        const parsedDebtors = parseDebtorsXlsx(
          file.path,
          cemeteriesSlugIdMap,
          importId
        );

        // All the debtors are replaced when a new XLSX is uploaded.
        const deleteDebtors = async () => {
          await strapi.db.query("api::debtor.debtor").deleteMany({});
          // `deleteMany` doesn't trigger Meilisearch hooks, so the old debtors stay in its database,
          // also having Meilisearch on while adding debtors triggers the update content hook after
          // every query, therefore the best solution is to turn the Meilisearch off while adding new debtors
          // and turn it back on afterwards.
          // See `strapi/patches/strapi-plugin-meilisearch+0.7.1.patch`.
          await meilisearch.emptyOrDeleteIndex({
            contentType: "api::debtor.debtor",
          });
        };

        await deleteDebtors();

        try {
          for (const debtor of parsedDebtors) {
            // Query Engine API doesn't support relations in bulk options, so Entity Service API is used.
            // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.html
            await strapi.entityService.create("api::debtor.debtor", {
              data: debtor,
            });
          }
          await meilisearch.updateContentTypeInMeiliSearch({
            contentType: "api::debtor.debtor",
          });
        } catch (createDebtorsError) {
          // In case of failure to add some debtor we want to delete all the previously created entries, so we call the
          // delete function but rethrow the error to be caught by the parent try/catch block.
          await deleteDebtors();

          throw createDebtorsError;
        }

        ctx.body = {
          message: `Nahraných ${parsedDebtors.length} dlžníkov.`,
          importId,
        };
      } catch (e) {
        ctx.status = 400;
        ctx.body = {
          message: e.toString(),
        };
      }
    },
    async updateCeremonies(ctx) {
      ctx.request.socket.setTimeout(120000);

      const file = ctx.request.files?.file;
      if (!file) {
        ctx.status = 400;
        ctx.body = {
          message: "Chýba súbor.",
        };
        return;
      }

      const meilisearch = strapi.plugin("meilisearch").service("meilisearch");

      try {
        const cemeteriesSlugIdMap = await getCemeteriesSlugIdMap(
          strapi,
          "ceremonies"
        );

        const importId = uuid();
        const parsedCeremonies = parseCeremoniesXlsx(
          file.path,
          cemeteriesSlugIdMap,
          importId
        );

        // Only ceremonies in the days that are present in XLSX are deleted and replaced by new one. All the others are
        // kept as they are.
        const deleteFilters = parsedCeremonies.map(({ day }) => {
          const parsedDay = moment.tz(
            day,
            "DD.MM.YYYY",
            true, // Strict mode ensures the date is in correct format.
            "Europe/Bratislava"
          );

          return {
            $and: [
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
            ],
          };
        });

        const olderThanThreeDays = moment
          .tz("Europe/Bratislava")
          .subtract("4", "days")
          .endOf("day");

        // Marianum says they cannot show ceremonies older than 3 days, because they might not have consent for it.
        // Filtering them while querying is not enough as it would be possible to query them with custom query.
        // It's not worth developing a custom scheduled action that does this, so when new entries are uploaded, the
        // ones older than 3 days are removed by this filter.
        const deleteFilterOlderThanThreeDays = {
          dateTime: {
            $lte: olderThanThreeDays.toISOString(),
          },
        };

        const deleteCeremonies = async () => {
          await strapi.db.query("api::ceremony.ceremony").deleteMany({
            where: { $or: [...deleteFilters, deleteFilterOlderThanThreeDays] },
          });
          // `deleteMany` doesn't trigger Meilisearch hooks, so the old ceremonies stay in its database,
          // also having Meilisearch on while adding ceremonies triggers the update content hook after
          // every query, therefore the best solution is to turn the Meilisearch off while adding new ceremonies
          // and turn it back on afterwards.
          // See `strapi/patches/strapi-plugin-meilisearch+0.7.1.patch`.
          await meilisearch.emptyOrDeleteIndex({
            contentType: "api::ceremony.ceremony",
          });
        };

        await deleteCeremonies();

        try {
          for (const { data: ceremonies } of parsedCeremonies) {
            for (const ceremony of ceremonies) {
              // Query Engine API doesn't support relations in bulk options, so Entity Service API is used.
              // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/bulk-operations.html
              await strapi.entityService.create("api::ceremony.ceremony", {
                data: ceremony,
              });
            }
          }

          await meilisearch.updateContentTypeInMeiliSearch({
            contentType: "api::ceremony.ceremony",
          });
        } catch (createCeremonyError) {
          // In case of failure to add some ceremony we want to delete all the previously created entries, so we call the
          // delete function but rethrow the error to be caught by the parent try/catch block.
          await deleteCeremonies();

          throw createCeremonyError;
        }

        const successMessage = parsedCeremonies
          .map(({ day, data }) => `${day} (${data.length})`)
          .join(", ");
        ctx.body = {
          message: `Nahraných ${successMessage} obradov.\nZáznamy staršie ako ${olderThanThreeDays.format(
            "DD.MM.YYYY"
          )} (vrátane) boli vymazané.`,
          importId,
        };
      } catch (e) {
        ctx.status = 400;
        ctx.body = {
          message: e.toString(),
        };
        return;
      }
    },
    async updateDisclosures(ctx) {
      ctx.request.socket.setTimeout(120000);

      const file = ctx.request.files?.file;
      if (!file) {
        ctx.status = 400;
        ctx.body = {
          message: "Chýba súbor.",
        };
        return;
      }

      const meilisearch = strapi.plugin("meilisearch").service("meilisearch");

      try {
        const importId = uuid();
        const parsedDisclosures = parseDisclosuresXlsx(file.path, importId);

        await strapi.db
          .query("api::disclosure.disclosure")
          .createMany({ data: parsedDisclosures });

        // `createMany` doesn't work with Meilisearch, so the update must be triggered manually.
        await meilisearch.updateContentTypeInMeiliSearch({
          contentType: "api::disclosure.disclosure",
        });

        ctx.body = {
          message: `Nahraných ${parsedDisclosures.length} zverejňovaní.`,
          importId,
        };
      } catch (e) {
        ctx.status = 400;
        ctx.body = {
          message: e.toString(),
        };
      }
    },
  }),
};
