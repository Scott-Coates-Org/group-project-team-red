import { AdminCollapseContainer } from './AdminCollapse.styles'

import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import NavLink, { NAV_LINK_TYPES } from '../nav-link/NavLink'

const AdminCollapse = () => {
  return (
    <AdminCollapseContainer>
      <NavLink
        linkType={NAV_LINK_TYPES.base}
        route="/admin/profile"
        label="Profile"
        icon={faUser}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.base}
        route="/admin/logout"
        label="Logout"
        icon={faSignOutAlt}
      />
    </AdminCollapseContainer>
  )
}

export default AdminCollapse
