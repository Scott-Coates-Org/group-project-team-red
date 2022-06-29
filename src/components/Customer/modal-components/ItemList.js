//style
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
//assets
import Item from './Item'

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
