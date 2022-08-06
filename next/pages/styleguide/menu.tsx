import React from 'react'
import useSWR from 'swr'

import { client } from '../../utils/gql'

const Menu = () => {
  const { data } = useSWR(['UpcomingEvents'], () => client.Navigation())
  const navigation = data?.renderNavigation

  const json = JSON.stringify(navigation)

  return <div>{json}</div>
}

export default Menu
