import Avatar from '@components/atoms/Avatar'
import CardBox from '@components/atoms/Card/CardBox'
import CardContent from '@components/atoms/Card/CardContent'
import FormatDate from '@components/atoms/FormatDate'
import ReviewStars from '@components/atoms/ReviewStars'

type ReviewCardProps = {
  rating: number
  author: string
  date: Date
  description: string
  border?: boolean
}
const ReviewCard = ({ rating, author, date, description, border = false }: ReviewCardProps) => {
  return (
    <CardBox hover={false} border={border} className="h-[228px]">
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar name={author} />
              <div>
                <div className="font-bold line-clamp-2">{author}</div>
                <div className="text-sm">
                  <FormatDate value={date} />
                </div>
              </div>
            </div>
          </div>
          <ReviewStars value={rating} />
          <div className="line-clamp-3">{description}</div>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default ReviewCard
