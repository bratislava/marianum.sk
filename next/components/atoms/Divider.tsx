import cx from 'classnames'

import { WavesSvg } from '@/assets'

type DividerProps = {
  color?: 'default' | 'primary'
  className?: string
}

const Divider = ({ color = 'default', className }: DividerProps) => {
  return (
    <div
      className={cx('flex items-center', className, {
        'text-primary': color === 'primary',
        'text-border': color === 'default',
      })}
    >
      <div className="mr-3 h-[2px] grow bg-current" />
      <div className="shrink">
        <WavesSvg />
      </div>
      <div className="ml-3 h-[2px] grow bg-current" />
    </div>
  )
}

export default Divider
