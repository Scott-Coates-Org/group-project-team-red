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

    dispatch(getSingleBookingObj(bookingId)).then((res) => {
      setBookingData(res.payload)
      console.log(res.payload)
    })
    // .then(dispatch()) //add booking data dispatch here?
  }, [])

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
        {bookingData &&
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
                </div>
              </div>
              <br />
              {/* <p>Date of transaction {booking.orderDetails.orderDate}</p> */}
            </div>
          ))}
      </StyledFlexColumn>
    </StyledContainer>
  )
}
