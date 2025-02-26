import { ReactNode } from 'react'

export type AccordionProps = {
  children?: ReactNode
}

const AccordionGroup = ({ children }: AccordionProps) => {
  return (
    <div role="group" className="flex w-full flex-col gap-5">
      {children}
    </div>
  )
}

export default AccordionGroup
