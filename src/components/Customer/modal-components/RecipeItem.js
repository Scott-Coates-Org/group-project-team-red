//style
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'

//assets
import { ImBin } from 'react-icons/im'

//component to show bought product with option to delete it from the recipe
//deleting not functional yet
export default function RecipeItem() {
  return (
    <StyledFlexColumn>
      <h5>Altitude Socks</h5>
      <StyledFlexRow justify="space-between">
        <p style={{ margin: '0', height: 'fit-content' }}>1 x Toddler Socks</p>
        <p style={{ margin: '0', height: 'fit-content' }}>
          <span style={{ margin: '0 0.5em' }}>$3.50</span>
          <ImBin />
        </p>
      </StyledFlexRow>
      <StyledFlexRow justify="space-between">
        <p style={{ margin: '0', height: 'fit-content' }}>1 x Child Socks</p>
        <p style={{ margin: '0', height: 'fit-content' }}>
          <span style={{ margin: '0 0.5em' }}>$3.50</span>
          <ImBin />
        </p>
      </StyledFlexRow>
    </StyledFlexColumn>
  )
}
