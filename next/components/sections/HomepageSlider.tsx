import cx from 'classnames'
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'

import { CtaFragment } from '../../graphql'
import Button from '../atoms/Button'
import { useGetFullPath } from '../molecules/Navigation/NavigationProvider/useGetFullPath'
import Slider from '../molecules/Slider'

type HomepageSliderProps = {
  slides: CtaFragment[] | null | undefined
}

const HomepageSlider = ({ slides }: HomepageSliderProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'HomepageSlider' })

  const { getFullPath } = useGetFullPath()

  if (!slides) {
    return null
  }

  return (
    <section className="relative h-[412px] bg-primary-dark text-white lg:h-[436px]">
      <Slider
        autoSwipeDuration={5000}
        pages={slides.map(({ title, description, button, image }) => {
          const ctaSlug = getFullPath(button?.page?.data)

          const { url, alternativeText } = image?.data?.attributes ?? {}

          return (
            <div className="flex h-full justify-center">
              <h2 className="sr-only">{t('aria.heading')}</h2>
              <div className="container absolute flex h-full flex-col items-center justify-center lg:items-start">
                <div className="flex h-full w-full flex-col items-center pb-16 lg:w-[60%] lg:items-start lg:justify-end lg:pb-[104px]">
                  {/* Mobile image */}
                  <div className="pointer-events-none relative mb-6 h-[228px] w-full select-none bg-black/20 lg:hidden">
                    {url && (
                      <Image src={url} alt={alternativeText ?? ''} fill className="object-cover" />
                    )}
                  </div>

                  <h3 className="text-center text-h1 font-bold text-current lg:text-left">
                    {title}
                  </h3>

                  {description && (
                    <div className="mt-3 hidden opacity-72 lg:block lg:pr-40 lg:line-clamp-3">
                      {description}
                    </div>
                  )}

                  {ctaSlug && (
                    <div className="mt-4 lg:mt-6">
                      <Button variant="white" href={ctaSlug}>
                        {button?.label}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop image */}
              <div key={ctaSlug} className="hidden h-full flex-1 lg:flex">
                <div className="w-[60%]" />
                <div className="pointer-events-none relative h-[228px] w-full select-none bg-black/20 lg:h-full lg:w-[40%]">
                  {url && (
                    <Image src={url} alt={alternativeText ?? ''} fill className="object-cover" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
        pagination={({ count, activeIndex, goToPage }) => (
          <div className="container pointer-events-none absolute bottom-4 z-20 flex justify-center lg:bottom-12 lg:justify-start">
            <div className="left-0 -ml-2 flex items-center">
              {Array.from({ length: count }, (element, index) => (
                <button
                  className={cx('pointer-events-auto p-2 hover:opacity-100', {
                    'opacity-50': activeIndex !== index,
                  })}
                  key={index}
                  type="button"
                  aria-label={t('aria.goToSlide', { number: index + 1 })}
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
