import { PropsWithChildren } from 'react'

import CheckIcon from '../../assets/check.svg'

const TickListItem = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-primary">
        <CheckIcon />
      </span>
      {children}
    </div>
  )
}

export default TickListItem
