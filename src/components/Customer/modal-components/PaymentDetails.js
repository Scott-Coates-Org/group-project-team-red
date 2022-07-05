import { useState } from 'react'
//style
import { StyledModal } from '../styled/Modal.styles'
import { StyledRange } from '../styled/Range.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledButton } from '../styled/Button.styles'
import styled from 'styled-components'
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

//stripe
import { CardElement } from '@stripe/react-stripe-js'

//components
import CustomerDetails from './CustomerDetail'
import Recipe from '../modals/Recipe'

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`
const cardElementOpts = {
  style: {
    base: {
      color: 'black',
      border: '2px solid black',

      '::placeholder': {
        color: 'lightgray',
      },
    },
    invalid: {
      color: 'red',
      iconColor: 'red',
    },
  },
  hidePostalCode: true,
}
//components showing payment details
export default function PaymentDetails() {
  const [checkoutError, setCheckoutError] = useState(false)

  //dummy state to make buttons back and continue funtional
  const [step3, setStep3] = useState(false)
  const [step4, setStep4] = useState(true)

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError()
  }
  return (
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
          <Form className="my-2">
            <StyledFlexColumn>
              <label>
                <StyledFlexRow justify="space-between">
                  <StyledFlexRow justify="left">
                    <input
                      type="radio"
                      style={{ margin: '0 1em' }}
                      name="paymentMethod"
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
              </label>
              <label>
                <p>Card number</p>
                <CardElementContainer>
                  <CardElement
                    options={cardElementOpts}
                    onChange={handleCardDetailsChange}
                  />
                </CardElementContainer>
                {/* <input
                  type="number"
                  style={{ width: '100%' }}
                  placeholder={`1234 5678 9012 3456 `}
                /> */}
              </label>
              <StyledFlexRow justify="space-between">
                <label>
                  <p>Expirity date</p>
                  <input type="number" placeholder="MM/YY" />
                </label>
                <label>
                  <p>CVC / CVV</p>
                  <input type="number" placeholder="3 digits" />
                </label>
              </StyledFlexRow>

              <StyledButton width="100%">
                <FaLock></FaLock> Pay $82.29
              </StyledButton>
            </StyledFlexColumn>
            <StyledFlexRow justify="left">
              <input
                type="radio"
                style={{ margin: '0 1em' }}
                name="paymentMethod"
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
          </Form>
          {checkoutError && <div> Error</div>}
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
  )
}
