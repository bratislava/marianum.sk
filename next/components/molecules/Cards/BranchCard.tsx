import React from 'react'

import PlaceIcon from '../../../assets/place.svg'
import CardBox from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'

type BranchCardProps = {
  branchName: string
  address: string
  openingHoursText: string
  linkHref: string
}

const BranchCard = ({ branchName, address, openingHoursText, linkHref }: BranchCardProps) => {
  return (
    <CardBox hover={false} border={false}>
      <CardContent className="gap-y-5 md:gap-y-10" largePadding>
        <div>
          <h5 className="mb-1 line-clamp-3 md:mb-3">{branchName}</h5>
          <div className="flex items-center">
            <span className="mr-2 text-primary">
              <PlaceIcon />
            </span>
            <span>{address}</span>
          </div>
        </div>
        <div>
          {/* TODO: Translation */}
          <span className="mb-1 block md:mb-2">Otváracie hodiny</span>
          <p>
            {/* TODO: Maybe would be multiline */}
            {openingHoursText}
          </p>
        </div>
        <div>
          <MLink href={linkHref} noArrow className="inline-block">
            {/* TODO: Translation */}
            Zobraziť viac
          </MLink>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default BranchCard