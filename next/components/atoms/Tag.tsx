import classnames from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

type TagProps = DetailedHTMLProps<InputHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode
}

const Tag = ({ children, className, ...rest }: TagProps) => {
  return (
    <div
      {...rest}
      className={classnames(
        'pointer-events-none flex h-6 w-fit items-center whitespace-nowrap rounded-full bg-white px-2 text-sm font-semibold',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Tag
