import ProductsList from '../ProductsList'
import RoomsList from 'components/admin-ui/rooms/RoomsList'
import AddOnsList from 'components/admin-ui/add-ons/AddOnsList'

const ProductsPage = () => {
  return (
    <div className="products-page-container">
      <ProductsList />
      <RoomsList />
      <AddOnsList />
    </div>
  )
}

export default ProductsPage
