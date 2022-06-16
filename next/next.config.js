/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Graphql Proxy
        {
          source: '/graphql',
          destination: `http://${process.env.STRAPI_URL}/graphql`,
        },
        // Media proxy for getting media from Strapi
        {
          source: '/uploads/:file',
          destination: `http://${process.env.STRAPI_URL}/uploads/:file`,
        },
      ],
    }
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
}

module.exports = nextConfig
