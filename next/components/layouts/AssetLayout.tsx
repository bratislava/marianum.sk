import { filesize } from 'filesize'
import { useTranslation } from 'next-i18next/pages'
import { Fragment, ReactNode, useMemo } from 'react'

import Button from '@/components/atoms/Button'
import FileIcon from '@/components/atoms/FileIcon'
import FormatDate from '@/components/atoms/FormatDate'
import PageWrapper from '@/components/layouts/PageWrapper'
import SectionsWrapper from '@/components/layouts/SectionsWrapper'
import Section from '@/components/molecules/Section'
import HeroSection from '@/components/sections/HeroSection'
import { AssetEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '@/graphql'

type AssetLayoutProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  asset: AssetEntityFragment
}

const AssetLayout = ({ asset, navigation, general }: AssetLayoutProps) => {
  const { t, i18n } = useTranslation()

  const { title, description, file, publishedAt, assetCategory, slug } =
    asset.attributes ?? {}

  const dlData = useMemo(() => {
    return [
      ...(assetCategory?.data?.attributes
        ? [
            {
              key: 'category',
              title: t('AssetLayout.category'),
              description: assetCategory.data.attributes.title,
            },
          ]
        : []),
      {
        key: 'createdAt',
        title: t('AssetLayout.createdAt'),
        description: (
          <FormatDate value={publishedAt as string} valueType="ISO" format="articlePage" />
        ),
      },
    ] as { key: string; title: string; description: ReactNode }[]
  }, [assetCategory, publishedAt, t])

  const extension = useMemo(() => {
    return file?.data?.attributes?.ext?.slice(1)
  }, [file])

  const size = useMemo(() => {
    return filesize((file?.data?.attributes?.size ?? 0) * 1000, { round: 1, locale: i18n.language })
  }, [file, i18n.language])

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={<HeroSection breadcrumbsMoreItems={[{ label: title, path: slug ?? '' }]} />}
    >
      <SectionsWrapper alternateBackground className="pb-14">
        <Section background="light">
          <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-8">
            <div className="flex size-[96px] shrink-0 items-center justify-center bg-background-beige md:size-[186px]">
              <FileIcon extension={extension} />
            </div>
            <div className="flex flex-col items-center gap-2 text-size-p-small md:items-start">
              <div>
                {t('AssetLayout.createdAt')}{' '}
                <FormatDate value={publishedAt as string} valueType="ISO" format="articlePage" />
              </div>
              <h1>{title}</h1>
              <div className="flex items-center gap-2 text-size-p-small">
                <span>{size}</span>
                <span>•</span>
                <span className="uppercase">{extension}</span>
              </div>
              <Button
                target="_blank"
                href={file?.data?.attributes?.url ?? ''}
                className="mt-4 md:w-fit"
              >
                {t('AssetLayout.downloadFile')}
              </Button>
            </div>
          </div>
        </Section>

        {description ? (
          <Section
            innerClassName="md:pl-[250px] lg:pl-[266px] xl:pl-[294px]"
            title={t('AssetLayout.description')}
            centerTitleOnMobile={false}
          >
            <div className="whitespace-pre-wrap">{description}</div>
          </Section>
        ) : undefined}

        <Section
          innerClassName="md:pl-[250px] lg:pl-[266px] xl:pl-[294px]"
          dividerClassName="md:ml-[218px]"
          title={t('AssetLayout.details')}
          centerTitleOnMobile={false}
        >
          <dl>
            {dlData.map((dItem) => (
              <Fragment key={dItem.key}>
                <dt className="float-left clear-left w-32 not-first:mt-3 after:content-[':']">
                  {dItem.title}
                </dt>
                <dd className="ml-32 not-first:mt-3">{dItem.description}</dd>
              </Fragment>
            ))}
          </dl>
        </Section>
      </SectionsWrapper>
    </PageWrapper>
  )
}

export default AssetLayout
