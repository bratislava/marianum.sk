import { useId, useMemo } from 'react'

import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import AssetRow from '@/components/molecules/Row/AssetRow'
import { DocumentGroupFragment } from '@/graphql'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'

type AssetGroupProps = DocumentGroupFragment & { variant?: 'gaps' | 'dividers' }

const getAriaLabelId = (id: string, index: number) => `asset-group-title-${id}-${index}`

const AssetGroup = ({ assets, variant = 'gaps' }: AssetGroupProps) => {
  const id = useId()
  const { getFullPath } = useGetFullPath()

  const filteredAssets = useMemo(() => {
    return (assets ?? []).map((asset) => document?.document?.data).filter(isDefined)
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
            linkHref={getFullPath(doc) ?? undefined}
            file={file?.data}
            variant={variant}
          />
        )
      })}
    </div>
  )
}

export default AssetGroup
