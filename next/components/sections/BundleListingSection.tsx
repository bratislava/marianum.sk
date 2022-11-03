import { useMemo } from 'react'

import { BundleListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import TabItem from '../atoms/Tabs/TabItem'
import Tabs from '../atoms/Tabs/Tabs'
import BundleCard from '../molecules/Cards/BundleCard'
import { useGetFullPath } from '../molecules/Navigation/NavigationProvider/useGetFullPath'
import Section, { SectionProps } from '../molecules/Section'

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
          // eslint-disable-next-line react/no-array-index-key
          <TabItem key={bundleTab.key} title={bundleTab?.title ?? ''}>
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
          </TabItem>
        ))}
      </Tabs>
    </Section>
  )
}

export default BundleListingSection
