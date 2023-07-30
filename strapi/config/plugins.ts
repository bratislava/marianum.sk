import meilisearchConfig from "./plugins.meilisearch.config";

export default {
  // It's important to enable Navigation plugin first, before GraphQL
  navigation: {
    enabled: true,
    config: {
      additionalFields: [],
      contentTypes: ["api::page.page"],
      contentTypesNameFields: {
        "api::page.page": ["title"],
      },
      allowedLevels: 2,
      gql: { navigationItemRelated: ["Page"] },
    },
  },
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 100,
      generateArtifacts: true,
      artifacts: {
        // When changing schema path, also change watchIgnoreFiles in strapi/config/admin.js
        schema: true,
      },
    },
  },
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  "ceremonies-debtor-list": {
    enabled: true,
    resolve: "./src/plugins/ceremonies-debtor-list",
  },
  meilisearch: {
    config: meilisearchConfig,
  },
};
