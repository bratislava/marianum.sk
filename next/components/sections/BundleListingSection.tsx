import { BundleListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { getFullPath } from '../../utils/localPaths'
import BundleCard from '../molecules/Cards/BundleCard'
import Section, { SectionProps } from '../molecules/Section'

type BundleListingSectionProps = Pick<SectionProps, 'background'> & {
  section: BundleListingFragment
}

const BundleListingSection = ({ section, ...rest }: BundleListingSectionProps) => {
  const { title, description, bundles, showMoreButton } = section

  const filteredBundles = bundles
    ?.filter(isDefined)
    .map((bundle) => bundle.bundle?.data)
    .filter((bundle) => bundle?.attributes)

  return (
    <Section
      title={title}
      description={description}
      {...rest}
      cardGrid="bundles"
      button={showMoreButton}
    >
      {filteredBundles?.map((bundle) => {
        const { id, attributes } = bundle ?? {}
        const { title: bundleTitle, coverMedia, price, bundleContent } = attributes ?? {}

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
            linkHref={getFullPath(bundle) ?? ''}
            border
          />
        )
      })}
    </Section>
  )
}

export default BundleListingSection
