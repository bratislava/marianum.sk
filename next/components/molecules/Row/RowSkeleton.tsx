import Skeleton from 'react-loading-skeleton'

const RowSkeleton = () => {
  return (
    <div className="flex h-[92px] flex-col justify-center gap-2 border border-border bg-white px-5">
      <div className="flex items-center gap-3">
        <Skeleton width={200} height={20} />
        <Skeleton width={48} height={20} borderRadius={1000} />
      </div>
      <p>
        <Skeleton width={300} />
      </p>
    </div>
  )
}

export default RowSkeleton
