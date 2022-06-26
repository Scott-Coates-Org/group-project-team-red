import RecipeItem from './RecipeItem'
import { StyledButton } from './styled/Button.styles'
import { StyledFlexColumn } from './styled/FlexColumn.styles'
import { StyledFlexRow } from './styled/FlexRow.styles'
import { StyledModal } from './styled/Modal.styles'

export default function Recipe() {
  return (
    <StyledModal top={0} left="50%" height="fit-content" width="30%">
      <StyledFlexColumn>
        <h4
          style={{
            borderBotom: '2px solid  #f2f2f2',
            margin: '0',
            padding: '0',
          }}
        >
          Your Cart
        </h4>
        <StyledButton
          style={{ alignSelf: 'left' }}
          color="#fff"
          bg="hwb(206deg 18% 19%) "
        >
          Jun 22, 2022
        </StyledButton>
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />

        <h5
          style={{
            borderTop: '2px solid #f2f2f2',
            marginTop: '1em',
            paddingTop: '0.5em',
          }}
        >
          Total payment required
        </h5>
        <StyledFlexRow justify="space-between">
          <p style={{ margin: '0', height: 'fit-content' }}>Subtotal</p>
          <p style={{ margin: '0', height: 'fit-content' }}>$78.00</p>
        </StyledFlexRow>
        <StyledFlexRow justify="space-between">
          <p style={{ margin: '0', height: 'fit-content' }}>Transaction Fee</p>
          <p style={{ margin: '0', height: 'fit-content' }}>$0.00</p>
        </StyledFlexRow>
        <StyledFlexRow justify="space-between">
          <p style={{ margin: '0', height: 'fit-content' }}>Tax</p>
          <p style={{ margin: '0', height: 'fit-content' }}>$4.29</p>
        </StyledFlexRow>
        <StyledFlexRow justify="space-between">
          <h5>Total(inc.tax)</h5>
          <p>$82.29</p>
        </StyledFlexRow>

        <StyledButton width="100%" color="#fff">
          Continue
        </StyledButton>
      </StyledFlexColumn>
    </StyledModal>
  )
}
