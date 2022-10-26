import filesize from 'filesize'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { Fragment, ReactNode, useMemo, useState } from 'react'

import {
  DocumentEntityFragment,
  GeneralEntityFragment,
  NavigationItemFragment,
} from '../../graphql'
import Button from '../atoms/Button'
import FileIcon from '../atoms/FileIcon'
import FormatDate from '../atoms/FormatDate'
import Section from '../molecules/Section'
import HeroSection from '../sections/HeroSection'
import PageWrapper from './PageWrapper'
import SectionsWrapper from './SectionsWrapper'

type DocumentLayoutProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  document: DocumentEntityFragment
}

const DocumentLayout = ({ document, navigation, general }: DocumentLayoutProps) => {
  const { t, i18n } = useTranslation()

  const { title, description, file, publishedAt, documentCategory, slug } =
    document.attributes ?? {}

  const dlData = useMemo(() => {
    return [
      ...(documentCategory?.data?.attributes
        ? [
            {
              key: 'category',
              title: t('layouts.DocumentLayout.category'),
              description: documentCategory.data.attributes.title,
            },
          ]
        : []),
      {
        key: 'createdAt',
        title: t('layouts.DocumentLayout.createdAt'),
        description: <FormatDate value={new Date(publishedAt)} format="articlePage" />,
      },
    ] as { key: string; title: string; description: ReactNode }[]
  }, [documentCategory, publishedAt, t])

  const extension = useMemo(() => {
    return file?.data?.attributes?.ext?.slice(1)
  }, [file])

  const size = useMemo(() => {
    return filesize((file?.data?.attributes?.size ?? 0) * 1000, { round: 1, locale: i18n.language })
  }, [file, i18n.language])

  const PDFModalViewer = dynamic(() => import('../atoms/PDFModalViewer'), {
    ssr: false,
  })

  const [isPdfModalOpen, setPdfModalOpen] = useState(false)

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={<HeroSection breadcrumbsMoreItems={[{ label: title, path: slug ?? '' }]} />}
    >
      <SectionsWrapper alternateBackground className="pb-20">
        <Section background="light">
          <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-8">
            <div className="flex h-[96px] w-[96px] shrink-0 items-center justify-center bg-background-beige md:h-[186px] md:w-[186px]">
              <FileIcon extension={extension} />
            </div>
            <div className="flex flex-col items-center gap-2 text-sm md:items-start">
              <div>
                {t('layouts.DocumentLayout.createdAt')}{' '}
                <FormatDate value={new Date(publishedAt)} format="articlePage" />
              </div>
              <h1>{title}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span>{size}</span>
                <span>•</span>
                <span className="uppercase">{extension}</span>
              </div>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
                <Button
                  target="_blank"
                  href={file?.data?.attributes?.url ?? ''}
                  className="md:w-fit"
                >
                  {t('layouts.DocumentLayout.downloadFile')}
                </Button>
                {file?.data?.attributes?.url && extension === 'pdf' && (
                  <Button
                    variant="secondary"
                    className="md:w-fit"
                    onPress={() => setPdfModalOpen(true)}
                  >
                    {t('layouts.DocumentLayout.showFile')}
                  </Button>
                )}
              </div>
              <div>
                {file?.data?.attributes?.url && extension === 'pdf' && (
                  <PDFModalViewer
                    onClose={() => setPdfModalOpen(false)}
                    isOpen={isPdfModalOpen}
                    url={file?.data?.attributes?.url}
                  />
                )}
              </div>
            </div>
          </div>
        </Section>

        {description ? (
          <Section
            innerClassName="md:pl-[250px] lg:pl-[266px] xl:pl-[294px]"
            title={t('layouts.DocumentLayout.description')}
            centerTitleOnMobile={false}
          >
            <div className="whitespace-pre-wrap">{description}</div>
          </Section>
        ) : undefined}

        <Section
          innerClassName="md:pl-[250px] lg:pl-[266px] xl:pl-[294px]"
          dividerClassName="md:ml-[218px]"
          title={t('layouts.DocumentLayout.details')}
          centerTitleOnMobile={false}
        >
          <dl>
            {dlData.map((dItem) => (
              <Fragment key={dItem.key}>
                <dt className="float-left clear-left w-32 after:content-[':'] not-first:mt-3">
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

export default DocumentLayout
