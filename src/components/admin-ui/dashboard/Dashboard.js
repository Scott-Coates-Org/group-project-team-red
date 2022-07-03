import {
  faHome,
  faChartLine,
  faCog,
  faUserFriends,
  faTags,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons'
import BookingsPage from '../bookings/bookings-page/BookingsPage'
import CustomersPage from '../customers/customers-page/CustomersPage'
import HomePage from '../home-page/HomePage'
import ProductsPage from '../products/products-page/ProductsPage'
import ReportsPage from '../reports/reports-page/ReportsPage'
import SettingsPage from '../settings/settings-page/SettingsPage'
import SidebarNav from '../sidebar-nav/SidebarNav'
import {
  DashboardContainer,
  BottomContainer,
  ContentContainer,
} from './Dashboard.styles'
import TopNav from '../top-nav/TopNav'
import { Route } from 'react-router-dom'

export const adminRoutes = [
  {
    path: '/admin/home',
    label: 'home',
    icon: faHome,
    component: () => <HomePage />,
  },
  {
    path: '/admin/bookings',
    label: 'bookings',
    icon: faCalendar,
    component: () => <BookingsPage />,
  },
  {
    path: '/admin/products',
    label: 'products',
    icon: faTags,
    component: () => <ProductsPage />,
  },
  {
    path: '/admin/customers',
    label: 'customers',
    icon: faUserFriends,
    component: () => <CustomersPage />,
  },
  {
    path: '/admin/reports',
    label: 'reports',
    icon: faChartLine,
    component: () => <ReportsPage />,
  },
  {
    path: '/admin/settings',
    label: 'settings',
    icon: faCog,
    component: () => <SettingsPage />,
  },
]

const Dashboard = () => {
  return (
    <DashboardContainer>
      <TopNav></TopNav>
      <BottomContainer>
        <SidebarNav></SidebarNav>
        <ContentContainer>
          {adminRoutes.map(({ path, component }) => {
            return <Route path={path} key={path} render={component}></Route>
          })}
        </ContentContainer>
      </BottomContainer>
    </DashboardContainer>
  )
}

export default Dashboard
