//style

import { StyledItem } from './styled/Item.styled'

//components
import Options from './Options'
import { StyledFlexColumn } from './styled/FlexColumn.styles'
import OptionUnlimited from './OptionUnlimited'

// const color = {
//   c1: '#fff',
//   c2: '#35bd21',
//   c3: '#333',
// }

export default function Product() {
  return (
    <StyledItem>
      <StyledFlexColumn>
        <OptionUnlimited />
        <Options />
      </StyledFlexColumn>
    </StyledItem>
  )
}
