// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { BrowserTracing } from '@sentry/tracing' // Must import second

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://6aff3b4117f645ff879023645a2e7ee7@o701870.ingest.sentry.io/6776436',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.05,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps

  integrations: [
    new BrowserTracing({
      /** List of urls where we want to add tracing headers. We generally want to track only requests to the APIs that we control */
      tracingOrigins: [
        'localhost',
        'marianum-strapi.staging.bratislava.sk',
        'marianum-strapi-meilisearch.staging.bratislava.sk',
        // TODO: add production strapi and meilisearch urls here
        /^\//, // everything starting with "/"
      ],
      shouldCreateSpanForRequest: (url) => {
        const isPlausible = url.includes('plausible')

        const conditions = [isPlausible]
        return conditions.every((value) => !value) // make sure every value is false
      },
    }),
  ],
})
