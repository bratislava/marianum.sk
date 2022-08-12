import Image from 'next/image'

import HomeIcon from '../../assets/home.svg'
import { CtaButtonFragment, UploadImageEntityFragment } from '../../graphql'
import Breadcrumbs from '../atoms/Breadcrumbs'
import Button from '../atoms/Button'
import MLink from '../atoms/MLink'

type HeroSectionProps = {
  title?: string | null | undefined
  perex?: string | null | undefined
  cta?: CtaButtonFragment | null | undefined
  image?: UploadImageEntityFragment | null | undefined
}

const HeroSection = ({ title, perex, cta, image }: HeroSectionProps) => {
  return (
    <div className="bg-primary-dark text-white/72">
      <div className="container relative mx-auto px-4">
        <Breadcrumbs className="sm:pt-8">
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
        <div className="py-5 empty:hidden md:w-[648px] md:pb-14 md:pt-6">
          {title && <h1 className="text-white">{title}</h1>}
          {perex && <p className="mt-3">{perex}</p>}
          {cta && (
            <Button href={cta.url} className="mt-6">
              {cta.label}
            </Button>
          )}
        </div>
      </div>
      {image && (
        <div className="container relative mx-auto -mb-18 h-[188px] w-full sm:h-[238px] md:h-[287px] lg:h-[387px] xl:h-[440px]">
          <Image
            src={image.attributes?.url ?? ''}
            alt={image.attributes?.alternativeText ?? ''}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </div>
      )}
    </div>
  )
}

export default HeroSection
