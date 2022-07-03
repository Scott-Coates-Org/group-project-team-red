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

//modal for selection of jump pass
export default function ProductList() {
  const [nextStep, setNextStep] = useState(false)
  const product = 'something'
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
            <FaArrowLeft /> <span>Step 2 of 4</span>
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
          <StyledButton
            width="100%"
            onClick={() => {
              setNextStep(true)
            }}
            disabled={product ? false : true}
          >
            Continue
          </StyledButton>
          {nextStep && <AddOnsSelection />}
        </StyledFlexColumn>
      </StyledFlexColumn>
    </StyledModal>
  )
}
