import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useId } from 'react'

import CardBox, { CardBoxProps } from '@/components/atoms/Card/CardBox'
import CardContent from '@/components/atoms/Card/CardContent'
import MLink from '@/components/atoms/MLink'

type CategoryCardProps = {
  title: string
  linkHref: string
} & CardBoxProps

type CategoryFaqThemeCardProps = CategoryCardProps & { subtitle?: string }

const CategoryFaqThemeCard = ({
  title,
  subtitle,
  linkHref,
  ...rest
}: CategoryFaqThemeCardProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Cards' })
  const titleId = useId()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <CardBox {...rest}>
      <CardContent
        className={cx('justify-between', subtitle ? 'md:min-h-[264px]' : 'md:min-h-[240px]')}
      >
        <div className={cx('flex grow', subtitle ? 'mb-[54px]' : 'mb-5')}>
          <h3 id={titleId} className="line-clamp-3 flex grow text-h5 group-hover:underline">
            {title}
          </h3>
          {subtitle && <div className="mt-2 line-clamp-3 block">{subtitle}</div>}
        </div>
        <div>
          <MLink
            href={linkHref}
            aria-labelledby={titleId}
            noArrow
            className="after:absolute after:inset-0"
            onClick={handleLinkClick}
          >
            {t('showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

// FaqThemeCard is not used so far, but we keep it for future improvements
export const CategoryCard = CategoryFaqThemeCard as React.FC<CategoryCardProps>
export const FaqThemeCard = CategoryFaqThemeCard as React.FC<CategoryFaqThemeCardProps>
