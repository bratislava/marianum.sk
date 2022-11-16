import { PropsWithChildren } from 'react'

type SectionBoxedProps = PropsWithChildren<{
  title?: string
}>

const SectionBoxed = ({ title, children }: SectionBoxedProps) => (
  <div className="bg-white py-4 md:py-6">
    {title && (
      <div className="px-4 md:px-6">
        <h2 className="pb-4 text-h5 md:pb-6">{title}</h2>
      </div>
    )}
    <div className="px-4 md:px-6">{children}</div>
  </div>
)

export default SectionBoxed
