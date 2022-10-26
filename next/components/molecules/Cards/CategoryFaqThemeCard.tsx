import cx from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'

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
  const router = useRouter()
  const { t } = useTranslation()

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't trigger the `handleCardClick` function when link clicked.
    event.stopPropagation()
  }

  const handleCardClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(linkHref)
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <CardBox {...rest} onClick={handleCardClick}>
      <CardContent
        className={cx('justify-between', subtitle ? 'md:min-h-[264px]' : 'md:min-h-[240px]')}
      >
        <div className={cx('flex grow', subtitle ? 'mb-[54px]' : 'mb-5')}>
          <MLink href={linkHref} noStyles onClick={handleLinkClick}>
            <h5 className="flex grow line-clamp-3 group-hover:underline">{title}</h5>
          </MLink>
          {subtitle && <div className="mt-2 block line-clamp-3">{subtitle}</div>}
        </div>
        <div>
          <MLink
            href={linkHref}
            tabIndex={-1}
            noArrow
            className="inline-block"
            onClick={handleLinkClick}
          >
            {t('Cards.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

// FaqThemeCard is not used so far, but we keep it for future improvements
export const CategoryCard = CategoryFaqThemeCard as React.FC<CategoryCardProps>
export const FaqThemeCard = CategoryFaqThemeCard as React.FC<CategoryFaqThemeCardProps>
