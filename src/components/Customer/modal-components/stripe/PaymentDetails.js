import { useState, useEffect } from 'react'

//style
import { StyledModal } from '../../styled/Modal.styles'
import { StyledRange } from '../../styled/Range.styles'
import { StyledFlexColumn } from '../../styled/FlexColumn.styles'
import { StyledFlexRow } from '../../styled/FlexRow.styles'
import { StyledButton } from '../../styled/Button.styles'
import { Form } from 'reactstrap'

//assets
import { FaLock } from 'react-icons/fa'

//stripe
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'

//components showing payment details
export default function PaymentDetails() {
  //price should be taken from the recipe total
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

  const price = subTotal + calculateTax

  //needed vars
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [checkoutError, setCheckoutError] = useState('')

  //function for catching errors in card inputs
  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError()
  }

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      paymentIntent.payment_method = 'card'
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: 'http://localhost:3000/thankyou', // For DEVELOPMENT
        return_url: 'https://team-red-1ccfb.web.app/thankyou', // For PRODUCTION
      },

      // Uncomment below if you only want redirect for redirect-based payments
      // redirect: 'if_required',
    })

    // ID of the payment method used in this PaymentIntent.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <StyledFlexRow>
      <StyledModal top={0} left="0" height="100%" width="45%">
        <div>
          <hr />
          <StyledRange bg="#d9d9d9" width="40%">
            <StyledRange bg="#35bd21" width="40%" />
          </StyledRange>

          <StyledFlexColumn
            style={{
              marginTop: '4em',
            }}
          >
            <div>
              {/* <FaArrowLeft /> */}
              <span>Step 5 of 5</span>
            </div>

            <h3>Select payment details</h3>
          </StyledFlexColumn>
        </div>
        {message && <div id="payment-message">{message}</div>}
        <Form className="my-2" onSubmit={handleSubmit}>
          <StyledFlexColumn>
            <PaymentElement onChange={handleCardDetailsChange} />
            <div>{checkoutError && <div>{checkoutError}</div>}</div>
            <StyledButton
              width="100%"
              type="submit"
              disabled={isLoading || !stripe || !elements}
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <span>
                  <FaLock></FaLock> Pay ${price}
                </span>
              )}
            </StyledButton>
            {message && <div id="payment-message">{message}</div>}
          </StyledFlexColumn>
        </Form>

        <hr />
        <StyledFlexRow justify="space-around">
          {/* <StyledButton bg="#d9d9d9" color="#000" width="100%">
            Back
          </StyledButton> */}
        </StyledFlexRow>
      </StyledModal>
    </StyledFlexRow>
  )
}
