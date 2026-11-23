import { useId, useMemo } from 'react'

import AssetRow from '@/components/molecules/Row/AssetRow'
import { AssetGroupFragment } from '@/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'

type AssetGroupProps = AssetGroupFragment & { variant?: 'gaps' | 'dividers' }

const getAriaLabelId = (id: string, index: number) => `asset-group-title-${id}-${index}`

const AssetGroup = ({ assets, variant = 'gaps' }: AssetGroupProps) => {
  const id = useId()
  const { getPathForStrapiEntity } = useNavigation()

  const filteredAssets = useMemo(() => {
    return (assets ?? []).map((asset) => asset?.asset?.data).filter(isDefined)
  }, [assets])

  return (
    <div
      className={cn('flex flex-col', {
        'gap-0 divide-y divide-[1px] divide-border': variant === 'dividers',
        'gap-4': variant === 'gaps',
      })}
    >
      {filteredAssets?.map((doc, index) => {
        const { title, slug, file } = doc.attributes ?? {}

        if (!file?.data) return null

        return (
          <AssetRow
            key={slug}
            title={title ?? ''}
            titleId={getAriaLabelId(id, index)}
            linkHref={getPathForStrapiEntity(doc) ?? undefined}
            file={file?.data}
            variant={variant}
          />
        )
      })}
    </div>
  )
}

export default AssetGroup
