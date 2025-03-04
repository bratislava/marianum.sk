import cx from 'classnames'
import { useId, useMemo } from 'react'

import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import DocumentRow from '@/components/molecules/Row/DocumentRow'
import { DocumentGroupFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

type DocumentGroupProps = {
  documents: DocumentGroupFragment['documents']
  className?: string
  contentClassname?: string
  shouldUseHover?: boolean
}

const getAriaLabelId = (id: string, index: number) => `document-group-title-${id}-${index}`

const DocumentGroup = ({
  documents,
  className = '',
  contentClassname = '',
  shouldUseHover = true,
}: DocumentGroupProps) => {
  const id = useId()
  const { getFullPath } = useGetFullPath()

  const filteredDocuments = useMemo(() => {
    return (documents ?? []).map((document) => document?.document?.data).filter(isDefined)
  }, [documents])

  return (
    <div className={cx('flex flex-col gap-4', className)}>
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
            contentClassname={contentClassname}
            shouldUseHover={shouldUseHover}
          />
        )
      })}
    </div>
  )
}

export default DocumentGroup
