import { NavigateIcon, PlaceIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import RichText from '@components/atoms/RichText'
import Seo from '@components/atoms/Seo'
import BranchCemeteryLayout from '@components/layouts/BranchCemeteryLayout'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import SectionBoxed from '@components/molecules/SectionBoxed'
import OfficeSectionBoxed from '@components/sections/OfficeSectionBoxed'
import { BranchEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { client } from '@services/graphql/gqlClient'
import { isDefined } from '@utils/isDefined'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { ParsedUrlQuery } from 'node:querystring'

type BranchPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: BranchEntityFragment
} & SSRConfig

const BranchPage = ({ navigation, entity, general }: BranchPageProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'BranchCemeteryPage' })

  const { seo, title, address, navigateToLink, description, offices } = entity.attributes ?? {}

  const filteredOffices = offices?.data?.filter(isDefined)

  return (
    <>
      <Seo seo={seo} title={title} />

      <BranchCemeteryLayout entity={entity} navigation={navigation} general={general}>
        <div className="flex flex-col gap-3 md:gap-4">
          <SectionBoxed>
            <h1 className="pb-1 md:pb-3">{title}</h1>
            <div className="flex flex-col items-start gap-2 md:flex-row">
              {address && (
                <div className="flex items-center gap-x-2">
                  <span className="text-primary">
                    <PlaceIcon />
                  </span>
                  {address}
                </div>
              )}
              {navigateToLink && (
                <Button
                  href={navigateToLink}
                  target="_blank"
                  variant="plain-secondary"
                  startIcon={<NavigateIcon />}
                  className="-ml-2 md:ml-0"
                >
                  {t('navigate')}
                </Button>
              )}
            </div>
          </SectionBoxed>
          {description && (
            <SectionBoxed title={t('aboutBranch')}>
              <RichText content={description} coloredTable={false} />
            </SectionBoxed>
          )}
          {filteredOffices?.map((office) => (
            <OfficeSectionBoxed office={office} />
          ))}
        </div>
      </BranchCemeteryLayout>
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', (locale) =>
    client.BranchesStaticPaths({ locale }).then((response) => response.branches?.data),
  )

  // eslint-disable-next-line no-console, @typescript-eslint/restrict-template-expressions
  console.log(`Branches: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BranchPageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating branch ${params?.fullPath.join('/') ?? ''}`)

  return (
    // TODO: Locales
    generateStaticProps({
      locale,
      params,
      entityPromiseGetter: ({ locale: localeInner, slug }) =>
        client
          .BranchBySlug({ locale: localeInner, slug })
          .then((response) => response.branches?.data[0]),
    })
  )
}

export default BranchPage
