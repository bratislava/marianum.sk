import { client } from '@services/graphql/gqlClient'

export const upcomingCeremoniesSwrKey = 'UpcomingCeremonies'

export const upcomingCeremoniesFetcher = () => {
  const dateTime = new Date()
  // I think we also want to display ongoing ceremonies, 2 hours seems like a reasonable time.
  dateTime.setHours(dateTime.getHours() - 2)

  return client.HomepageCeremonies({ dateTime })
}

export const upcomingCeremoniesPrefetch = {
  sectionTypename: 'ComponentSectionsUpcomingCeremoniesSection',
  key: upcomingCeremoniesSwrKey,
  fetcher: () => upcomingCeremoniesFetcher(),
} as const
