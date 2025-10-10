import { useId, useMemo } from 'react'

import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import DocumentRow from '@/components/molecules/Row/DocumentRow'
import { DocumentGroupFragment } from '@/graphql'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'

type DocumentGroupProps = DocumentGroupFragment & { variant?: 'gaps' | 'dividers' }

const getAriaLabelId = (id: string, index: number) => `document-group-title-${id}-${index}`

const DocumentGroup = ({ documents, variant = 'gaps' }: DocumentGroupProps) => {
  const id = useId()
  const { getFullPath } = useGetFullPath()

  const filteredDocuments = useMemo(() => {
    return (documents ?? []).map((document) => document?.document?.data).filter(isDefined)
  }, [documents])

  return (
    <div
      className={cn('flex flex-col', {
        'gap-0 divide-y divide-[1px] divide-border': variant === 'dividers',
        'gap-4': variant === 'gaps',
      })}
    >
      {filteredDocuments?.map((doc, index) => {
        const { title, slug, file } = doc.attributes ?? {}

        if (!file?.data) return null

        return (
          <DocumentRow
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

export default DocumentGroup
