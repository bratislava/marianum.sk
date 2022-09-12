import FacebookIcon from '../../../assets/facebook.svg'
import InstagramIcon from '../../../assets/instagram.svg'
import LinkedInIcon from '../../../assets/linked_in.svg'
import TwitterIcon from '../../../assets/twitter.svg'
import YoutubeIcon from '../../../assets/youtube.svg'
import { SocialFragment } from '../../../graphql'
import MLink from '../../atoms/MLink'

export type FooterSocialsProps = {
  social: SocialFragment
}

const FooterSocials = ({ social }: FooterSocialsProps) => {
  return social.facebook ||
    social.instagram ||
    social.youtube ||
    social.twitter ||
    social.linkedin ? (
    <div className="hidden items-center gap-4 pt-3 md:flex">
      {social.facebook && (
        <MLink noStyles href={social.facebook}>
          <FacebookIcon />
        </MLink>
      )}
      {social.instagram && (
        <MLink noStyles href={social.instagram}>
          <InstagramIcon />
        </MLink>
      )}
      {social.linkedin && (
        <MLink noStyles href={social.linkedin}>
          <LinkedInIcon />
        </MLink>
      )}
      {social.youtube && (
        <MLink noStyles href={social.youtube}>
          <YoutubeIcon />
        </MLink>
      )}
      {social.twitter && (
        <MLink noStyles href={social.twitter}>
          <TwitterIcon />
        </MLink>
      )}
    </div>
  ) : null
}

export default FooterSocials
