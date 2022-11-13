import { GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { isDefined } from '@utils'
import { ReactNode } from 'react'

import ScrollToTopButton from '../atoms/ScrollToTopButton'
import Footer from '../molecules/Footer/Footer'
import Navigation from '../molecules/Navigation/Navigation'
import NavigationProvider from '../molecules/Navigation/NavigationProvider/NavigationProvider'

type PageWrapperProps = {
  navigation: NavigationItemFragment[]
  header?: ReactNode
  children?: ReactNode
  general: GeneralEntityFragment | null
}

const PageWrapper = ({ navigation, header, children, general }: PageWrapperProps) => {
  return (
    <NavigationProvider navigation={navigation} general={general}>
      <div className="h-full">
        <header>
          <Navigation contact={general?.attributes?.header?.contact?.data} />
          {header}
        </header>

        <main className="bg-background-beige">{children}</main>

        <Footer
          contact={general?.attributes?.contact}
          footer={general?.attributes?.footer}
          socials={general?.attributes?.socials?.filter(isDefined)}
        />

        <ScrollToTopButton />
      </div>
    </NavigationProvider>
  )
}

export default PageWrapper
