import {
  faHome,
  faChartLine,
  faCog,
  faUserFriends,
  faTags,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'

import NavLink from '../nav-link/NavLink'
import NavButton from '../nav-button/NavButton'
// import { adminRoutes } from '../dashboard/Dashboard'
import { SidebarNavContainer } from './SidebarNav.styles'
import ProductsCollapse from '../products-collapse/ProductsCollapse'
import BookingsCollapse from '../bookings-collapse/BookingsCollapse'
import { useState } from 'react'

const SidebarNav = () => {
  const [productsCollapseIsOpen, setProductsCollapseIsOpen] = useState(false)
  const [bookingsCollapseIsOpen, setBookingsCollapseIsOpen] = useState(false)

  const handleProductsClick = () => {
    setProductsCollapseIsOpen(!productsCollapseIsOpen)
  }

  const handleBookingsClick = () => {
    setBookingsCollapseIsOpen(!bookingsCollapseIsOpen)
  }

  return (
    <SidebarNavContainer>
      {/* {adminRoutes.map(({ path, label, icon }) => {
        if (label === 'products') {
          return (
            <NavLink
              route={path}
              label={label.toUpperCase()}
              icon={icon}
              key={label}
              onClick={handleClick}
            ></NavLink>
          )
        } else {
          return (
            <NavLink
              route={path}
              label={label.toUpperCase()}
              icon={icon}
              key={label}
            ></NavLink>
          )
        }
      })} */}

      <NavLink route="/admin/home" label="HOME" icon={faHome}></NavLink>

      <NavButton
        label="BOOKINGS"
        icon={faCalendar}
        onClick={handleBookingsClick}
      ></NavButton>
      {bookingsCollapseIsOpen && <BookingsCollapse></BookingsCollapse>}

      <NavButton
        label="PRODUCTS"
        icon={faTags}
        onClick={handleProductsClick}
      ></NavButton>
      {productsCollapseIsOpen && <ProductsCollapse></ProductsCollapse>}

      <NavLink
        route="/admin/customers"
        label="CUSTOMERS"
        icon={faUserFriends}
      ></NavLink>

      <NavLink
        route="/admin/reports"
        label="REPORTS"
        icon={faChartLine}
      ></NavLink>

      <NavLink route="/admin/settings" label="SETTINGS" icon={faCog}></NavLink>
    </SidebarNavContainer>
  )
}

export default SidebarNav
