import cx from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useId } from 'react'

import Button from '@/components/atoms/Button'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'
import Slider from '@/components/molecules/Slider'
import { CtaFragment } from '@/graphql'

type HomepageSliderProps = {
  slides: CtaFragment[] | null | undefined
}

const getAriaLabelId = (id: string, index: number) => `homepageslider-${id}-${index}`

const HomepageSlider = ({ slides }: HomepageSliderProps) => {
  const { t } = useTranslation()
  const id = useId()

  const { getLinkProps } = useGetLinkProps()

  if (!slides) {
    return null
  }

  return (
    <div className="relative h-[412px] bg-primary-dark text-white lg:h-[436px]">
      <Slider
        autoSwipeDuration={5000}
        allowKeyboardNavigation
        pages={slides.map(({ title, description, button, image }, index) => {
          const linkProps = getLinkProps(button)
          const { url, alternativeText } = image?.data?.attributes ?? {}
          return (
            <div
              className="flex h-full justify-center"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <h2 className="sr-only">{t('HomepageSlider.aria.heading')}</h2>
              <div className="container absolute flex h-full flex-row items-center justify-center lg:justify-start">
                {/* 60% of container width is not the same as 60% of window (image offset from left), but this setting works fine */}
                <div className="flex size-full flex-col items-center pb-16 lg:w-3/5 lg:items-start lg:justify-end lg:pb-[104px]">
                  {/* Mobile image */}
                  <div className="pointer-events-none relative mb-6 h-[228px] w-full select-none bg-black/20 lg:hidden">
                    {url && (
                      <Image src={url} alt={alternativeText ?? ''} fill className="object-cover" />
                    )}
                  </div>

                  <h3
                    id={getAriaLabelId(id, index)}
                    className="text-center text-h1 font-bold text-current lg:text-left"
                  >
                    {title}
                  </h3>

                  {description && (
                    <div className="mt-3 hidden opacity-72 lg:line-clamp-3 lg:block lg:pr-40">
                      {description}
                    </div>
                  )}

                  {button && (
                    <div className="mt-4 lg:mt-6">
                      <Button
                        variant="white"
                        aria-labelledby={getAriaLabelId(id, index)}
                        {...linkProps}
                      >
                        {linkProps.label}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop image */}
              <div key={linkProps.href} className="hidden h-full flex-1 lg:flex">
                <div className="w-3/5" />
                {/* gradient overlay */}
                <div className="absolute left-[60%] z-[1] -ml-px h-full w-[10%] bg-gradient-to-r from-primary-dark" />
                <div className="pointer-events-none relative h-[228px] w-full select-none bg-black/20 lg:h-full lg:w-2/5">
                  {url && (
                    <Image
                      src={url}
                      alt={alternativeText ?? ''}
                      fill
                      className="object-cover mix-blend-multiply"
                    />
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
                  key={index}
                  type="button"
                  aria-label={t('HomepageSlider.aria.goToSlide', { number: index + 1 })}
                  onClick={() => goToPage(index)}
                  className="base-focus-ring pointer-events-auto rounded-full p-2"
                  // Keep the focus ring fully visible regardless of whether the indicator is active or inactive
                >
                  <div
                    className={cx('size-2 rounded-full bg-white hover:opacity-100', {
                      'opacity-50': activeIndex !== index,
                    })}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default HomepageSlider
