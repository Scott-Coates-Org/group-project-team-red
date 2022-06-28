import {
  TopNavContainer,
  LogoContainer,
  FrogLogo,
  TopNavButtonsContainer,
} from './TopNav.styles'
import TopNavLink from '../topnav-link/TopNavLink'
import MainLogo from '../../Customer/assets/logo_cropped.png'
import {
  faQuestionCircle,
  faUserCircle,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import { TOP_NAV_LINK_TYPES } from '../topnav-link/TopNavLink'

const TopNav = () => {
  return (
    <TopNavContainer>
      <LogoContainer>
        <FrogLogo src={MainLogo} />
      </LogoContainer>
      <TopNavButtonsContainer>
        <TopNavLink
          route="/settings"
          icon={faBell}
          linkType={TOP_NAV_LINK_TYPES.base}
        />
        <TopNavLink
          route="/help"
          icon={faQuestionCircle}
          linkType={TOP_NAV_LINK_TYPES.base}
        />
        <TopNavLink
          route="/profile"
          icon={faUserCircle}
          linkType={TOP_NAV_LINK_TYPES.profile}
        />
      </TopNavButtonsContainer>
    </TopNavContainer>
  )
}

export default TopNav
