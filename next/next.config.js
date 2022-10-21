const { i18n } = require('./next-i18next.config')
const { withSentryConfig } = require('@sentry/nextjs')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  images: {
    domains: ['localhost', 'cdn-api.bratislava.sk'],
  },
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
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
  async redirects() {
    return [
      {
        source: '/marianum/cat/news/zoznam-obradov',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/',
        destination: '/',
        permanent: false,
      },
      {
        source: '/marianum/informacie/informacia-krematorium',
        destination: '/o-nas/marianum-krematorium',
        permanent: false,
      },
      {
        source: '/marianum/hrobove-miesto',
        destination: '/vybavenie-pohrebu/hrobove-miesto',
        permanent: false,
      },
      {
        source: '/marianum/cennik',
        destination: '/marianum/cennik',
        permanent: false,
      },
      {
        source: '/marianum/kontakt',
        destination: '/o-nas/kontakt',
        permanent: false,
      },
      {
        source: '/marianum/postup-pri-umrti',
        destination: '/vybavenie-pohrebu/navod-ako-postupovat',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/aktuality',
        destination: '/vybavenie-pohrebu/hrobove-miesto',
        permanent: false,
      },
      {
        source: '/marianum/truhly',
        destination: '/sluzby/rakvy',
        permanent: false,
      },
      {
        source: '/marianum/kvety/',
        destination: '/sluzby/kvety',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/obmedzenie-pritomosti-osob-na-pohrebnych-obradoch-a-uzatvorenie-administrativnych-pracovisk-marianum-covid-19',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },

      {
        source: '/marianum/nove-hrobove-miesto',
        destination: '/vybavenie-pohrebu/hrobove-miesto',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznam-krematorium',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/obmedzenie-vstupu-osob-do-domov-smutku-a-obmedzenie-otvaracich-hodin-na-cintorinoch-v-sprave-organizacie-marianum-pohrebnictvo-mesta-bratislavy',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/podmienky-pre-vstup-do-obradnej-sienedomu-smutku',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/transparentne-zverejnovanie',
        destination: '/o-nas/uradna-tabula',
        permanent: false,
      },
      {
        source: '/marianum/informacie/aktualne-volne-pracovne-pozicie',
        destination: '/o-nas/kariera',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/legislativa',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source: '/marianum/informacie/otvaracie-hodiny-pocas-vianocnych-sviatkov',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-08-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-07-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-10-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-05-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-04-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-31-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-06-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-15-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-30-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-07-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-15-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-07-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-20-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/dokumenty-na-stiahnutie',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-13-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-24-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-03-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-16-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-29-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-17-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-18-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-29-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-31-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-04-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-28-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-15-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-18-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-17-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-01-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-27-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-18-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-19-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-12-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-11-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-08-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-10-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-11-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-09-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-28-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-28-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-04-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-24-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-09-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-16-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-02-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-08-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-07-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-20-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-30-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/vox-populi',
        destination: '/sluzby/doplnkove-sluzby',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-10-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-24-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-01-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-13-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/nova-sluzba-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dorucovanie-kytic-vencov-a-ikeban-k-pohrebnemu-obradu-a-k-hrobovemu-miestu',
        destination: '/sluzby',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-19-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-10-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-13-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-27-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-11-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-15-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-03-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-08-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-20-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-01-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-02-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-09-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-03-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-17-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-24-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-02-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-12-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2022',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-12-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-05-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-16-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-03-01-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-20-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-29-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-11-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-08-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-11-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-19-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-04-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-05-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-07-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-20-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-06-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-19-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-28-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-04-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-06-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-29-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-17-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-03-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-03-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-13-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-09-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-12-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-30-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-10-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-19-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-08-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-02-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-09-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-06-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-08-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-27-12-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-27-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-27-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-01-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-27-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-16-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-28-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-30-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-02-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-18-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-10-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-29-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-28-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-20-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-17-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-27-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zoznam-neplaticov-za-najom-hroboveho-miesta',
        destination: '/sluzby/hrobove-miesto/zoznam-neplaticov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-05-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-11-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/sprava-majetku',
        destination: '/aktuality/sprava-majetku',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-12-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-22-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-31-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-01-08-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-12-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-04-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-02-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-28-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-24-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-07-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-06-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/verejne-obstaravanie',
        destination: '/o-nas/dokumenty-a-zverejnovanie/verejne-obstaravanie',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-24-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-07-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-19-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-01-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-31-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/informacia-sprava-cintorinov',
        destination: '/o-nas/cintoriny-v-sprave',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-29-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-30-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-01-07-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-15-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-13-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-18-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },

      {
        source: '/marianum/informacie/ziadosti-na-stiahnutie',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-16-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-14-04-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/umrtie-blizkej-osoby/kontaky',
        destination: '/o-nas/kontakty',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-02-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/informacie-v-zmysle-zakona',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/informacie/uprimne-podakovanie',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/nekrolog',
        destination: '/sluzby/doplnkove-sluzby',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-25-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/prevadzkovy-poriadok',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-13-06-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-17-05-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznam-vystraha-pred-vetrom',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznam-docasne-zatvorene-vybavovacie-kancelarie-v-krematoriu',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/poskodeny-slavin-a-jeho-obnova',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source: '/marianum/kontakt.php',
        destination: '/o-nas/kontakty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2021',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-10-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/nove-pobocky-sprava-cintorinov-a-pohrebna-sluzba-na-cintorine-vrakuna',
        destination: '/o-nas/cintoriny-v-sprave',
        permanent: false,
      },
      {
        source: '/marianum/informacie/interne-predpisy',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source: '/marianum/informacie/podakovanie',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-19-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/podmienky-vstupu-do-obradnej-siene-pocas-poslednej-rozlucky',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-29-06-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },

      {
        source: '/marianum/informacie/profil-verejneho-obstaravatela',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/1-62022-skratene-otvaracie-hodiny-spravy-cintorinov',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-pohrebnych-obradov-v-krematoriu-a-na-cintorinoch-v-sprave-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-21-05-2020',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/ceny-prenajmov-a-ceny-predbeznej-odplaty-za-vecne-bremeno',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznam-zakaz-zapalovania-sviecok-na-cintorinoch',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/poslat-kondolenciu',
        destination: '/sluzby/doplnkove-sluzby',
        permanent: false,
      },
      {
        source: '/marianum/informacie/kvetinarstvo-marianum-vydaj-objednavok',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/umrtie-blizkej-osoby/ako-postupovat-pri-dedicskom-konani',
        destination: '/vybavenie-pohrebu/navod-ako-postupovat',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/sluzby/doplnkove-sluzby/vzor-parte',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/platnost-opatreni-vydanych-organizaciou-marianum-pohrebnictvo-mesta-bratislavy-s-suvislosti-s-hrozbou-covid-19',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/uprava-komunikacii-na-cintorinoch',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source: '/marianum/informacie/predaj-a-prenajom-majetku-prenajom-ploch-pocas-velkej-noci',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/informacia-o-zmene-otvaracich-hodin-spravy-cintorinov-organizacie',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-pohrebnych-obradov-v-krematoriu-a-na-cintorinoch-v-sprave-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-04-02-2020',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/obnoveny-dom-smutku-na-martinskom-cintorine-uz-opat-sluzi-pohrebnym-obradom',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/otvaracie-hodiny-vybavovacich-kancelarii',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-04-08-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/logotyp-na-stiahnutie',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source: '/marianum/informacie/predaj-a-prenajom-majetku',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/prirodne-pochovavanie',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/obmedzenia-tykajuce-sa-ochorenia-covid-19',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/ochrana-osobnych-udajov-v-podmienkach-organizacie-marianum-pohrebnictvo-mesta-bratislavy',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zakon-o-pohrebnictve',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-pohrebnych-obradov-v-krematoriu-a-na-cintorinoch-v-sprave-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-10-2020',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/umrtie-blizkej-osoby/poslat-parte',
        destination: '/sluzby/doplnkove-sluzby/vzor-parte',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vyzvy-zakazky-s-nizkou-hodnotou',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-13-01-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      // {
      //   source: '/index.php?ids1=katalog&amp;ids2=Katalog-rakiev-1',
      //   destination: '/sluzby/katalog-produktov',
      //   permanent: false,
      // },
      {
        source: '/index.php',
        destination: '/',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vseobecne-obchodne-podmienky-pre-dodavatelov',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source: '/marianum/informacie/virtualna-prehliadka-nkp-slavin',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/kontakt-cintoriny',
        destination: '/o-nas/kontakty',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/otvorenie-obradnej-siene-a-virtualna-prehliadka-pamatnika-slavin',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/separovany-odpad-na-cintorine-vrakuna',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/informacie-o-spracuvani-osobnych-udajov-v-suvislosti-s-vykonom-hromadneho-podujatia-pohrebneho-obradu',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-pohrebnych-obradov-v-krematoriu-a-na-cintorinoch-v-sprave-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-23-10-2020',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vyjadrenie-vdaky',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznamenie',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznam-vystraha-pred-vetrom-neodporucame-pohyb-po-cintorinoch',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/kvety-na-zelanie',
        destination: '/sluzby/katalog-produktov/kvety',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-09-11-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/smernica-organizacie-marianum-pohrebnictvo-mesta-bratislava-o-verejnom-obstaravani',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },

      {
        source: '/marianum/cat.php',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/informacie/odpoved-na-podnet-bez-spatnej-adresy',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/register-darov-organizacii',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/bratislava-raz-predbehla-vieden-instalacia-informacnych-dotykovych-panelov-na-vyhladavanie-hrobovych-miest',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vseobecne-zavazne-nariadenie-vzn-c-2-2015',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/',
        permanent: false,
      },
      {
        source: '/marianum/informacie/obchodne-verejne-sutaze',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zriadovacia-listina',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/informacie/kodex-pohrebnictva',
        destination: '/o-nas/dokumenty-a-zverejnovanie/legislativa',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vyhlasenie-verejnej-obchodnej-sutaze',
        destination: '/o-nas/dokumenty-a-zverejnovanie/verejne-obstaravanie',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmena-otvaracich-hodin-sprava-cintorinov',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/archiv-obstaravani',
        destination: '/o-nas/dokumenty-a-zverejnovanie/verejne-obstaravanie',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/opatrenia-vydane-organizaciou-marianum-pohrebnictvo-mesta-bratislavy-v-suvislosti-s-hrozbou-covid-19',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/sutazna-vyzva-nove-logo-a-spracovanie-dizajn-manualu-marianum',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/pohrebne-obrady-pod-pristreskami-na-priestranstvach-pri-domoch-smutku',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/oznam-zatvorene-vybavovacie-kancelarie-v-krematoriu-dna-22-10-2021',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-14-10-2021',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/opatovne-podakovanie-za-poskytovane-sluzby',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/aktualne-platne-opatrenia',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2019',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznam-kratkodoby-najom',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/',
        permanent: false,
      },
      {
        source: '/marianum/informacie/aktualita-nkp-slavin',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-09-04-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/dakovne-slova-od-klientov-vzdy-potesia',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/aktualita',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zahajenie-prac-na-rozsirovani-cintorina-raca',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-pohrebnych-obradov-v-krematoriu-a-na-cintorinoch-v-sprave-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-26-08-2020',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-24-09-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/covid-19-a-ochrana-pred-touto-nakazou-v-pohrebnictve-mesta-bratislavy',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/priestory-na-prenajom',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-14-05-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/oznam-o-obmedzeni-vjazdu-vozidiel-do-arealu-cintorinov-2017',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/novovymenovany-velvyslanec-ruskej-federacie-na-slovensku-navstivil-v-doprovode-riaditela-slavin',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/reakcia-konkurencie-na-opatrenia-v-suvislosti-s-covid-19-vydanych-organizaciou-marianum-pohrebnictvo-mesta-bratislavy',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-7-03-2022',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        destination: '/o-nas/dokumenty-a-zverejnovanie',
        permanent: false,
      },
      {
        source: '/marianum/informacie/rezim-na-cintorinoch-a-v-krematoriu-pocas-dusiciek',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source: '/marianum/cat.php',
        destination: '/',
        permanent: false,
      },
      {
        source: '/marianum/hrobove-miesto.php',
        destination: '/sluzby/hrobove-miesto',
        permanent: false,
      },
      {
        source: '/marianum/informacie/poskytnuta-asignacia-casti-dane-z-prijmu',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2020',
        destination: '/aktuality/novinky',
        permanent: false,
      },

      {
        source:
          '/marianum/informacie/zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-zo-dna-22-01-2021',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie.php',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/nove-ozvucenie-v-krematoriu-bude-sluzit-aj-tym-ktori-sa-nemozu-dostat-do-obradnej-miestnosti',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/podakovanie-za-poskytnute-sluzby',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/sprava-cintorinov-a-kvetinarstvo-dna-24-22022-zatvorene',
        destination: '/aktuality/novinky',
        permanent: false,
      },
    ]
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const config = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    ...nextConfig,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })

      // pdf worker must be available through url
      // => so we have to copy it from node_modules to public folder
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: require.resolve('pdfjs-dist/build/pdf.worker.min.js'),
              to: path.join(__dirname, 'public'),
            },
          ],
        }),
      )

      return config
    },
  }
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(config, sentryWebpackPluginOptions)
