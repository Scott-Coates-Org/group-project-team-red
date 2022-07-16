import React, { useState, useEffect } from 'react'

//stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

//components
import PaymentDetails from './PaymentDetails'

const stripePromise = loadStripe(
  'pk_test_51IszQADm1KpFnZprJ0aeZfHzmokzHu9WjQYqClLzgO8w9uIc8SU5AeyKED7Qx1hgnYFIL1yOmK4MhykBlmQ3iD0t00jVrr0SJb'
)

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      'http://localhost:5000/team-red-1ccfb/us-central1/stripe/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 'xl-tshirt', quantity: 2 }] }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.log(err))
  }, [])
  console.log('clientSecret', clientSecret)
  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  console.log('stripePromise', stripePromise)

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentDetails />
        </Elements>
      )}
    </>
  )
}
