import BundleCard from '@/components/molecules/Cards/BundleCard'
import Section, { SectionProps } from '@/components/molecules/Section'
import { BundleListingSimpleFragment } from '@/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { isDefined } from '@/utils/isDefined'

type BundleListingSimpleSectionProps = Pick<SectionProps, 'background'> & {
  section: BundleListingSimpleFragment
}

const BundleListingSimpleSection = ({ section, ...rest }: BundleListingSimpleSectionProps) => {
  const { getPathForStrapiEntity } = useNavigation()

  const { title, description, bundles } = section

  return (
    <Section title={title} description={description} {...rest}>
      <div className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
        {bundles.filter(isDefined).map((bundle) => {
          const {
            title: bundleTitle,
            coverMedia,
            price,
            discountTextShort,
            bundleItems,
            additionalItems,
            slug,
          } = bundle

          return (
            <BundleCard
              key={slug}
              image={coverMedia}
              name={bundleTitle}
              priceFrom={price}
              discountText={discountTextShort ?? undefined}
              claims={
                bundleItems?.map((bundleItem) => bundleItem?.description).filter(isDefined) ?? []
              }
              claimsPlus={
                additionalItems?.map((bundleItem) => bundleItem?.description).filter(isDefined) ??
                []
              }
              linkHref={getPathForStrapiEntity(bundle) ?? ''}
            />
          )
        })}
      </div>
    </Section>
  )
}

export default BundleListingSimpleSection
