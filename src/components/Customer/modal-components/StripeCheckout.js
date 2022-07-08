import { loadStripe } from '@stripe/stripe-js'

import { Elements, CardElement } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function StripeCheckout() {
  return (
    <Elements stripe={stripePromise}>
      <CardElement />
    </Elements>
  )
}
