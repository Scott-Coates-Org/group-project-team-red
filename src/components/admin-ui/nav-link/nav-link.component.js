import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavLinkContainer, NavAnchor } from './nav-link.styles'

const NavLink = (props) => {
  const { route, label, icon } = props

  return (
    <NavLinkContainer>
      <FontAwesomeIcon icon={icon} />
      <NavAnchor href={route}>{label}</NavAnchor>
    </NavLinkContainer>
  )
}

export default NavLink
