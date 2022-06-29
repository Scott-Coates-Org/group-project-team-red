//style
import { StyledFlexColumn } from './styled/FlexColumn.styles'
import { StyledFlexRow } from './styled/FlexRow.styles'
import { StyledBox } from './styled/Box.styles'
//assets
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
//components

import { useState } from 'react'

import Product from './Product'

export default function ProductList({ product }) {
  const [showProductOptions, setShowProductOptions] = useState(false)
  return (
    <StyledFlexColumn style={{ borderTop: ' 2px solid #888' }}>
      <StyledFlexRow>
        {product} (click on the arrow to the rigth)
        <StyledBox
          onClick={() => setShowProductOptions((prevShow) => !prevShow)}
        >
          {showProductOptions ? <FaArrowUp /> : <FaArrowDown />}
        </StyledBox>
      </StyledFlexRow>
      {showProductOptions && <Product />}
    </StyledFlexColumn>
  )
}
