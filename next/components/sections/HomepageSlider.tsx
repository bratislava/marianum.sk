import cx from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { CtaFragment } from '../../graphql'
import Button from '../atoms/Button'
import { useSlug } from '../molecules/Navigation/NavigationProvider/useFullSlug'
import Slider from '../molecules/Slider'

type HomepageSliderProps = {
  slides: CtaFragment[] | null | undefined
}

const HomepageSlider = ({ slides }: HomepageSliderProps) => {
  const { t } = useTranslation()
  const { getFullSlug } = useSlug()

  if (!slides) {
    return null
  }

  return (
    <section className="h-[412px] bg-primary-dark text-white xl:h-[436px]">
      <Slider
        autoSwipeDuration={5000}
        pages={slides.map(({ title, description, button, image }) => {
          const ctaSlug = getFullSlug(button?.page?.data)

          const { url, alternativeText, width, height } = image?.data?.attributes ?? {}

          return (
            <div
              key={ctaSlug}
              className="container flex h-full flex-col-reverse content-center lg:flex-row"
            >
              <div className="flex flex-1 flex-col items-center justify-center pb-12 lg:items-start lg:pb-4 lg:pr-40">
                <div className="mb-3 text-h1 font-bold">{title}</div>
                {description && (
                  <div className="mb-6 hidden opacity-72 lg:block">{description}</div>
                )}
                {ctaSlug && (
                  <Button variant="white" href={ctaSlug}>
                    {button?.label}
                  </Button>
                )}
              </div>
              <div className="pointer-events-none relative h-[228px] w-full select-none lg:h-full lg:w-[450px] lg:pr-4 xl:w-[612px]">
                {url && (
                  <Image
                    src={url}
                    alt={alternativeText ?? ''}
                    width={width ?? 0}
                    height={height ?? 0}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
          )
        })}
        pagination={({ count, activeIndex, goToPage }) => (
          <div className="container pointer-events-none absolute bottom-4 z-20 flex justify-center lg:bottom-12 lg:justify-start">
            <div className="left-0 flex items-center px-2">
              {Array.from({ length: count }, (element, index) => (
                <button
                  className={cx('pointer-events-auto p-2 hover:opacity-100', {
                    'opacity-50': activeIndex !== index,
                  })}
                  key={index}
                  type="button"
                  aria-label={t('general.goToSlide', { number: index + 1 })}
                  onClick={() => goToPage(index)}
                >
                  <div className="h-2 w-2 rounded-full bg-white" />
                </button>
              ))}
            </div>
          </div>
        )}
      />
    </section>
  )
}

export default HomepageSlider
