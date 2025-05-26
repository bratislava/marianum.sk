import Avatar from '@/components/atoms/Avatar'
import FormatDate from '@/components/atoms/FormatDate'
import ReviewStars from '@/components/atoms/ReviewStars'

type ReviewProps = {
  rating: number
  author: string
  date: Date
  description: string
}

const Review = ({ rating, author, date, description }: ReviewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar name={author} />
          <div>
            <div className="font-bold">{author}</div>
            <div className="text-sm">
              <FormatDate value={date} />
            </div>
          </div>
        </div>
        <ReviewStars value={rating} />
      </div>
      <div>{description}</div>
    </div>
  )
}

export default Review
