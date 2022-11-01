import { CtaSectionFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Button from '../atoms/Button'
import { useGetFullPath } from './Navigation/NavigationProvider/useGetFullPath'

const CtaGroup = ({ ctas }: CtaSectionFragment) => {
  const { getFullPath } = useGetFullPath()

  const filteredCtas = ctas?.filter(isDefined)

  return (
    <div className="grid auto-cols-fr gap-6 md:grid-flow-col">
      {filteredCtas?.map(({ title, description, button }) => {
        const ctaSlug = getFullPath(button?.page?.data)

        return (
          <div className="flex flex-col bg-primary px-4 py-8 text-white md:p-12" key={title}>
            <div className="text-h3 font-bold">{title}</div>
            <p className="mt-4 grow opacity-72">{description}</p>
            {ctaSlug && (
              <Button href={ctaSlug} className="mt-6 w-fit" variant="white">
                {button?.label}
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CtaGroup
