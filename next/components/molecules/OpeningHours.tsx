import { OpeningHoursFragment } from '@graphql'

type OpeningHoursProps = {
  openingHours: OpeningHoursFragment
}

const OpeningHours = ({ openingHours }: OpeningHoursProps) => {
  return (
    <div className="flex grow flex-col gap-3">
      {openingHours.days?.map((record, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="flex max-w-[360px]">
          <div className="grow font-semibold">{record?.label}</div>
          <div>{record?.time}</div>
        </div>
      ))}
    </div>
  )
}

export default OpeningHours
