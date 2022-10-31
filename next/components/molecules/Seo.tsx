import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { SeoFragment, UploadImageEntityFragment } from '../../graphql'

interface SeoProps {
  seo?: SeoFragment | null
  ogType?: string
  title?: string
  description?: string | null
  image?: UploadImageEntityFragment | null
}

const Seo = ({ seo, ogType = 'website', title, description, image }: SeoProps) => {
  const router = useRouter()
  const { t } = useTranslation('common', { keyPrefix: 'Seo' })

  const fullPath = `https://marianum.sk${router.asPath}`

  return (
    <Head>
      <meta name="title" content={seo?.metaTitle || title || ''} />
      <meta name="description" content={seo?.metaDescription || description || ''} />
      <meta name="keywords" content={seo?.keywords ?? ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Documentation: https://ogp.me/ */}
      <meta property="og:title" content={seo?.metaTitle || title || ''} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullPath} />

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
