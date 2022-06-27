import SidebarNav from '../sidebar-nav/SidebarNav'
import ProductsList from '../products/ProductsList'
// import ProductsForm from '../products/ProductForm'

import { DashboardContainer } from './Dashboard.styles'

const Dashboard = () => {
  return (
    <DashboardContainer>
      <SidebarNav></SidebarNav>
      <div
        className="products-container"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <ProductsList />
      </div>
    </DashboardContainer>
  )
}

export default Dashboard
