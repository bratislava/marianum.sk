import cx from 'classnames'

const RadioCircle = ({
  checked,
  disabled,
  active,
}: {
  checked: boolean
  disabled: boolean
  active: boolean
}) => {
  return (
    /* It's recommended to add `group` classname to parent `RadioGroup.Option` for hover to work properly. */
    <div
      className={cx(
        'grid h-5 w-5 place-content-center rounded-full border-2 hover:border-primary-dark group-hover:border-primary-dark',
        {
          'opacity-50': disabled,
          'border-primary': !active,
          'border-primary-dark': active,
          'bg-white': !checked,
          'cursor-pointer': !disabled,
        },
      )}
    >
      <div
        className={cx(
          'h-3 w-3 rounded-full bg-primary transition-transform group-hover:bg-primary-dark',
          checked ? 'scale-1' : 'scale-0',
        )}
      />
    </div>
  )
}

export default RadioCircle
