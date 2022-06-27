import {
  faHome,
  faChartLine,
  faCog,
  faUserFriends,
  faTags,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'

import NavLink from '../nav-link/NavLink'

import { SidebarNavContainer } from './SidebarNav.styles'

const SidebarNav = () => {
  return (
    <SidebarNavContainer>
      <NavLink route="/" label="DASHBOARD" icon={faHome}></NavLink>

      <NavLink route="/" label="BOOKINGS" icon={faCalendar}></NavLink>

      <NavLink route="/" label="PRODUCTS" icon={faTags}></NavLink>

      <NavLink route="/" label="CUSTOMERS" icon={faUserFriends}></NavLink>

      <NavLink route="/" label="REPORTS" icon={faChartLine}></NavLink>

      <NavLink route="/" label="SETTINGS" icon={faCog}></NavLink>
    </SidebarNavContainer>
  )
}

export default SidebarNav
