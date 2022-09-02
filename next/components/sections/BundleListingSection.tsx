import { BundleListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import BundleCard from '../molecules/Cards/BundleCard'
import Section, { SectionProps } from '../molecules/Section'

type BundleListingSectionProps = Pick<SectionProps, 'isContainer' | 'color'> & {
  section: BundleListingFragment
}

const BundleListingSection = ({ section, ...rest }: BundleListingSectionProps) => {
  const { title, description, bundles, showMoreButton } = section

  const filteredBundles = bundles
    ?.filter(isDefined)
    .map((bundle) => bundle.bundle?.data)
    .filter((bundle) => bundle?.attributes)

  return (
    <Section title={title} description={description} {...rest} cardGrid button={showMoreButton}>
      {filteredBundles?.map((bundle) => {
        const { id, attributes } = bundle || {}

        return (
          <BundleCard
            key={id}
            imageUrl={attributes?.coverMedia.data?.attributes?.url ?? ''}
            imageAlt={attributes?.coverMedia.data?.attributes?.alternativeText ?? ''}
            name={attributes?.title ?? ''}
            priceFrom={attributes?.price ?? 0}
            claims={
              attributes?.bundleContent
                ?.map((bundleContentItem) => bundleContentItem?.description)
                .filter(isDefined) ?? []
            }
            linkHref={attributes?.slug ?? ''}
            border
          />
        )
      })}
    </Section>
  )
}

export default BundleListingSection
