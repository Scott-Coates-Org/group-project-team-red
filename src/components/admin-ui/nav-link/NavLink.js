import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavLinkContainer, NavAnchor } from './NavLink.styles'

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
