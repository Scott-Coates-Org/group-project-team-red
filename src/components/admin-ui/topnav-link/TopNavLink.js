import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { TopNavLinkContainer, BaseLink, ProfileLink } from './TopNavLink.styles'

export const TOP_NAV_LINK_TYPES = {
  base: 'base',
  profile: 'profile',
}

const getLink = (linkType = TOP_NAV_LINK_TYPES.base) => {
  return {
    [TOP_NAV_LINK_TYPES.base]: BaseLink,
    [TOP_NAV_LINK_TYPES.profile]: ProfileLink,
  }[linkType]
}

const TopNavLink = (props) => {
  const { route, icon, linkType } = props

  const CustomLink = getLink(linkType)

  return (
    <TopNavLinkContainer>
      <CustomLink to={route}>
        <FontAwesomeIcon icon={icon} />
      </CustomLink>
    </TopNavLinkContainer>
  )
}

export default TopNavLink
