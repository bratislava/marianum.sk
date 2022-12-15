/**
 * application controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::application.application", {
  async createApplicationCustom(ctx) {
    console.log(ctx);
  },
});
