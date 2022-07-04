import {
  TopNavContainer,
  LogoContainer,
  FrogLogo,
  TopNavButtonsContainer,
} from './TopNav.styles'
import MainLogo from '../../Customer/assets/logo_cropped.png'
import {
  faQuestionCircle,
  faUserCircle,
  faBell,
} from '@fortawesome/free-solid-svg-icons'

import NavLink, { NAV_LINK_TYPES } from '../nav-link/NavLink'

import AdminCollapse from '../admin-collapse/AdminCollapse'

import { useState } from 'react'
import NavButton, { NAV_BUTTON_TYPES } from '../nav-button/NavButton'

const TopNav = () => {
  const [adminCollapseIsOpen, setAdminCollapseIsOpen] = useState(false)

  const handleAdminClick = () => {
    setAdminCollapseIsOpen(!adminCollapseIsOpen)
  }

  return (
    <TopNavContainer>
      <LogoContainer>
        <FrogLogo src={MainLogo} />
      </LogoContainer>
      <TopNavButtonsContainer>
        <NavLink
          linkType={NAV_LINK_TYPES.topNavSmall}
          route="/admin/settings"
          icon={faBell}
        />
        <NavLink
          linkType={NAV_LINK_TYPES.topNavSmall}
          route="/admin/help"
          icon={faQuestionCircle}
        />
        <NavButton
          buttonType={NAV_BUTTON_TYPES.topNavLarge}
          route="/admin/profile"
          icon={faUserCircle}
          onClick={handleAdminClick}
        />
        {adminCollapseIsOpen && <AdminCollapse></AdminCollapse>}
      </TopNavButtonsContainer>
    </TopNavContainer>
  )
}

export default TopNav
