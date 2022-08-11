import classnames from 'classnames'

import Button from '../atoms/Button'
import Slider from '../molecules/Slider'

type HomepageSliderProps = {
  slides: {
    key: string
    title: string
    description: string
    buttonText: string
    imageSrc: string
  }[]
}

const HomepageSlider = ({ slides }: HomepageSliderProps) => {
  return (
    <section className="h-[412px] bg-primary-dark text-white xl:h-[436px]">
      <Slider
        autoSwipeDuration={5000}
        pages={slides.map(({ key, title, description, buttonText }) => (
          <div
            key={key}
            className="container mx-auto flex h-full flex-col-reverse content-center lg:flex-row"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 pb-12 lg:items-start lg:pb-4 lg:pr-40">
              <div className="text-h1 font-bold">{title}</div>
              <div className="hidden lg:block">{description}</div>
              <Button variant="white">{buttonText}</Button>
            </div>
            <div className="h-[228px] w-full lg:h-full lg:w-[450px] lg:pr-4 xl:w-[612px]">
              <div className="h-full w-full bg-black/20" />
            </div>
          </div>
        ))}
        pagination={({ count, activeIndex, goToPage }) => (
          <div className="container pointer-events-none absolute bottom-4 z-20 mx-auto flex justify-center lg:bottom-12 lg:justify-start">
            <div className="left-0 flex items-center px-2">
              {Array.from({ length: count }, (element, index) => (
                <button
                  className={classnames('pointer-events-auto p-2 hover:opacity-100', {
                    'opacity-50': activeIndex !== index,
                  })}
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
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
