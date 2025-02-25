import { useMemo } from 'react'

type AvatarProps = {
  name: string
}

const Avatar = ({ name }: AvatarProps) => {
  const initials = useMemo(
    () =>
      name
        .split(' ')
        .slice(0, 2)
        .map((i) => i.charAt(0))
        .join(''),
    [name],
  )

  return (
    <div className="flex size-12 items-center justify-center rounded-full border border-border bg-white text-sm font-semibold uppercase">
      {initials}
    </div>
  )
}

export default Avatar
