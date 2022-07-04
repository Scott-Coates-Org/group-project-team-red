import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  NavLinkContainer,
  BaseLink,
  CollapseLink,
  TopNavSmallLink,
  TopNavLargeLink,
} from './NavLink.styles'

export const NAV_LINK_TYPES = {
  base: 'base',
  collapse: 'collapse',
  topNavSmall: 'topNavSmall',
  topNavLarge: 'topNavLarge',
}

const getLinkType = (linkType = NAV_LINK_TYPES.base) => {
  return {
    [NAV_LINK_TYPES.base]: BaseLink,
    [NAV_LINK_TYPES.collapse]: CollapseLink,
    [NAV_LINK_TYPES.topNavSmall]: TopNavSmallLink,
    [NAV_LINK_TYPES.topNavLarge]: TopNavLargeLink,
  }[linkType]
}

const NavLink = ({ linkType, route, label = null, icon }) => {
  const CustomLink = getLinkType(linkType)

  return (
    <NavLinkContainer>
      <CustomLink to={route}>
        <FontAwesomeIcon icon={icon} />

        {label && <label>{label}</label>}
      </CustomLink>
    </NavLinkContainer>
  )
}

export default NavLink
