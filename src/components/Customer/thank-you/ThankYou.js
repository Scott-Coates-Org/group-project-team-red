import { useEffect, useState } from 'react'

//styles
import { StyledContainer } from '../styled/Container.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import Confetti from 'react-confetti'
import { useDispatch } from 'react-redux'
import { getSingleBookingObj } from 'redux/bookingDetails'

export default function ThankYou() {
  const [bookingData, setBookingData] = useState(null)
  const dispatch = useDispatch()

  // TODO: If not found should redirect to cancel page (actually the whole payment system should be implemented with webhooks, which will save us this step)
  useEffect(() => {
    const bookingId = new URLSearchParams(window.location.search).get(
      'payment_intent'
    )
    dispatch(getSingleBookingObj(bookingId))
      .then((res) => {
        setBookingData(res.payload)
      })
      .then(dispatch())
  }, [])

  return (
    <StyledContainer
      style={{
        background: '#5BE786',
      }}
    >
      <Confetti width={window.innerWidth} />
      <StyledFlexColumn
        align="center"
        style={{
          textAlign: 'center',
        }}
      >
        <h1>Thank you</h1>
        {bookingData &&
          bookingData.map((b) => (
            <div key={b.id}>
              <h3>Confirmation #{b.id}</h3>
              <br />
              <div>Booking details {b.orderDetails.date}</div>
              <br />
              {/* <p>Date of transaction {b.orderDetails.orderDate}</p> */}
            </div>
          ))}
      </StyledFlexColumn>
    </StyledContainer>
  )
}
