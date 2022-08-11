import React from 'react'

import PlaceIcon from '../../../assets/place.svg'
import Button from '../../atoms/Button'
import CardBox from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'

type BranchCardProps = {
  branchName: string
  address: string
  openingHoursText: string
}

const BranchCard = ({ branchName, address, openingHoursText }: BranchCardProps) => {
  return (
    <CardBox hover={false} border={false}>
      <CardContent className="gap-y-5 md:gap-y-10" largePadding>
        <div>
          <h5 className="mb-3 text-h5 font-bold">{branchName}</h5>
          <div className="flex items-center">
            <span className="mr-2 text-primary">
              <PlaceIcon />
            </span>
            <span>{address}</span>
          </div>
        </div>
        <div>
          <span className="mb-2 block">Otváracie hodiny</span>
          <p>
            {/* TODO: Multiline */}
            {openingHoursText}
          </p>
        </div>
        <div>
          <Button variant="plain-primary" className="inline-block" noPadding>
            Zobraziť viac
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default BranchCard
