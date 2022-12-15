import moment from "moment/moment";
import "moment-timezone";

// Marianum says they cannot show ceremonies older than 3 days, because they might not have consent for it.
// Filtering them while querying is not enough as it would be possible to query them with custom query.
export const removeCeremoniesTask = {
  task: async ({ strapi }) => {
    const olderThanThreeDays = moment
      .tz("Europe/Bratislava")
      .subtract("4", "days")
      .endOf("day");

    await strapi.db.query("api::ceremony.ceremony").deleteMany({
      where: {
        dateTime: {
          $lte: olderThanThreeDays.toISOString(),
        },
      },
    });

    const meilisearch = strapi.plugin("meilisearch").service("meilisearch");

    await meilisearch.updateContentTypeInMeiliSearch({
      contentType: "api::ceremony.ceremony",
    });
  },
  options: {
    rule: "0 0,12 * * *",
    tz: "Europe/Bratislava",
  },
};
