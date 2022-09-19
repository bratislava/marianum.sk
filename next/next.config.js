const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  images: {
    domains: ['localhost', 'cdn-api.bratislava.sk'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Graphql Proxy
        {
          source: '/graphql',
          destination: `${process.env.STRAPI_URL}/graphql`,
        },
        // Media proxy for getting media from Strapi
        {
          source: '/uploads/:file',
          destination: `${process.env.STRAPI_URL}/uploads/:file`,
        },
        /**
         * Rewrites to make the the URLs and translation of URLs work. Based on an approached outlined here:
         * https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js/68731057#68731057
         */

        // TODO add english equivalents
        {
          source: '/vyhladavanie',
          destination: '/search',
        },
        {
          source: '/aktuality/novinky/:slug',
          destination: '/articles/:slug',
        },
        {
          source: '/o-nas/pre-media/:slug',
          destination: '/articles/:slug',
        },
        {
          source: '/sluzby/pohrebna-sluzba/balicky-pohrebov/:slug',
          destination: '/bundles/:slug',
        },
        {
          source: '/o-nas/kontakty/:slug',
          destination: '/branches/:slug',
        },
        {
          source: '/o-nas/cintoriny-v-sprave/:slug',
          destination: '/branches/:slug',
        },
        {
          source: '/o-nas/dokumenty/:slug',
          destination: '/documents/:slug',
        },
        {
          source: '/o-nas/dokumenty/legislativa/:slug',
          destination: '/documents/:slug',
        },
      ],
    }
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
}

module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    ...nextConfig,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  }
}
