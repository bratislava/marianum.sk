/**
 *  document controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::document.document", {
  async listFiletypes() {
    const entries = await strapi.db.query("api::document.document").findMany({
      where: { publishedAt: { $notNull: true } },
      populate: ["file"],
    });

    return [
      ...new Set(entries.map((entry) => entry.file?.ext).filter(Boolean)),
    ];
  },
});
