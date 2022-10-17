import { client } from '../gql'

export const getReviewsFetcher = (locale: string) => () => client.Reviews({ locale })
