import { useId } from 'react'

import Button from '@/components/atoms/Button'
import { CtaSectionFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'
import { useGetLinkProps } from '@/components/molecules/Navigation/NavigationProvider/useGetLinkProps'

const getAriaLabelId = (id: string, index: number) => `ctagroup-${id}-${index}`

const CtaGroup = ({ ctas }: CtaSectionFragment) => {
  const { getLinkProps } = useGetLinkProps()

  const filteredCtas = ctas?.filter(isDefined)
  const id = useId()

  return (
    <div className="grid auto-cols-fr gap-6 md:grid-flow-col">
      {filteredCtas?.map(({ title, description, button }, index) => {
        const linkProps = getLinkProps(button)

        return (
          <div
            className="relative flex flex-col bg-primary px-4 py-8 text-white md:p-12"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            <h3 className="font-bold text-current" id={getAriaLabelId(id, index)}>
              {title}
            </h3>
            <p className="mt-4 grow opacity-72">{description}</p>
            {button && (
              <Button
                href={linkProps.href}
                className="mt-6 w-fit after:absolute after:inset-0"
                variant="white"
                aria-labelledby={getAriaLabelId(id, index)}
              >
                {linkProps.label}
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CtaGroup
