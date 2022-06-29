//styles
import { StyledModal } from './styled/Modal.styles'
import { StyledFlexColumn } from './styled/FlexColumn.styles'
import { StyledSelection } from './styled/Select.styles'

//assets
import { FaArrowLeft } from 'react-icons/fa'

import { StyledFlexRow } from './styled/FlexRow.styles'
import { useState } from 'react'
import { StyledInfoBlue } from './styled/InfoBlue.styles'

import ProductList from './ProductList'
import { StyledButton } from './styled/Button.styles'

export default function ProductSelection() {
  const [product, setProduct] = useState('')
  const [showProducts, setShowProducts] = useState(false)

  const handleSelect = (e) => {
    setProduct(e.target.value)
    setShowProducts(true)
  }
  console.log(product, showProducts)
  return (
    <StyledModal width="40%">
      <StyledFlexColumn
        style={{
          marginTop: '4em',
        }}
      >
        <div>
          <FaArrowLeft /> <span>Step 2 of 4</span>
        </div>

        <h3>Choose product</h3>
      </StyledFlexColumn>
      <StyledFlexRow className="custom-select">
        <StyledSelection value={product} onChange={(e) => handleSelect(e)}>
          <option>Choose product</option>
          <option value="Jump pass">Jump Pass</option>

          <option value="Socks">Socks</option>

          <option value="Aditional">Aditional</option>
        </StyledSelection>
      </StyledFlexRow>
      <StyledInfoBlue>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus culpa
        ab aliquam ipsa eveniet non atque dolorum, dolores numquam cumque iure
        exercitationem quibusdam obcaecati maiores similique laboriosam
        temporibus aspernatur tempora!
      </StyledInfoBlue>
      {showProducts && <ProductList product={product} />}
      <StyledButton width="100%">Continue</StyledButton>
    </StyledModal>
  )
}
