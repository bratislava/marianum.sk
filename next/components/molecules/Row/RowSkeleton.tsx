import { useMemo } from 'react'

const RowSkeleton = () => {
  const width = useMemo(() => Math.random() * 300 + 100, [])

  return (
    <div className="flex h-[92px] animate-pulse flex-col justify-center gap-2 bg-white px-5">
      <div className="flex items-center gap-3">
        <div className="h-5 w-48 rounded bg-gray" />
        <div className="h-5 w-12 rounded-full bg-gray" />
      </div>
      <div>
        <div className="h-4 rounded bg-gray" style={{ width }} />
      </div>
    </div>
  )
}

export default RowSkeleton
