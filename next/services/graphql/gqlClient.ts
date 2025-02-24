import { getSdk } from '@graphql'
import { GraphQLClient } from 'graphql-request'
import getConfig from 'next/config'

function isServer() {
  return typeof window === 'undefined'
}

const { serverRuntimeConfig } = getConfig()

// URL becomes full url to strapi on server, but just /graphql (for proxy) on client
const protocol =
  serverRuntimeConfig?.strapiUrl &&
  (serverRuntimeConfig?.strapiUrl.startsWith('http://') ||
    serverRuntimeConfig?.strapiUrl.startsWith('https://'))
    ? ''
    : 'http://'

const buildUrl = (path: string): string =>
  `${
    serverRuntimeConfig?.strapiUrl
      ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${protocol}${serverRuntimeConfig.strapiUrl}`
      : isServer()
        ? ''
        : window.location.origin
  }${path}`

const gql = new GraphQLClient(buildUrl('/graphql'))

export const client = getSdk(gql)
