//component
import { useSelector } from 'react-redux'
import { dateStrToDateObj } from 'utils/miscelaneous'
import ReceiptItem from '../modal-components/ReceiptItem'

//style
import { StyledButton } from '../styled/Button.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledModal } from '../styled/Modal.styles'

//full Receipt component
export default function Receipt() {
  const { data: dateData } = useSelector(({ calendar }) => calendar)

  const { data: cartData, isLoaded: cartIsLoaded } = useSelector(
    ({ cart }) => cart
  )

  if (!cartIsLoaded) return <div>...loading</div>

  const subTotal = cartData.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.price * currentItem.quantity,
    0
  )

  const calculateTax = Math.round(subTotal * 0.07 * 100) / 100

  //TODO: change format of the date to e.g. Jul, 13, 2022
  //TODO: The key of ReceiptItem is the index, we should change it to ID when the cart and add ons created by the admin are displayed instead of the hard coded items

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
          {dateStrToDateObj(dateData.id)}
        </StyledButton>
        {cartData.map((p, i) => (
          <ReceiptItem
            key={i}
            name={p.name}
            quantity={p.quantity}
            price={p.price}
          />
        ))}
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
          <p style={{ margin: '0', height: 'fit-content' }}>{subTotal}</p>
        </StyledFlexRow>
        <StyledFlexRow justify="space-between">
          <p style={{ margin: '0', height: 'fit-content' }}>Transaction Fee</p>
          <p style={{ margin: '0', height: 'fit-content' }}>$0.00</p>
        </StyledFlexRow>
        <StyledFlexRow justify="space-between">
          <p style={{ margin: '0', height: 'fit-content' }}>Tax</p>
          <p style={{ margin: '0', height: 'fit-content' }}>{calculateTax}</p>
        </StyledFlexRow>
        <StyledFlexRow justify="space-between">
          <h5>Total(inc.tax)</h5>
          <p>{subTotal + calculateTax}</p>
        </StyledFlexRow>
        {/* //to be shown after everything needed is selected and done */}
        {/* <StyledButton width="100%" color="#fff">
          Continue
        </StyledButton> */}
      </StyledFlexColumn>
    </StyledModal>
  )
}
