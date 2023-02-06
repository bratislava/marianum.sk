import Pagination from '@components/atoms/Pagination/Pagination'
import { SearchResponse } from 'meilisearch'

type PaginationMeiliProps = {
  data: SearchResponse
  selectedPage: number
  pageSize: number
  onPageChange?: (page: number) => void
}

const PaginationMeili = ({
  data,
  selectedPage,
  pageSize,
  onPageChange = () => {},
}: PaginationMeiliProps) => {
  const pageCount = data.estimatedTotalHits ? Math.ceil(data.estimatedTotalHits / pageSize) : 0

  return pageCount ? (
    <Pagination
      className="flex justify-center pt-4 md:pt-6"
      selectedPage={selectedPage}
      count={pageCount}
      onChange={onPageChange}
    />
  ) : null
}

export default PaginationMeili
