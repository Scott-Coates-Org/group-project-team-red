import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavLinkContainer, StyledLink } from './NavLink.styles'

const NavLink = (props) => {
  const { route, label, icon } = props

  return (
    <NavLinkContainer>
      <FontAwesomeIcon icon={icon} />
      <StyledLink to={route}>{label}</StyledLink>
    </NavLinkContainer>
  )
}

export default NavLink
