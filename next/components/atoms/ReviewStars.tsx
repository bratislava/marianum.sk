import { useTranslation } from 'next-i18next'
import { useId } from 'react'

const calculateStarClipPathWidth = (value: number, index: number) => {
  return value > index ? (value - index) * 20 : 0
}

type ReviewStarProps = {
  value: number
  index: number
}

const ReviewStar = ({ value, index }: ReviewStarProps) => {
  const id = useId()

  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <defs>
        <clipPath id={`visible-part-${id}`}>
          <rect x="0" y="0" width={calculateStarClipPathWidth(value, index)} height="20" />
        </clipPath>
        <clipPath id={`hidden-part-${id}`}>
          <rect
            x={calculateStarClipPathWidth(value, index)}
            y="0"
            width={value > index + 1 ? 0 : 20}
            height="20"
          />
        </clipPath>
      </defs>
      <path
        d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z"
        fill="#FEC229"
        clipPath={`url(#visible-part-${id})`}
      />
      <path
        d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z"
        fill="#DDDDDD"
        clipPath={`url(#hidden-part-${id})`}
      />
    </svg>
  )
}

type ReviewStarsProps = {
  value: number
}

const ReviewStars = ({ value }: ReviewStarsProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'components.atoms.ReviewStars' })

  return (
    <>
      <div className="sr-only">{t('aria.rating', { rating: value.toFixed(1) })}</div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_item, index) => (
          <ReviewStar key={index} value={value} index={index} />
        ))}
      </div>
    </>
  )
}

export default ReviewStars
