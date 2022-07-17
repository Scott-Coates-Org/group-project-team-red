//style
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
//components
import Item from './Item'
//list of items on the Receipt
export default function ItemList() {
  return (
    <StyledFlexColumn style={{ borderTop: ' 2px solid #888' }}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </StyledFlexColumn>
  )
}
