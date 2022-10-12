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
          filterableAttributes: [
            "pressCategory.id",
            "newsCategory.id",
            "locale",
          ],
          searchableAttributes: ["title"],
          sortableAttributes: ["publishedAtTimestamp"],
          pagination: {
            // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
            maxTotalHits: 10000,
          },
        },
        transformEntry({ entry }) {
          return {
            ...entry,
            // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
            // use (number) filters.
            publishedAtTimestamp: entry.publishedAt
              ? new Date(entry.publishedAt).getTime()
              : undefined,
          };
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
      ceremony: {
        settings: {
          filterableAttributes: ["branch.id", "dateTimeTimestamp"],
          searchableAttributes: ["name"],
          pagination: {
            // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
            maxTotalHits: 100000,
          },
        },
        populateEntryRule: ["branch", "branch.localizations"],
        transformEntry({ entry }) {
          return {
            ...entry,
            // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
            // use (number) filters.
            dateTimeTimestamp: entry.dateTime
              ? new Date(entry.dateTime).getTime()
              : undefined,
          };
        },
      },
      document: {
        settings: {
          filterableAttributes: ["documentCategory.id", "file.ext"],
          searchableAttributes: ["title"],
          sortableAttributes: ["publishedAtTimestamp"],
          pagination: {
            // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
            maxTotalHits: 10000,
          },
        },
        transformEntry({ entry }) {
          return {
            ...entry,
            // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
            // use (number) filters.
            publishedAtTimestamp: entry.publishedAt
              ? new Date(entry.publishedAt).getTime()
              : undefined,
          };
        },
      },
    },
  },
};
