import { useEffect } from 'react'

//styles
import { StyledContainer } from '../styled/Container.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import Confetti from 'react-confetti'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSingleBookingObj,
  updateBookingBillingStatus,
} from 'redux/bookingDetails'
import moment from 'moment'
import { updateSelectedDateTimeslots } from 'redux/calendar'

export default function ThankYou() {
  const dispatch = useDispatch()

  const { data: bookingData, isLoaded: bookingIsLoaded } = useSelector(
    ({ bookingDetails }) => bookingDetails
  )

  // TODO: If not found should redirect to cancel page (actually the whole payment system should be implemented with webhooks, which will save us this step)
  useEffect(() => {
    const bookingId = new URLSearchParams(window.location.search).get(
      'payment_intent'
    )
    dispatch(getSingleBookingObj(bookingId))
      .then((res) => {
        dispatch(updateBookingBillingStatus(...res.payload))
        dispatch(updateSelectedDateTimeslots(...res.payload))
      })
      .catch((err) => console.error(err))
  }, [])

  if (!bookingIsLoaded) return <div>Your payment is being processed</div>

  return (
    <StyledContainer
      style={{
        background: '#5BE786',
        textAlign: 'center',
        padding: '0 15vw',
      }}
    >
      <Confetti width={window.innerWidth} />
      <StyledFlexColumn
        align="center"
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          margin: '0 auto',
          boxShadow: '0 0 6px 0 gray',
        }}
      >
        <h1>Thank you</h1>
        {bookingData[0].billingStatus === 'Payed' &&
          bookingData.map((booking) => (
            <div
              key={booking.id}
              style={{ backgroundColor: 'white', margin: '0 auto' }}
            >
              <h3>Confirmation #: {booking.id}</h3>
              <br />
              <div style={{ margin: '0 auto', backgroundColor: 'white' }}>
                <h4>Booking details:</h4>

                <p>Date: {booking.orderDetails.date}</p>
                <p>Time: {booking.orderDetails.startingTime}</p>
                <div>
                  <h5>Products:</h5>

                  {booking.orderDetails.productName.map((product) => {
                    return <p key={product}>{product}</p>
                  })}
                  <h5>Tickets: {booking.orderDetails.ticketsCount}</h5>
                </div>
              </div>
              <p>
                Date of transaction:{' '}
                {moment
                  .unix(booking.orderDetails.orderDate)
                  .format('MMMM, DD, YYYY')}
              </p>
            </div>
          ))}
      </StyledFlexColumn>
    </StyledContainer>
  )
}
