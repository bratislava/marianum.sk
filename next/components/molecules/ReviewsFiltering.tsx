import Checkbox from '../atoms/Checkbox'
import ReviewStars from '../atoms/ReviewStars'

export type ReviewStat = {
  title: string
  percentage: number
  onSelectedChange: (isSelected: boolean) => void
  isSelected: boolean
}

type ReviewsFilteringProps = {
  averageRating: number
  totalReviewCount: number
  reviewStats: ReviewStat[]
}

const ReviewsFiltering = ({
  averageRating,
  totalReviewCount,
  reviewStats,
}: ReviewsFilteringProps) => {
  return (
    <div className="flex w-full flex-col bg-white lg:ml-auto lg:w-[448px]">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2">
          <ReviewStars value={averageRating} />
          <span className="font-bold">{averageRating.toFixed(1)} / 5</span>
        </div>
        <div>{totalReviewCount} reviews</div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        {reviewStats.map(({ title, percentage, onSelectedChange, isSelected }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex items-center gap-4">
            <div className="flex w-32">
              <Checkbox isSelected={isSelected} onChange={onSelectedChange}>
                {title}
              </Checkbox>
            </div>
            <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-background-beige">
              <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
            </div>
            <div className="w-12 text-right">{percentage.toFixed(0)} %</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewsFiltering
