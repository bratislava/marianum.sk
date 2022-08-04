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
      <Slider autoSwipeDuration={5000}>
        {slides.map(({ key, title, description, buttonText }) => (
          <div
            key={key}
            className="container mx-auto flex h-full flex-col-reverse content-center lg:flex-row"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 lg:items-start lg:pr-40">
              <div className="text-h1 font-bold">{title}</div>
              <div className="hidden lg:block">{description}</div>
              <Button variant="white">{buttonText}</Button>
            </div>
            <div className="h-[228px] w-full lg:h-full lg:w-[450px] lg:pr-4 xl:w-[612px]">
              <div className="h-full w-full bg-black/20" />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default HomepageSlider
