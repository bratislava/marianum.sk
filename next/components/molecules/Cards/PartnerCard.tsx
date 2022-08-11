import cx from 'classnames'
import React, { useMemo } from 'react'
import { useHover } from 'use-hooks'

import OpenInNewIcon from '../../../assets/open_in_new.svg'
import Button from '../../atoms/Button'
import CardBox, { CardBoxProps } from '../../atoms/Card/CardBox'
import CardContent from '../../atoms/Card/CardContent'
import MLink from '../../atoms/MLink'

type PartnerCardProps = {
  title: string
  linkHref: string
  imageUrl: string
  imageAlt: string
} & CardBoxProps

const PartnerCard = ({ title, linkHref, imageUrl, imageAlt, ...props }: PartnerCardProps) => {
  return (
    <CardBox {...props}>
      <CardContent className="justify-between gap-y-4">
        <img src={imageUrl} alt={imageAlt} />
        <div className="flex flex-col gap-y-2 items-center">
          <h5 className="text-heading text-h5 font-bold group-hover:underline">{title}</h5>
          <Button
            variant="plain-primary"
            className="inline-block"
            groupHover
            noPadding
            startIcon={<OpenInNewIcon />}
          >
            Zobraziť viac
          </Button>
        </div>
      </CardContent>
    </CardBox>
  )
}

export default PartnerCard
