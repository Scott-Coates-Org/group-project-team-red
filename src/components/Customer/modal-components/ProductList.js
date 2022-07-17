import { useState } from 'react'
//style
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledRange } from '../styled/Range.styles'
import { StyledButton } from '../styled/Button.styles'
import { StyledInfoBlue } from '../styled/InfoBlue.styles'
import { StyledModal } from '../styled/Modal.styles'

//assets
import { FaArrowLeft } from 'react-icons/fa'

//components
import Product from './Product'
import AddOnsSelection from './AddOnsSelection'
import { useSelector } from 'react-redux'
import { StyledFlexRow } from '../styled/FlexRow.styles'

//modal for selection of jump pass
export default function ProductList({ setShowProductModal }) {
  const [showAddOns, setShowAddOns] = useState(false)

  // TODO: Replace dummy text
  // TODO: Bug on continue button, if customer selects product and time, move to step 3 and selects an add-on, then move back and removes the product the button is still rendered when it shouldn't

  const cart = useSelector(({ cart }) => cart.data)

  const goBack = () => {
    setShowProductModal(false)
  }

  return (
    <StyledModal id="step2" width="35%" height="100%">
      <StyledFlexColumn
        style={{ borderTop: ' 2px solid #888', display: 'block' }}
      >
        <StyledFlexColumn
          style={{
            marginTop: '4em',
          }}
        >
          <hr />
          <StyledRange bg="#d9d9d9" width="35%">
            <StyledRange bg="#35bd21" width="20%" />
          </StyledRange>
          <div>
            {/* TODO: Functionality works, need to implement the clickable hover effect */}
            <FaArrowLeft onClick={goBack} />
            <span>Step 2 of 4</span>
          </div>

          <h3>Choose Product</h3>
        </StyledFlexColumn>

        <StyledInfoBlue>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          culpa ab aliquam ipsa eveniet non atque dolorum, dolores numquam
          cumque iure exercitationem quibusdam obcaecati maiores similique
          laboriosam temporibus aspernatur tempora!
        </StyledInfoBlue>
        <StyledFlexColumn>
          <h4>Jump pass options</h4>
          <Product />
          <StyledFlexRow justify="space-between">
            <StyledButton
              onClick={goBack}
              bg="#d9d9d9"
              color="#000"
              width="130px"
            >
              Back
            </StyledButton>
            {cart.length && cart[0].startingTime && (
              <StyledButton
                width="230px"
                color="#fff"
                onClick={() => {
                  setShowAddOns(true)
                }}
              >
                Continue
              </StyledButton>
            )}
          </StyledFlexRow>

          {showAddOns && <AddOnsSelection setShowAddOns={setShowAddOns} />}
        </StyledFlexColumn>
      </StyledFlexColumn>
    </StyledModal>
  )
}
