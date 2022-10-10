import FacebookIcon from '../../../assets/facebook.svg'
import InstagramIcon from '../../../assets/instagram.svg'
import LinkedInIcon from '../../../assets/linked_in.svg'
import TwitterIcon from '../../../assets/twitter.svg'
import YoutubeIcon from '../../../assets/youtube.svg'
import { SocialItemFragment } from '../../../graphql'
import MLink from '../../atoms/MLink'

export type FooterSocialsProps = {
  socials: SocialItemFragment[]
}

const FooterSocials = ({ socials }: FooterSocialsProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-primary lg:flex-row lg:gap-8">
      {socials.map((social, index) => (
        <MLink
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          noArrow
          href={social.url}
          target="_blank"
        >
          <span className="inline-flex items-center gap-2.5">
            {social.icon === 'facebook' && <FacebookIcon />}
            {social.icon === 'instagram' && <InstagramIcon />}
            {social.icon === 'linkedin' && <LinkedInIcon />}
            {social.icon === 'twitter' && <TwitterIcon />}
            {social.icon === 'youtube' && <YoutubeIcon />}
            {social.title}
          </span>
        </MLink>
      ))}
    </div>
  )
}

export default FooterSocials
