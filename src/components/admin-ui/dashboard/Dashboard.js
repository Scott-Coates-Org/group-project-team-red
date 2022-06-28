import SidebarNav from '../sidebar-nav/SidebarNav'
import { DashboardContainer, BottomContainer } from './Dashboard.styles'
import TopNav from '../top-nav/TopNav'
import ProductsList from '../products/ProductsList'
import RoomsList from '../rooms/RoomsList'
import AddOnsList from '../add-ons/AddOnsList'

const Dashboard = () => {
  return (
    <DashboardContainer>
      <TopNav></TopNav>
      <BottomContainer>
        <SidebarNav></SidebarNav>
        <div
          className="products-container"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <ProductsList />
          <RoomsList />
          <AddOnsList />
        </div>
      </BottomContainer>
    </DashboardContainer>
  )
}

export default Dashboard
