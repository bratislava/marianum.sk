/**
 * The indexes that are used in search are stored in one shared index. This wraps them to have a unified way for search
 * and easily unwrappable structure to be used separately.
 */
const wrapSearchIndexEntry = (type: string, data: any) => {
  // Remove when https://github.com/meilisearch/strapi-plugin-meilisearch/pull/554 merged
  const newData = { ...data };
  delete newData.createdBy;
  delete newData.updatedBy;

  return {
    type,
    id: data.id, // must be present to work correctly
    locale: data.locale,
    // [type] is used instead of "data", to avoid  naming clashes of filterable / sortable / searchable attributes
    [type]: newData,
  };
};

// Because a bug in Meilisearch shared index, only the last added entity's settings are used and the old ones are overwritten
// instead of merging. Therefore, for all entities we must provide shared settings.
const searchIndexSettings = {
  searchableAttributes: [
    // Page
    "page.title",
    // Branch
    "branch.title",
    // Article
    "article.title",
    // Bundle
    "bundle.title",
    // Document
    "document.title",
  ],
  filterableAttributes: [
    // All
    "type",
    // Page + branch + article + bundle
    "locale",
    // Article
    "article.pressCategory",
    "article.pressCategory.id",
    "article.newsCategory",
    "article.newsCategory.id",
    // Document
    "document.documentCategory.id",
    "document.file.ext",
  ],
  sortableAttributes: [
    // Article
    "article.publishedAtTimestamp",
    // Document
    "document.publishedAtTimestamp",
  ],
  pagination: {
    // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
    maxTotalHits: 100000,
  },
};

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
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) => wrapSearchIndexEntry("page", entry),
      },
      branch: {
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) => wrapSearchIndexEntry("branch", entry),
      },
      article: {
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) =>
          wrapSearchIndexEntry("article", {
            ...entry,
            // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
            // use (number) filters.
            publishedAtTimestamp: entry.publishedAt
              ? new Date(entry.publishedAt).getTime()
              : undefined,
          }),
      },
      bundle: {
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) => wrapSearchIndexEntry("bundle", entry),
      },
      debtor: {
        entriesQuery: {
          populate: ["branch", "branch.localizations"],
        },
        settings: {
          filterableAttributes: ["branch.id"],
          searchableAttributes: ["firstName", "lastName"],
          pagination: {
            // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
            maxTotalHits: 10000,
          },
        },
      },
      ceremony: {
        entriesQuery: {
          populate: ["branch", "branch.localizations"],
        },
        settings: {
          filterableAttributes: ["branch.id", "dateTimeTimestamp"],
          searchableAttributes: ["name"],
          pagination: {
            // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
            maxTotalHits: 100000,
          },
        },
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
        indexName: "search_index",
        entriesQuery: {
          locale: "all",
        },
        settings: searchIndexSettings,
        transformEntry: ({ entry }) =>
          wrapSearchIndexEntry("document", {
            ...entry,
            // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
            // use (number) filters.
            publishedAtTimestamp: entry.publishedAt
              ? new Date(entry.publishedAt).getTime()
              : undefined,
          }),
      },
    },
  },
};
