import { ReactNode } from 'react'

import { GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import Footer from '../molecules/Footer/Footer'
import Navigation from '../molecules/Navigation/Navigation'
import NavigationProvider from './NavigationProvider'

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
          social={general?.attributes?.social}
        />
      </div>
    </NavigationProvider>
  )
}

export default PageWrapper
