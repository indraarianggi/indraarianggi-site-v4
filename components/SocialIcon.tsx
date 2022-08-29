// Icons taken from: https://simpleicons.org/
import Mail from '@public/icons/mail.svg'
import Github from '@public/icons/github.svg'
import Facebook from '@public/icons/facebook.svg'
import Youtube from '@public/icons/youtube.svg'
import Linkedin from '@public/icons/linkedin.svg'
import Twitter from '@public/icons/twitter.svg'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
}

type TSocialIconProps = {
  kind: 'mail' | 'github' | 'facebook' | 'youtube' | 'linkedin' | 'twitter'
  href: string
  size?: number
}

const SocialIcon = ({ kind, href, size = 4 }: TSocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-400 transition hover:text-gray-500"
      target="_blank"
      rel="noopener noreferrer"
      href={href}>
      <span className="sr-only">{kind}</span>
      <SocialSvg className={`fill-current h-${size} w-${size}`} />
    </a>
  )
}

export default SocialIcon
