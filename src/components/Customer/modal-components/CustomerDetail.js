import { useState } from 'react'
//style
import { StyledModal } from '../styled/Modal.styles'
import { StyledRange } from '../styled/Range.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledButton } from '../styled/Button.styles'
import { Link } from 'react-router-dom'
//assets
import { FaArrowLeft } from 'react-icons/fa'

//components
import Recipe from '../modals/Recipe'
import { Form } from 'reactstrap'
import { StyledInfoBlue } from '../styled/InfoBlue.styles'

import StripePayment from './stripe/StripePayment'

export default function CustomerDetails() {
  const [step3, setStep3] = useState(true)
  const [step4, setStep4] = useState(false)

  const [email, setEmail] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    cellNumber: '',
    zipCode: '',
    email: '',
  })

  const handleSubmit = () => {
    if (email && cellNumber && zipCode && firstName && lastName) {
      return setNewUser({ firstName, lastName, email, cellNumber, zipCode })
    }
  }

  return (
    <StyledFlexRow>
      {step3 && (
        <StyledModal
          top={0}
          left="0"
          height="100%"
          width="45%"
          style={{ overflowY: 'scroll' }}
        >
          <div>
            <hr />
            <StyledRange
              bg="#d9d9d9"
              width="100%"
              style={{ position: 'static', marginTop: '3em' }}
            >
              <StyledRange
                bg="#35bd21"
                width="80%"
                style={{ position: 'static', marginTop: '3em' }}
              />
            </StyledRange>

            <StyledFlexColumn
              style={{
                marginTop: '2em',
              }}
            >
              <div>
                <FaArrowLeft /> <span>Step 3 of 4</span>
              </div>

              <h3>Enter your details</h3>
            </StyledFlexColumn>
          </div>
          <StyledInfoBlue>
            Please review our Safety Video and Code of Conduct prior to visiting
            the Park!
            https://www.altitudetrampolinepark.com/locations/appleton/about/safety
          </StyledInfoBlue>
          <Form>
            <StyledFlexColumn>
              <StyledFlexRow padding="0.5em 0" justify="space-between">
                <StyledFlexColumn>
                  <label>
                    <p>First name:</p>
                    <input
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      value={firstName}
                    ></input>
                  </label>
                </StyledFlexColumn>
                <StyledFlexColumn>
                  <label>
                    <p>Last name:</p>
                    <input
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      value={lastName}
                    ></input>
                  </label>
                </StyledFlexColumn>
              </StyledFlexRow>
              <StyledFlexColumn>
                <label>
                  <p>Email:</p>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    style={{ width: '100%' }}
                  ></input>
                </label>
              </StyledFlexColumn>

              <StyledFlexRow padding="0.5em 0" justify="space-between">
                <StyledFlexColumn>
                  <label>
                    <p>Cell number:</p>
                    <input
                      type="text"
                      onChange={(e) => setCellNumber(e.target.value)}
                      required
                      value={cellNumber}
                    ></input>
                  </label>
                </StyledFlexColumn>
                <StyledFlexColumn>
                  <label>
                    <p>Zip code:</p>
                    <input
                      type="text"
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                      value={zipCode}
                    ></input>
                  </label>
                </StyledFlexColumn>
              </StyledFlexRow>

              <StyledFlexColumn
                style={{
                  borderTop: '1px solid grey',
                  margin: '0.5em ',
                  padding: '0.5em',
                }}
              >
                <StyledFlexRow justify="space-around">
                  <div
                    style={{
                      border: '1px solid black',

                      padding: '0.5em',
                    }}
                  >
                    {' '}
                    Dummy box
                  </div>
                  <div
                    style={{
                      border: '1px solid black',

                      padding: '0.5em',
                    }}
                  >
                    Dummy box
                  </div>
                  <div
                    style={{
                      border: '1px solid black',

                      padding: '0.5em',
                    }}
                  >
                    Dummy box
                  </div>
                </StyledFlexRow>
                <label>
                  <StyledFlexRow justify="space-between" margin="1em auto">
                    <p>
                      <input
                        required
                        type="checkbox"
                        style={{ margin: '0 1em', padding: 0 }}
                      ></input>
                    </p>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Doloribus unde ullam ratione odit, tempora, in delectus
                      quae dicta, quaerat dolor illum impedit natus inventore
                      vero. Incidunt ipsum quidem repudiandae iste?
                    </p>
                  </StyledFlexRow>
                </label>
                <label>
                  <StyledFlexRow justify="space-between">
                    <p>
                      <input
                        required
                        type="checkbox"
                        style={{ margin: '0 1em', padding: 0 }}
                      ></input>
                    </p>
                    <p>
                      <Link to="/">
                        I have read and accept the Altitude Appleton&quote;s
                        terms and conditions
                      </Link>
                    </p>
                  </StyledFlexRow>
                </label>
              </StyledFlexColumn>

              <StyledFlexRow justify="space-between">
                <StyledButton
                  onClick={() => {
                    setStep3(false)
                    setStep4(false)
                  }}
                  bg="#d9d9d9"
                  color="#000"
                  width="40%"
                >
                  Back
                </StyledButton>

                <StyledButton
                  width="50%"
                  color="#fff"
                  onClick={(e) => {
                    e.preventDefault()
                    setStep4(true)
                    setStep3(false)
                    handleSubmit()
                  }}
                  type="submit"
                >
                  Continue
                </StyledButton>
              </StyledFlexRow>
            </StyledFlexColumn>
          </Form>
        </StyledModal>
      )}
      {step4 && newUser && <StripePayment />}

      <Recipe />
    </StyledFlexRow>
  )
}
