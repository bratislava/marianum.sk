import {
  UnionSlugEntityType,
  useGetFullPath,
} from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { SeoFragment, UploadImageEntityFragment } from '@graphql'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

interface SeoProps {
  title: string | undefined | null
  seo?: SeoFragment | null
  ogType?: string
  description?: string | null
  image?: UploadImageEntityFragment | null
  entity?: UnionSlugEntityType
  homepage?: boolean
}

const Seo = ({
  title,
  seo,
  ogType = 'website',
  description,
  image,
  entity,
  homepage = false,
}: SeoProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Seo' })

  const { getFullPath } = useGetFullPath()

  const fullPath = getFullPath(entity)
  const fullPathWithDomain = homepage
    ? `https://marianum.sk/`
    : fullPath
      ? `https://marianum.sk${fullPath}`
      : null

  return (
    <Head>
      <title>{`${title || ''} – Marianum`}</title>

      <meta name="title" content={`${seo?.metaTitle || title || ''} – Marianum`} />
      <meta name="description" content={seo?.metaDescription || description || ''} />
      <meta name="keywords" content={seo?.keywords ?? ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {fullPathWithDomain && <link rel="canonical" href={fullPathWithDomain} />}

      {/* Documentation: https://ogp.me/ */}
      <meta property="og:title" content={`${seo?.metaTitle || title || ''} – Marianum`} />
      <meta property="og:type" content={ogType} />
      {fullPathWithDomain && <meta property="og:url" content={fullPathWithDomain} />}

      {/* TODO: Twitter's image size limit is only 1MB */}
      <meta property="og:image" content={image?.attributes?.url ?? ''} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Comments from: https://css-tricks.com/essential-meta-tags-social-media/ */}
      {/* Non-Essential, But Recommended */}
      <meta property="og:description" content={seo?.metaDescription || description || ''} />
      <meta property="og:site_name" content={t('siteName')} />
      <meta name="twitter:image:alt" content={image?.attributes?.alternativeText ?? ''} />

      {/* Non-Essential, But Required for Analytics */}
      {/* <meta property="fb:app_id" content="your_app_id" /> */}
      {/* <meta name="twitter:site" content="@website-username" /> */}
    </Head>
  )
}

export default Seo
