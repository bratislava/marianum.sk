/**
 * asset controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::asset.asset', {
  async listFiletypes() {
    const entries = await strapi.db.query('api::asset.asset').findMany({
      where: { publishedAt: { $notNull: true } },
      populate: ['file'],
    })

    return [...new Set(entries.map((entry) => entry.file?.ext).filter(Boolean))]
  },
})
