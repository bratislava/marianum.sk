import { CtaSectionFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Button from '../atoms/Button'

const CtaGroup = ({ ctas }: CtaSectionFragment) => {
  const filteredCtas = ctas?.filter(isDefined)

  return (
    <div className="grid auto-cols-fr gap-4 md:grid-flow-col">
      {filteredCtas?.map(({ title, description, button }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="bg-primary px-4 py-8 text-white md:p-12" key={index}>
          <div className="text-h3 font-bold">{title}</div>
          {description && <p className="mt-4 opacity-72">{description}</p>}
          {button && (
            <Button href={button.url} className="mt-6" variant="white">
              {button.label}
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

export default CtaGroup
