import { WavesSvg } from '@/assets'
import cn from '@/utils/cn'

type DividerProps = {
  color?: 'default' | 'primary'
  className?: string
}

const Divider = ({ color = 'default', className }: DividerProps) => {
  return (
    <div
      className={cn(
        'flex items-center',
        {
          'text-primary': color === 'primary',
          'text-border': color === 'default',
        },
        className,
      )}
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
