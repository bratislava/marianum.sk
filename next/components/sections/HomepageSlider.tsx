import cx from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { CtaFragment } from '../../graphql'
import Button from '../atoms/Button'
import Slider from '../molecules/Slider'

type HomepageSliderProps = {
  slides: CtaFragment[] | null | undefined
}

const HomepageSlider = ({ slides }: HomepageSliderProps) => {
  const { t } = useTranslation()

  if (!slides) {
    return null
  }

  return (
    <section className="h-[412px] bg-primary-dark text-white xl:h-[436px]">
      <Slider
        autoSwipeDuration={5000}
        pages={slides.map(({ title, description, button, image }) => (
          <div
            key={button?.url}
            className="container mx-auto flex h-full flex-col-reverse content-center lg:flex-row"
          >
            <div className="flex flex-1 flex-col items-center justify-center p-4 pb-12 lg:items-start lg:pb-4 lg:pr-40">
              <div className="mb-3 text-h1 font-bold">{title}</div>
              {description && <div className="mb-6 hidden opacity-72 lg:block">{description}</div>}
              {button && (
                <Button
                  variant="white"
                  href={button?.url ?? '#'}
                  target={button?.targetBlank ? '_blank' : '_self'}
                >
                  {button?.label}
                </Button>
              )}
            </div>
            <div className="relative mr-4 h-[228px] w-full lg:h-full lg:w-[450px] lg:pr-4 xl:w-[612px]">
              {image?.data?.attributes && (
                <Image
                  src={image?.data?.attributes.url}
                  alt={image?.data?.attributes.alternativeText ?? ''}
                  width={image?.data?.attributes.width ?? 0}
                  height={image?.data?.attributes.height ?? 0}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>
        ))}
        pagination={({ count, activeIndex, goToPage }) => (
          <div className="container pointer-events-none absolute bottom-4 z-20 mx-auto flex justify-center lg:bottom-12 lg:justify-start">
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
