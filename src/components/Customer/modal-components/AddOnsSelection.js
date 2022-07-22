import { useState } from 'react'
//style
import { StyledModal } from '../styled/Modal.styles'
import { StyledRange } from '../styled/Range.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledButton } from '../styled/Button.styles'

//assets
import { FaArrowLeft } from 'react-icons/fa'
import Socks from '../assets/socks.jpg'

//components
import ItemList from './ItemList'

import CustomerDetails from './CustomerDetail'

//components showing add-ons options
export default function AddOnsSelection({ setShowAddOns }) {
  const [showCustomerDetailsForm, setShowCustomerDetailsForm] = useState(false)

  const goBack = () => {
    setShowAddOns(false)
  }

  return (
    <StyledFlexRow>
      <StyledModal top={0} left="0" height="100%" width="45%">
        <div>
          <hr />
          <StyledRange bg="#d9d9d9" width="40%">
            <StyledRange bg="#35bd21" width="16%" />
          </StyledRange>

          <StyledFlexColumn
            style={{
              marginTop: '4em',
            }}
          >
            <div>
              {/* TODO: Functionality works, need to implement the clickable hover effect */}
              <FaArrowLeft onClick={goBack} /> <span>Step 2 of 5</span>
            </div>

            <h3>Select add-ons</h3>
          </StyledFlexColumn>

          <StyledFlexRow
            style={{
              marginTop: '0.5em',
            }}
          >
            <img src={Socks} alt="socks" width="20%" />
            <h5 style={{ alignSelf: 'center', padding: '0 1em ' }}>
              Altitude Socks
            </h5>
          </StyledFlexRow>
        </div>

        <ItemList />
        <hr />
        <StyledFlexRow justify="space-between">
          <StyledButton
            onClick={goBack}
            bg="#d9d9d9"
            color="#000"
            width="130px"
          >
            Back
          </StyledButton>

          <StyledButton
            width="230px"
            color="#fff"
            onClick={() => {
              setShowCustomerDetailsForm(true)
            }}
          >
            Continue
          </StyledButton>
        </StyledFlexRow>
        {showCustomerDetailsForm && (
          <CustomerDetails
            setShowCustomerDetailsForm={setShowCustomerDetailsForm}
          />
        )}
      </StyledModal>
    </StyledFlexRow>
  )
}
