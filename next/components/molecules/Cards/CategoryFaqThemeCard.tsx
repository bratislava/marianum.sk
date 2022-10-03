import cx from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'

import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'
import { NavigationContext } from '../../layouts/NavigationProvider'

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
  const { navMap } = useContext(NavigationContext)

  const handleCardClick = () => {
    const wholeLink = navMap.get(linkHref)
    if (wholeLink) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(wholeLink)
    }
  }

  return (
    <CardBox {...rest} onClick={handleCardClick}>
      <CardContent
        className={cx('justify-between', subtitle ? 'md:min-h-[264px]' : 'md:min-h-[240px]')}
      >
        <div className={cx(subtitle ? 'mb-[54px]' : 'mb-5')}>
          <h5 className="line-clamp-3 group-hover:underline">{title}</h5>
          {subtitle && <div className="mt-2 block line-clamp-3">{subtitle}</div>}
        </div>
        <div>
          <MLink href={linkHref} noArrow className="inline-block">
            {t('general.showMore')}
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export const CategoryCard = CategoryFaqThemeCard as React.FC<CategoryCardProps>
export const FaqThemeCard = CategoryFaqThemeCard as React.FC<CategoryFaqThemeCardProps>
