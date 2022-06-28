import SidebarNav from '../sidebar-nav/SidebarNav'
import { DashboardContainer } from './Dashboard.styles'

import ProductsList from '../products/ProductsList'
import RoomsList from '../rooms/RoomsList'
import AddOnsList from '../add-ons/AddOnsList'

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
        <AddOnsList />
      </div>
    </DashboardContainer>
  )
}

export default Dashboard
