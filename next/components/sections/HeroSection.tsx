import React from 'react'

import HomeIcon from '../../assets/home.svg'
import { CtaButtonFragment } from '../../graphql'
import Breadcrumbs from '../atoms/Breadcrumbs'
import Button from '../atoms/Button'
import MLink from '../atoms/MLink'

type HeroSectionProps = {
  title?: string | null | undefined
  description?: string | null | undefined
  cta?: CtaButtonFragment | null | undefined
}

const HeroSection = ({ title, description, cta }: HeroSectionProps) => {
  return (
    <div className="bg-primary-dark text-white/72">
      <div className="container relative mx-auto px-4">
        <Breadcrumbs className="md:pt-8">
          {[
            {
              label: <HomeIcon />,
              link: '#home',
            },
            {
              label: 'very',
              link: '#very',
            },
          ].map(({ label, link }) => (
            <MLink key={link} href={link} noStyles className="underline">
              {label}
            </MLink>
          ))}
        </Breadcrumbs>
        <div className="py-5 text-white empty:hidden md:w-[648px] md:pb-14 md:pt-6">
          {title && <h1>{title}</h1>}
          {description && <p className="mt-3 text-white opacity-72">{description}</p>}
          {cta && (
            <Button href={cta.url} className="mt-6">
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroSection
