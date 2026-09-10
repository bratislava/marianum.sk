import { useMemo } from 'react'

import TabItem from '@/components/atoms/Tabs/TabItem'
import Tabs from '@/components/atoms/Tabs/Tabs'
import BundleCard from '@/components/molecules/Cards/BundleCard'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section, { SectionProps } from '@/components/molecules/Section'
import { BundleListingFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

type BundleListingSectionProps = Pick<SectionProps, 'background'> & {
  section: BundleListingFragment
}

const BundleListingSection = ({ section, ...rest }: BundleListingSectionProps) => {
  const { getFullPath } = useGetFullPath()

  const { title, description, outsideMedicalFacility, atMedicalFacility } = section

  const proceduresWithKeys = useMemo(() => {
    return [
      { key: 'outsideMedicalFacility', ...outsideMedicalFacility },
      { key: 'atMedicalFacility', ...atMedicalFacility },
    ]
  }, [outsideMedicalFacility, atMedicalFacility])

  return (
    <Section title={title} description={description} {...rest}>
      <Tabs>
        {proceduresWithKeys.map((bundleTab) => (
          <TabItem key={bundleTab.key} title={bundleTab.title ?? ''}>
            <div className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
              {bundleTab.bundles
                ?.filter(isDefined)
                .map((bundle) => bundle.bundle)
                .map((bundle) => {
                  const {
                    title: bundleTitle,
                    coverMedia,
                    price,
                    discountTextShort,
                    bundleItems,
                    additionalItems,
                    slug,
                  } = bundle ?? {}

                  return (
                    <BundleCard
                      key={slug}
                      image={coverMedia}
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
                    />
                  )
                })}
            </div>
          </TabItem>
        ))}
      </Tabs>
    </Section>
  )
}

export default BundleListingSection
