import React from 'react'
import useSWR from 'swr'

import Navigation from '../../components/molecules/Navigation/Navigation'
import { client } from '../../utils/gql'

const Menu = () => {
  const { data } = useSWR(['UpcomingEvents'], () => client.Navigation())
  const nav = data?.renderNavigation

  const json = JSON.stringify(nav)

  return (
    <>
      <Navigation
        phoneNumber="+421 901 111 222"
        faqLink="#faq"
        navigationItems={[
          {
            key: 'vybavenie-pohrebu',
            label: 'Vybavenie pohrebu',
            link: '#',
            items: [
              { key: 'asdc', label: 'Label', link: '#' },
              { key: 'asdc', label: 'Label', link: '#' },
              {
                key: 'asdc',
                label: 'Label',
                link: '#',
                items: [
                  { key: 'asdc', label: 'Label', link: '#' },
                  { key: 'asdc', label: 'Label', link: '#' },
                  { key: 'asdc', label: 'Label', link: '#' },
                ],
              },
              { key: 'asdc', label: 'Label', link: '#' },
              { key: 'asdc', label: 'Label', link: '#' },
            ],
          },
          { key: 'sluzby', label: 'Sluzby', link: '#' },
          { key: 'aktuality', label: 'Aktuality', link: '#' },
          { key: 'o-nas', label: 'O nas', link: '#' },
        ]}
      />
      <div>{json}</div>
    </>
  )
}

export default Menu
