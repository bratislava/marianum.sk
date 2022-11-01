import { BundleListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Tab from '../atoms/Tabs/Tab'
import Tabs from '../atoms/Tabs/Tabs'
import BundleCard from '../molecules/Cards/BundleCard'
import { useGetFullPath } from '../molecules/Navigation/NavigationProvider/useGetFullPath'
import Section, { SectionProps } from '../molecules/Section'

type BundleListingSectionProps = Pick<SectionProps, 'background'> & {
  section: BundleListingFragment
}

const BundleListingSection = ({ section, ...rest }: BundleListingSectionProps) => {
  const { getFullPath } = useGetFullPath()

  const { title, description, atMedicalFacility, outsideMedicalFacility } = section

  return (
    <Section title={title} description={description} {...rest}>
      <Tabs>
        {[atMedicalFacility, outsideMedicalFacility].map((bundleTab, indexTab) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tab key={indexTab} title={bundleTab?.title ?? ''}>
            <div className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
              {bundleTab?.bundles
                ?.filter(isDefined)
                .map((bundle) => bundle.bundle?.data)
                .map((bundle) => {
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
                        bundleItems
                          ?.map((bundleItem) => bundleItem?.description)
                          .filter(isDefined) ?? []
                      }
                      claimsPlus={
                        additionalItems
                          ?.map((bundleItem) => bundleItem?.description)
                          .filter(isDefined) ?? []
                      }
                      linkHref={getFullPath(bundle) ?? ''}
                      border
                    />
                  )
                })}
            </div>
          </Tab>
        ))}
      </Tabs>
    </Section>
  )
}

export default BundleListingSection
