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
import Recipe from '../modals/Recipe'

//components showing add-ons options
export default function AddOnsSelection({ step2NextPageState }) {
  const [step3, setStep3] = useState(true)

  const goBack = () => {
    setStep3(false)
    step2NextPageState(false)
  }

  return (
    <StyledFlexRow>
      {step3 && (
        <StyledModal top={0} left="0" height="100%" width="35%">
          <div>
            <hr />
            <StyledRange bg="#d9d9d9" width="35%">
              <StyledRange bg="#35bd21" width="20%" />
            </StyledRange>

            <StyledFlexColumn
              style={{
                marginTop: '4em',
              }}
            >
              <div>
                {/* TODO: Functionality works, need to implement the clickable hover effect */}
                <FaArrowLeft onClick={goBack} /> <span>Step 3 of 4</span>
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

            <StyledButton width="230px" color="#fff">
              Continue
            </StyledButton>
          </StyledFlexRow>
        </StyledModal>
      )}

      <Recipe />
    </StyledFlexRow>
  )
}
