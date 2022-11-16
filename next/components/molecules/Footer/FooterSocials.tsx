import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon, YoutubeIcon } from '@assets/icons'
import MLink from '@components/atoms/MLink'
import { SocialItemFragment } from '@graphql'

export type FooterSocialsProps = {
  socials: SocialItemFragment[]
}

const FooterSocials = ({ socials }: FooterSocialsProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-primary lg:flex-row lg:gap-8">
      {socials.map((social, index) => (
        <MLink
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          noArrow
          href={social.url}
          target="_blank"
        >
          <div className="inline-flex max-w-[200px] flex-col items-center gap-1 md:gap-2.5 lg:max-w-none lg:flex-row">
            <div>
              {social.icon === 'facebook' && <FacebookIcon />}
              {social.icon === 'instagram' && <InstagramIcon />}
              {social.icon === 'linkedin' && <LinkedInIcon />}
              {social.icon === 'twitter' && <TwitterIcon />}
              {social.icon === 'youtube' && <YoutubeIcon />}
            </div>
            <div>{social.title}</div>
          </div>
        </MLink>
      ))}
    </div>
  )
}

export default FooterSocials
