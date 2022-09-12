import { CtaSectionFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Button from '../atoms/Button'

const CtaGroup = ({ ctas }: CtaSectionFragment) => {
  const filteredCtas = ctas?.filter(isDefined)

  return (
    <div className="grid auto-cols-fr gap-4 md:grid-flow-col">
      {filteredCtas?.map(({ title, description, button }) => {
        const ctaSlug = button?.page?.data?.attributes?.slug
        return (
          <div className="bg-primary px-4 py-8 text-white md:p-12" key={title}>
            <div className="text-h3 font-bold">{title}</div>
            {description && <p className="mt-4 opacity-72">{description}</p>}
            {ctaSlug && (
              <Button href={ctaSlug} className="mt-6" variant="white">
                {button.label}
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CtaGroup
