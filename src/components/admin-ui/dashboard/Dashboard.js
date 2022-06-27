import SidebarNav from '../sidebar-nav/sidebar-nav.component'
import ProductsList from '../products/ProductsList'
// import ProductsForm from '../products/ProductForm'

import { DashboardContainer } from './dashboard.styles'
import RoomsList from '../rooms/RoomsList'

const Dashboard = () => {
  return (
    <DashboardContainer>
      <SidebarNav></SidebarNav>
      <div
        className="products-container"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <ProductsList />
        <RoomsList />
      </div>
    </DashboardContainer>
  )
}

export default Dashboard
