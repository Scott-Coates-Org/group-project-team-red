import { ProductsCollapseContainer } from './ProductsCollapse.styles'

import { faTags } from '@fortawesome/free-solid-svg-icons'

import NavLink, { NAV_LINK_TYPES } from '../nav-link/NavLink'

const ProductsCollapse = () => {
  return (
    <ProductsCollapseContainer>
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/admin/products"
        label="All products"
        icon={faTags}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/admin/products"
        label="Rooms"
        icon={faTags}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/admin/products"
        label="Passes"
        icon={faTags}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/admin/products"
        label="Add-ons"
        icon={faTags}
      />
    </ProductsCollapseContainer>
  )
}

export default ProductsCollapse
