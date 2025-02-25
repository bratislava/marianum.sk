import BundleCard from '@/components/molecules/Cards/BundleCard'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section, { SectionProps } from '@/components/molecules/Section'
import { BundleListingSimpleFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

type BundleListingSimpleSectionProps = Pick<SectionProps, 'background'> & {
  section: BundleListingSimpleFragment
}

const BundleListingSimpleSection = ({ section, ...rest }: BundleListingSimpleSectionProps) => {
  const { getFullPath } = useGetFullPath()

  const { title, description, bundles } = section

  return (
    <Section title={title} description={description} {...rest}>
      <div className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
        {bundles?.data?.filter(isDefined).map((bundle) => {
          const { attributes } = bundle ?? {}
          const {
            title: bundleTitle,
            coverMedia,
            price,
            discountTextShort,
            bundleItems,
            additionalItems,
            slug,
          } = attributes ?? {}

          return (
            <BundleCard
              key={slug}
              image={coverMedia?.data?.attributes}
              name={bundleTitle ?? ''}
              priceFrom={price ?? 0}
              discountText={discountTextShort ?? undefined}
              claims={
                bundleItems?.map((bundleItem) => bundleItem?.description).filter(isDefined) ?? []
              }
              claimsPlus={
                additionalItems?.map((bundleItem) => bundleItem?.description).filter(isDefined) ??
                []
              }
              linkHref={getFullPath(bundle) ?? ''}
            />
          )
        })}
      </div>
    </Section>
  )
}

export default BundleListingSimpleSection
