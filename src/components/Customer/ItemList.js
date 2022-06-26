//style
import { StyledFlexColumn } from './styled/FlexColumn.styles'
//assets
import Item from './Item'

export default function ItemList() {
  return (
    <StyledFlexColumn>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </StyledFlexColumn>
  )
}
