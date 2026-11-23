import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next/pages'

import { NavigateIcon, PlaceIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import RichText from '@/components/atoms/RichText'
import Seo from '@/components/atoms/Seo'
import BranchCemeteryLayout from '@/components/layouts/BranchCemeteryLayout'
import AssetGroup from '@/components/molecules/AssetGroup'
import ImageGallery from '@/components/molecules/ImageGallery'
import OpeningHours from '@/components/molecules/OpeningHours'
import SectionBoxed from '@/components/molecules/SectionBoxed'
import IframeSection from '@/components/sections/IframeSection'
import { CemeteryEntityFragment, GeneralEntityFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@/services/navigation/generateStaticPathsAndProps'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'

type CemeteryPageProps = {
  general: GeneralEntityFragment | null
  entity: CemeteryEntityFragment
} & SSRConfig &
  NavigationPageProps

const CemeteryPage = ({ entity, general }: CemeteryPageProps) => {
  const { t } = useTranslation()

  const {
    seo,
    title,
    address,
    navigateToLink,
    description,
    overrideOpeningHours,
    gallery,
    video,
    assets,
  } = entity.attributes ?? {}

  return (
    <>
      <Seo seo={seo} title={title} entity={entity} />

      <BranchCemeteryLayout entity={entity} general={general}>
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
              {navigateToLink ? (
                <Button
                  href={navigateToLink}
                  target="_blank"
                  variant="plain-secondary"
                  startIcon={<NavigateIcon />}
                  className="-ml-2 md:ml-0"
                >
                  {t('BranchCemeteryPage.navigate')}
                </Button>
              ) : null}
            </div>
          </SectionBoxed>
          {description ? (
            <SectionBoxed title={t('BranchCemeteryPage.aboutCemetery')}>
              <RichText content={description} coloredTable={false} />
            </SectionBoxed>
          ) : null}
          {general?.attributes?.cemeteryOpeningHours ? (
            <SectionBoxed title={t('BranchCemeteryPage.openingHours')}>
              <OpeningHours
                openingHours={overrideOpeningHours || general?.attributes?.cemeteryOpeningHours}
              />
            </SectionBoxed>
          ) : null}
          {gallery ? (
            <SectionBoxed title={gallery.title ?? undefined}>
              <ImageGallery images={gallery.medias?.data} />
            </SectionBoxed>
          ) : null}
          {video ? (
            <SectionBoxed title={video.title ?? undefined}>
              <IframeSection section={video} variant="short" />
            </SectionBoxed>
          ) : null}
          {assets ? (
            <SectionBoxed title={assets.title ?? undefined}>
              <AssetGroup {...assets} variant="dividers" />
            </SectionBoxed>
          ) : null}
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
    client.CemeteriesStaticPaths({ locale }).then((response) => response.cemeteries?.data),
  )

  // eslint-disable-next-line no-console,@typescript-eslint/restrict-template-expressions
  console.log(`Cemeteries: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<CemeteryPageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating cemetery ${params?.fullPath.join('/') ?? ''}`)

  return (
    // TODO: Locales
    generateStaticProps({
      locale,
      params,
      entityPromiseGetter: ({ locale: localeInner, slug }) =>
        client
          .CemeteryBySlug({ locale: localeInner, slug })
          .then((response) => response.cemeteries?.data[0]),
    })
  )
}

export default CemeteryPage
