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
        'grid place-content-center w-5 h-5 border border-2 rounded-full group-hover:border-primary-dark hover:border-primary-dark',
        {
          'opacity-50': disabled,
          'border-primary': !active,
          'border-primary-dark': active,
          'bg-white': !checked,
          'cursor-pointer': !disabled,
        },
      )}
    >
      {checked && (
        <div className={cx('w-3 h-3 rounded-full bg-primary group-hover:bg-primary-dark')} />
      )}
    </div>
  )
}

export default RadioCircle
