import { useTranslation } from 'next-i18next'

import { BundleListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import BundleCard from '../molecules/Cards/BundleCard'
import Section, { SectionProps } from '../molecules/Section'

type BundleListingSectionProps = Pick<SectionProps, 'background' | 'index'> & {
  section: BundleListingFragment
}

const BundleListingSection = ({ section, ...rest }: BundleListingSectionProps) => {
  const { t } = useTranslation()

  const { title, description, bundles, showMoreButton } = section

  const filteredBundles = bundles
    ?.filter(isDefined)
    .map((bundle) => bundle.bundle?.data)
    .filter((bundle) => bundle?.attributes)

  return (
    <Section title={title} description={description} {...rest} cardGrid button={showMoreButton}>
      {filteredBundles?.map((bundle) => {
        const { id, attributes } = bundle ?? {}
        const { title: bundleTitle, coverMedia, price, bundleContent, slug } = attributes ?? {}

        return (
          <BundleCard
            key={id}
            image={coverMedia?.data?.attributes}
            name={bundleTitle ?? ''}
            priceFrom={price ?? 0}
            claims={
              bundleContent
                ?.map((bundleContentItem) => bundleContentItem?.description)
                .filter(isDefined) ?? []
            }
            linkHref={`${t('paths.bundles')}/${slug ?? ''}`}
            border
          />
        )
      })}
    </Section>
  )
}

export default BundleListingSection
