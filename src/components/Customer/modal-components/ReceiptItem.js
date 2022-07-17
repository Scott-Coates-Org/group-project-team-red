//style
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'

//assets
import { ImBin } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { deleteItem } from 'redux/cart'

//component to show bought product with option to delete it from the Receipt
//deleting not functional yet
export default function ReceiptItem({ name, quantity, price }) {
  const dispatch = useDispatch()

  const deleteSelectedItem = (itemName) => {
    dispatch(deleteItem(itemName))
  }

  //TODO: hover effect on bin

  return (
    <StyledFlexColumn>
      <h5>{name}</h5>
      <StyledFlexRow justify="space-between">
        <p style={{ margin: '0', height: 'fit-content' }}>
          {quantity} x {name}
        </p>
        <p style={{ margin: '0', height: 'fit-content' }}>
          <span style={{ margin: '0 0.5em' }}>$ {price * quantity}</span>
          <ImBin onClick={() => deleteSelectedItem(name)} />
        </p>
      </StyledFlexRow>
    </StyledFlexColumn>
  )
}
