import { ProductsCollapseContainer } from './ProductsCollapse.styles'

import { faTags } from '@fortawesome/free-solid-svg-icons'

import NavLink, { NAV_LINK_TYPES } from '../nav-link/NavLink'

const ProductsCollapse = () => {
  return (
    <ProductsCollapseContainer>
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/products"
        label="ALL PRODUCTS"
        icon={faTags}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/products"
        label="ROOMS"
        icon={faTags}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/products"
        label="PASSES"
        icon={faTags}
      />
      <NavLink
        linkType={NAV_LINK_TYPES.collapse}
        route="/products"
        label="ADD-ONS"
        icon={faTags}
      />
    </ProductsCollapseContainer>
  )
}

export default ProductsCollapse
