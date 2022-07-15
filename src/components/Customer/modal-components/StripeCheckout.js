import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  'pk_test_51IszQADm1KpFnZprJ0aeZfHzmokzHu9WjQYqClLzgO8w9uIc8SU5AeyKED7Qx1hgnYFIL1yOmK4MhykBlmQ3iD0t00jVrr0SJb'
)

export default function StripeCheckout() {
  return (
    <Elements stripe={stripePromise}>
      <CardElement />
    </Elements>
  )
}
