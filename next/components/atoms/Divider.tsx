import cx from 'classnames'

import Waves from '../../assets/waves.svg'

type DividerProps = {
  color?: 'default' | 'primary'
}

const Divider = ({ color = 'default' }: DividerProps) => {
  return (
    <div
      className={cx('flex items-center', {
        'text-primary': color === 'primary',
        'text-border': color === 'default',
      })}
    >
      <div className="mr-3 h-[2px] grow bg-current" />
      <div className="shrink">
        <Waves />
      </div>
      <div className="ml-3 h-[2px] grow bg-current" />
    </div>
  )
}

export default Divider
