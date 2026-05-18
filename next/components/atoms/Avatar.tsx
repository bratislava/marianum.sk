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
    <div className="border-border text-size-p-small flex size-12 shrink-0 items-center justify-center rounded-full border bg-white font-semibold uppercase">
      {initials}
    </div>
  )
}

export default Avatar
