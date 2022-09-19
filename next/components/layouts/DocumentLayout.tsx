import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Fragment, ReactNode, useMemo } from 'react'
import slugify from 'slugify'

import PdfIcon from '../../assets/file-types/pdf.svg'
import {
  DocumentEntityFragment,
  GeneralEntityFragment,
  NavigationItemFragment,
} from '../../graphql'
import { getBreadcrumbs } from '../../utils/getBreadcrumbs'
import Button from '../atoms/Button'
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
  const router = useRouter()
  const { t } = useTranslation()

  const { title, description, file, publishedAt, documentCategory, slug } =
    document.attributes ?? {}

  const breadcrumbs = getBreadcrumbs(router.asPath, navigation, [{ label: title, link: slug }])

  const dlData = useMemo(() => {
    return [
      ...(documentCategory?.data?.attributes
        ? [
            {
              title: t('layouts.DocumentLayout.category'),
              description: documentCategory.data.attributes.title,
            },
          ]
        : []),
      {
        title: t('layouts.DocumentLayout.createdAt'),
        description: <FormatDate value={new Date(publishedAt)} format="articlePage" />,
      },
    ] as { title: string; description: ReactNode }[]
  }, [documentCategory, publishedAt, t])

  const icon = useMemo(() => {
    const ext = file?.data?.attributes?.ext?.slice(1)
    // TODO add more icons and general file icon
    if (ext === 'pdf') {
      return <PdfIcon />
    }
    return <>TODO</>
  }, [file])

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={<HeroSection breadcrumbs={breadcrumbs} />}
    >
      <SectionsWrapper isContainer>
        <Section background="light">
          <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-8">
            <div className="flex h-[96px] w-[96px] items-center justify-center bg-background-beige md:h-[186px] md:w-[186px]">
              {icon}
            </div>
            <div className="flex flex-col items-center gap-2 text-sm md:items-start">
              <div>
                {t('layouts.DocumentLayout.createdAt')}{' '}
                <FormatDate value={new Date(publishedAt)} format="articlePage" />
              </div>
              <h1 className="text-center">{title}</h1>
              <div className="text-sm">metadata TODO</div>
              <Button href={file?.data?.attributes?.url ?? ''} className="mt-4 md:w-fit">
                {t('layouts.DocumentLayout.downloadFile')}
              </Button>
            </div>
          </div>
        </Section>

        {/* TODO add left margin to sections below */}
        <Section title={t('layouts.DocumentLayout.description')}>
          <div className="whitespace-pre-wrap">{description}</div>
        </Section>

        {/* TODO index is added manually to add padding that compensates the footer overlap
         * This should be done automatically */}
        <Section index={2} title={t('layouts.DocumentLayout.details')}>
          <dl>
            {dlData.map((dItem) => (
              <Fragment key={slugify(dItem.title)}>
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
