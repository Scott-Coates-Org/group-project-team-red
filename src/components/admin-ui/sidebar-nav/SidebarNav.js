import NavLink from '../nav-link/NavLink'

import { adminRoutes } from '../dashboard/Dashboard'
import { SidebarNavContainer } from './SidebarNav.styles'

const SidebarNav = () => {
  return (
    <SidebarNavContainer>
      {adminRoutes.map(({ path, label, icon }) => {
        return (
          <NavLink
            route={path}
            label={label.toUpperCase()}
            icon={icon}
            key={label}
          ></NavLink>
        )
      })}

      {/* <NavLink route="/dashboard" label="DASHBOARD" icon={faHome}></NavLink>

      <NavLink route="/dashboard" label="BOOKINGS" icon={faCalendar}></NavLink>

      <NavLink route="/dashboard" label="PRODUCTS" icon={faTags}></NavLink>

      <NavLink
        route="/dashboard"
        label="CUSTOMERS"
        icon={faUserFriends}
      ></NavLink>

      <NavLink route="/dashboard" label="REPORTS" icon={faChartLine}></NavLink>

      <NavLink route="/dashboard" label="SETTINGS" icon={faCog}></NavLink> */}
    </SidebarNavContainer>
  )
}

export default SidebarNav