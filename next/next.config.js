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
        source: '/index.php',
        has: [{ type: 'query', key: 'ids1', value: 'katalog' }],
        destination: '/sluzby/katalog-produktov',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        has: [{ type: 'query', key: 'cat', value: 'news/aktuality' }],
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        has: [{ type: 'query', key: 'cat', value: 'news/zoznam-obradov' }],
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        has: [{ type: 'query', key: 'cat', value: 'news/informacie-v-zmysle-zakona' }],
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        has: [{ type: 'query', key: 'cat', value: 'news/transparentne-zverejnovanie' }],
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        has: [{ type: 'query', key: 'cat', value: 'news/legislativa' }],
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat.php',
        has: [{ type: 'query', key: 'cat', value: 'news/vox-populi' }],
        destination: '/o-nas/referencie',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/aktuality',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/dokumenty-na-stiahnutie',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/informacie-v-zmysle-zakona',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/legislativa',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/sprava-majetku',
        destination: '/aktuality/sprava-majetku',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/transparentne-zverejnovanie',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/verejne-obstaravanie',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/vox-populi',
        destination: '/o-nas/referencie',
        permanent: false,
      },
      {
        source: '/marianum/cat/news/zoznam-obradov',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/cennik',
        destination: '/sluzby/cennik',
        permanent: false,
      },
      {
        source: '/marianum/hrobove-miesto',
        destination: '/sluzby/hrobove-miesto',
        permanent: false,
      },
      {
        source: '/marianum/hrobove-miesto.php',
        destination: '/sluzby/hrobove-miesto',
        permanent: false,
      },
      {
        source: '/marianum/informacie',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie.php',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source: '/marianum/informacie/:slug',
        destination: '/aktuality/novinky',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/:slug(zoznam-obradov-organizacie-marianum-pohrebnictvo-mesta-bratislavy-dna-\\d{2}-\\d{2}-\\d{4})',
        destination: '/aktuality/zoznam-obradov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/1-62022-skratene-otvaracie-hodiny-spravy-cintorinov',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source: '/marianum/informacie/archiv-obstaravani',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/informacia-krematorium',
        destination: '/o-nas/cintoriny-v-sprave/krematorium-bratislava',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/informacia-o-zmene-otvaracich-hodin-spravy-cintorinov-organizacie',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source: '/marianum/informacie/informacia-sprava-cintorinov',
        destination: '/o-nas/cintoriny-v-sprave',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/informacie-o-spracuvani-osobnych-udajov-v-suvislosti-s-vykonom-hromadneho-podujatia-pohrebneho-obradu',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/interne-predpisy',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/kodex-pohrebnictva',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/kvety-na-zelanie',
        destination: '/sluzby/katalog-produktov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/logotyp-na-stiahnutie',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/nove-pobocky-sprava-cintorinov-a-pohrebna-sluzba-na-cintorine-vrakuna',
        destination:
          '/aktuality/novinky/nove-pobocky-spravy-cintorinov-a-pohrebna-sluzba-na-cintorine-vrakuna',
        permanent: false,
      },
      {
        source: '/marianum/informacie/obchodne-verejne-sutaze',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/ochrana-osobnych-udajov-v-podmienkach-organizacie-marianum-pohrebnictvo-mesta-bratislavy',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/otvaracie-hodiny-pocas-vianocnych-sviatkov',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source: '/marianum/informacie/otvaracie-hodiny-vybavovacich-kancelarii',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source: '/marianum/informacie/poskodeny-slavin-a-jeho-obnova',
        destination: '/aktuality/novinky/poskodeny-slavin-a-jeho-obnova',
        permanent: false,
      },
      {
        source: '/marianum/informacie/prevadzkovy-poriadok',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source:
          '/marianum/informacie/smernica-organizacie-marianum-pohrebnictvo-mesta-bratislava-o-verejnom-obstaravani',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/sprava-cintorinov-a-kvetinarstvo-dna-24-22022-zatvorene',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vseobecne-obchodne-podmienky-pre-dodavatelov',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vseobecne-zavazne-nariadenie-vzn-c-2-2015',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/vyhlasenie-verejnej-obchodnej-sutaze',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zakon-o-pohrebnictve',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/ziadosti-na-stiahnutie',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmena-otvaracich-hodin-sprava-cintorinov',
        destination: '/o-nas/otvaracie-hodiny',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2019',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2020',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2021',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zmluvy-faktury-objednavky-2022',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zoznam-neplaticov-za-najom-hroboveho-miesta',
        destination: '/sluzby/hrobove-miesto/zoznam-neplaticov',
        permanent: false,
      },
      {
        source: '/marianum/informacie/zriadovacia-listina',
        destination: '/o-nas/dokumenty',
        permanent: false,
      },
      {
        source: '/marianum/kontakt',
        destination: '/o-nas/kontakt',
        permanent: false,
      },
      {
        source: '/marianum/kontakt-cintoriny',
        destination: '/o-nas/kontakty',
        permanent: false,
      },
      {
        source: '/marianum/kontakt.php',
        destination: '/o-nas/kontakty',
        permanent: false,
      },
      {
        source: '/marianum/kvety/',
        destination: '/sluzby/katalog-produktov',
        permanent: false,
      },
      {
        source: '/marianum/nove-hrobove-miesto',
        destination: '/sluzby/hrobove-miesto',
        permanent: false,
      },
      {
        source: '/marianum/poslat-kondolenciu',
        destination: '/sluzby',
        permanent: false,
      },
      {
        source: '/marianum/postup-pri-umrti',
        destination: '/vybavenie-pohrebu/navod-ako-postupovat',
        permanent: false,
      },
      {
        source: '/marianum/truhly',
        destination: '/sluzby/katalog-produktov',
        permanent: false,
      },
      {
        source: '/umrtie-blizkej-osoby/ako-postupovat-pri-dedicskom-konani',
        destination: '/vybavenie-pohrebu/navod-ako-postupovat',
        permanent: false,
      },
      {
        source: '/umrtie-blizkej-osoby/kontaky',
        destination: '/o-nas/kontakty',
        permanent: false,
      },
      {
        source: '/umrtie-blizkej-osoby/poslat-parte',
        destination: '/sluzby',
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
