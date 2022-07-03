import { BookingsCollapseContainer } from './BookingsCollapse.styles'

import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import NavLink, { NAV_LINK_TYPES } from '../nav-link/NavLink'

const BookingsCollapse = () => {
  return (
    <BookingsCollapseContainer>
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/bookings"
        label="All bookings"
        icon={faCalendar}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/bookings"
        label="Create booking"
        icon={faCalendar}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/bookings"
        label="Daily capacity"
        icon={faCalendar}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/bookings"
        label="Weekly availability"
        icon={faCalendar}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/bookings"
        label="Calendar"
        icon={faCalendar}
      />
    </BookingsCollapseContainer>
  )
}

export default BookingsCollapse
