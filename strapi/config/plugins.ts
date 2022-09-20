export default {
  // It's important to enable Navigation plugin first, before GraphQL
  navigation: {
    enabled: true,
    config: {
      additionalFields: [],
      contentTypes: ["api::page.page", "api::branch.branch"],
      contentTypesNameFields: {
        "api::page.page": ["title"],
        "api::branch.branch": ["title"],
      },
      allowedLevels: 2,
      gql: { navigationItemRelated: ["Page", "Branch"] },
    },
  },
  graphql: {
    enabled: true,
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
    config: {
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_ADMIN_API_KEY,
      page: {
        settings: {
          filterableAttributes: ["locale"],
        },
      },
      branch: {
        settings: {
          filterableAttributes: ["locale"],
        },
      },
      article: {
        settings: {
          filterableAttributes: ["locale"],
        },
      },
      bundle: {
        settings: {
          filterableAttributes: ["locale"],
        },
      },
      debtor: {
        settings: {
          filterableAttributes: ["branch.id"],
          searchableAttributes: ["firstName", "lastName"],
          pagination: {
            // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
            maxTotalHits: 10000,
          },
        },
        populateEntryRule: ["branch", "branch.localizations"],
      },
    },
  },
};
