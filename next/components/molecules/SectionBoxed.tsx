import { PropsWithChildren } from 'react'

type SectionBoxedProps = PropsWithChildren<{
  title?: string
}>

const SectionBoxed = ({ title, children }: SectionBoxedProps) => (
  <div className="bg-white py-4 md:py-6">
    {title && (
      <div className="px-4 md:px-6">
        <h2 className="text-size-h5-r lg:text-size-h5 pb-4 md:pb-6">{title}</h2>
      </div>
    )}

    <div className="px-4 md:px-6">{children}</div>
  </div>
)

export default SectionBoxed
