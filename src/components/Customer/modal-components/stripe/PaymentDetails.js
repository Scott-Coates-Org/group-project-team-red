import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
//style
import { StyledModal } from '../../styled/Modal.styles'
import { StyledRange } from '../../styled/Range.styles'
import { StyledFlexColumn } from '../../styled/FlexColumn.styles'
import { StyledFlexRow } from '../../styled/FlexRow.styles'
import { StyledButton } from '../../styled/Button.styles'

import { Form } from 'reactstrap'
//assets
import {
  FaArrowLeft,
  FaCcDinersClub,
  FaCcJcb,
  FaCcMastercard,
  FaCreditCard,
  FaGooglePay,
  FaLock,
} from 'react-icons/fa'
import { SiAmericanexpress, SiVisa } from 'react-icons/si'

//components
import CustomerDetails from '../CustomerDetail'
import Recipe from '../../modals/Recipe'
//NOTE: some of this imports and set ups should be done in layout component but when I did it there the Card input field wasn't rendering in this modal
//stripe
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

//components showing payment details
export default function PaymentDetails({ customer }) {
  //dummy state to make buttons back and continue funtional
  const [step3, setStep3] = useState(false)
  const [step4, setStep4] = useState(true)
  const price = 82.29

  //price should be taken from the recipe total
  //needed vars
  const history = useHistory()
  const [isProcessing, setIsProcessing] = useState(false)
  const [checkoutError, setCheckoutError] = useState()

  const stripe = useStripe()
  const elements = useElements()

  const [paymentMethod, setPaymentMethod] = useState('')
  console.log(paymentMethod)

  //function for catching errors in card inputs
  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError()
  }

  const successfulCheckout = () => history.push('/thankyou')
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const cardElement = elements.getElement(CardElement)

    try {
      const { data: clientSecret } = await axios.post('./api/payment_intent', {
        amount: price * 100,
      })

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: customer,
      })

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message)
        setIsProcessing(false)
        return
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })

      if (error) {
        setCheckoutError(error.message)
        setIsProcessing(false)
        return
      }

      successfulCheckout()
    } catch (err) {
      setCheckoutError(err.message)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        color: '#333',
        iconColor: '#35bd21',
        '::placeholder': {
          color: 'lightgrey',
        },
      },
      invalid: {
        color: '#513593',
        iconColor: '#513593',
      },
    },
    hidePostalCode: true,
  }

  return (
    <Elements stripe={stripePromise}>
      <StyledFlexRow>
        {step4 && (
          <StyledModal top={0} left="0" height="100%" width="35%">
            <div>
              <hr />
              <StyledRange bg="#d9d9d9" width="35%">
                <StyledRange bg="#35bd21" width="35%" />
              </StyledRange>

              <StyledFlexColumn
                style={{
                  marginTop: '4em',
                }}
              >
                <div>
                  <FaArrowLeft /> <span>Step 4 of 4</span>
                </div>

                <h3>Select payment details</h3>
              </StyledFlexColumn>
            </div>
            <Form className="my-2" onSubmit={() => handleSubmit()}>
              <StyledFlexColumn>
                <label>
                  <StyledFlexRow justify="space-between">
                    <StyledFlexRow justify="left">
                      <input
                        type="radio"
                        style={{ margin: '0 1em' }}
                        name="paymentMethod"
                        onClick={() => setPaymentMethod('card')}
                      />
                      <FaCreditCard
                        style={{
                          alignContent: 'left',
                          margin: '0 ',
                          alignSelf: 'center',
                        }}
                      />
                      <p
                        style={{
                          alignContent: 'left',
                          alignSelf: 'center',
                          margin: '0 0.3em',
                        }}
                      >
                        Debit / Credit card
                      </p>
                    </StyledFlexRow>

                    <StyledFlexRow
                      align="right"
                      justify="space-between"
                      width="100%"
                    >
                      <SiVisa
                        style={{
                          color: 'blue',
                          background: 'white',
                          margin: '0 0.2em',
                        }}
                      />
                      <FaCcMastercard
                        style={{
                          color: 'blue',
                          background: 'white',
                          margin: '0 0.2em',
                        }}
                      />
                      <SiAmericanexpress
                        style={{
                          color: 'blue',
                          background: 'white',
                          margin: '0 0.2em',
                        }}
                      />
                      <FaCcJcb
                        style={{
                          color: 'blue',
                          background: 'white',
                          margin: '0 0.2em',
                        }}
                      />
                      <FaCcDinersClub
                        style={{
                          color: 'blue',
                          background: 'white',
                          margin: '0 0.2em',
                        }}
                      />
                    </StyledFlexRow>
                  </StyledFlexRow>
                  <StyledFlexRow justify="left" margin="0.5em auto">
                    <input
                      type="radio"
                      style={{ margin: '0 1em' }}
                      name="paymentMethod"
                      onClick={() => setPaymentMethod('wallet')}
                    />
                    <FaGooglePay
                      style={{
                        alignContent: 'left',
                        margin: '0 ',
                        width: '1.5em',
                        alignSelf: 'center',
                        fontSize: '2em',
                        border: '1px solid black',
                        borderRadius: '5px',
                      }}
                    />
                    <p
                      style={{
                        alignContent: 'left',
                        alignSelf: 'center',
                        margin: '0 0.3em',
                      }}
                    >
                      Google Pay
                    </p>
                  </StyledFlexRow>
                </label>

                <CardElement
                  options={cardElementOptions}
                  onChange={handleCardDetailsChange}
                />
                <div>{checkoutError && <div>{checkoutError}</div>}</div>
                <StyledButton
                  width="100%"
                  type="submit"
                  disabled={isProcessing || !stripe}
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <span>
                      <FaLock></FaLock> Pay ${price}
                    </span>
                  )}
                </StyledButton>
              </StyledFlexColumn>
            </Form>

            <hr />
            <StyledFlexRow justify="space-around">
              <StyledButton
                onClick={() => {
                  setStep3(true)
                  setStep4(false)
                }}
                bg="#d9d9d9"
                color="#000"
                width="100%"
              >
                Back
              </StyledButton>
            </StyledFlexRow>
          </StyledModal>
        )}
        {step3 && <CustomerDetails />}

        <Recipe />
      </StyledFlexRow>
    </Elements>
  )
}
