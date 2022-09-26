import { client } from '../gql'

export const upcomingCeremoniesFetcher = () => {
  const dateTime = new Date()
  // I think we also want to display ongoing ceremonies, 2 hours seems like a reasonable time.
  dateTime.setHours(dateTime.getHours() - 2)

  return client.HomepageCeremonies({ dateTime })
}
