import React, { useState, useEffect } from 'react'

//stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

//components
import PaymentDetails from './PaymentDetails'
import { useDispatch, useSelector } from 'react-redux'
import { createBooking } from 'redux/bookingDetails'

const stripePromise = loadStripe(
  'pk_test_51IszQADm1KpFnZprJ0aeZfHzmokzHu9WjQYqClLzgO8w9uIc8SU5AeyKED7Qx1hgnYFIL1yOmK4MhykBlmQ3iD0t00jVrr0SJb'
)

export default function StripePayment({ setShowPaymentPage }) {
  const [clientSecret, setClientSecret] = useState('')

  const dispatch = useDispatch()

  // TODO: Make it possible to go back from payment page to customer details (or maybe is better to go back to add-ons?)

  const { data: calendarData } = useSelector(({ calendar }) => calendar)
  const { data: cartData } = useSelector(({ cart }) => cart)
  const { data: customerData } = useSelector(({ customer }) => customer)

  // TODO: In V2 we need to arrange all the hardcoded values
  const bookingDetails = {
    orderDetails: {
      date: calendarData.id,
      startingTime: cartData[0].startingTime,
      room: cartData[0].room,
      productName: cartData.map((item) => item.name),
      ticketsCount: cartData[0].quantity,
      addOnsCount: cartData[1] ? cartData[1].quantity : null,
    },
    customerDetails: { customerData },
    billingStatus: 'Pending',
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      'http://localhost:5000/team-red-1ccfb/us-central1/stripe/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: bookingDetails.orderDetails }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        bookingDetails.id = data.paymentIntent.id
        bookingDetails.orderDetails.orderDate = data.paymentIntent.created
        dispatch(createBooking(bookingDetails))
        setClientSecret(data.paymentIntent.client_secret)
      })
      .catch((err) => console.log(err))
  }, [])
  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentDetails setShowPaymentPage={setShowPaymentPage} />
        </Elements>
      )}
    </>
  )
}
