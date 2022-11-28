import ScrollToTopButton from '@components/atoms/ScrollToTopButton'
import Footer from '@components/molecules/Footer/Footer'
import Navigation from '@components/molecules/Navigation/Navigation'
import NavigationProvider from '@components/molecules/Navigation/NavigationProvider/NavigationProvider'
import { GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { isDefined } from '@utils/isDefined'
import { ReactNode } from 'react'

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
          contact={general?.attributes?.address}
          footer={general?.attributes?.footer}
          socials={general?.attributes?.socials?.filter(isDefined)}
        />

        <ScrollToTopButton />
      </div>
    </NavigationProvider>
  )
}

export default PageWrapper
