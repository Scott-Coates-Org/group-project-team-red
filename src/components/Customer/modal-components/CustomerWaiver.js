import React, { useRef, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import ReactSignatureCanvas from 'react-signature-canvas'

//styles
import { StyledButton } from '../styled/Button.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledModal } from '../styled/Modal.styles'
import { StyledRange } from '../styled/Range.styles'

export default function CustomerWaiver({ setShowCustomerWaiver }) {
  const [imageURL, setImageURL] = useState(null)

  const signature = useRef()
  const handleSignature = () => {
    //fuction with a timeout that will take the signature and save it
    setTimeout(() => {
      setImageURL(signature.current.getTrimmedCanvas().toDataURL('image/png'))
    }, 2000)
  }
  console.log(imageURL)
  const handleAccept = (e) => {
    e.preventDefault()
    //generate document or a file to be saved in database
    if (signature.current.isEmpty()) {
      return
    }
    //clear the signature area
    signature.current.clear()
  }
  return (
    <StyledFlexRow>
      <StyledModal
        top={0}
        left="0"
        height="100%"
        width="45%"
        style={{ overflowY: 'scroll' }}
      >
        <StyledFlexColumn
          style={{ borderTop: ' 2px solid #888', display: 'block' }}
        >
          <StyledFlexColumn
            style={{
              marginTop: '4em',
            }}
          >
            <hr />
            <StyledRange bg="#d9d9d9" width="35%">
              <StyledRange bg="#35bd21" width="20%" />
            </StyledRange>
            <div>
              {/* TODO: Functionality works, need to implement the clickable hover effect */}
              <FaArrowLeft
                onClick={() => (setShowCustomerWaiver.current = false)}
              />
              <span>Step 2 of 4</span>
            </div>
          </StyledFlexColumn>
        </StyledFlexColumn>
        <form onSubmit={handleAccept}>
          <StyledFlexColumn
            // width="80%"
            margin="2em auto"
            padding="2em"
            style={{ textAlign: 'center', border: '1px solid black' }}
          >
            <h1>Customer waiver</h1>
            <div style={{ textAlign: 'left' }}>
              <p>
                In order to save time when you arrive, you may fill out and sign
                your liability waiver in advance. Please note that you must be
                at least 18 years old in order to sign a liability waiver. If
                you are not 18 years old, please ask your parent or legal
                guardian to complete this process.
              </p>

              <br />
              <p>
                PARTICIPANT AGREEMENT, INDEMNIFICATION, ASSUMPTION OF RISK, AND
                RELEASE OF LIABLITY
              </p>

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
                    In consideration of the services of ROLLER WORLD, together
                    with all agents, owners, managers, successors, affiliates,
                    sponsors, landlords, partners, investors, participants,
                    volunteers, employees, and all other persons of entities
                    acting in any capacity on behalf of the previously named
                    company, I hereby agree to release, indemnify, and discharge
                    the venue, on behalf of myself, my spouse, my children, my
                    parents, my heirs, my wards, assigns, personal
                    representatives and estate.
                  </p>
                </StyledFlexRow>
                <p>ASSUMPTION AND ACKNOWLEDGEMENT OF ALL RISKS:</p>
                <p>
                  I, the undersigned adult listed below, am at least 18 years of
                  age. On my own behalf, and on the behalf of the below listed
                  participants under the age of 18 (&quot;minors&quot;), as
                  their parent, legal guardian or custodian, knowingly,
                  voluntarily, and freely accept and assume any and all risks,
                  both known and unknown, of injuries or other loss or damage
                  that may be suffered while on the premises.
                </p>
              </label>
            </div>
            <StyledFlexColumn justify="center" align="center">
              <p style={{ textAlign: 'left', width: '100%' }}>
                Please sign here:
              </p>
              <p
                style={{
                  borderRadius: '10px',
                  border: '1px dashed black',
                  margin: '1em 0',
                }}
              >
                <ReactSignatureCanvas
                  ref={signature}
                  penColor="black"
                  canvasProps={{
                    width: '950px',
                    height: '200px',
                    className: 'signaturePad',
                  }}
                  onEnd={handleSignature}
                ></ReactSignatureCanvas>
              </p>
              <label>
                <StyledFlexRow justify="left">
                  <p>
                    <input
                      type="checkbox"
                      style={{ margin: '0 1em', padding: 0 }}
                    ></input>
                  </p>
                  <p>
                    I would like to subscribe to updates from ROLLER WORLD Demo
                  </p>
                </StyledFlexRow>
              </label>
            </StyledFlexColumn>
            <StyledButton
              onClick={() => (setShowCustomerWaiver.current = false)}
              bg="#d9d9d9"
              color="#000"
              width="40%"
            >
              Back
            </StyledButton>
            {imageURL && (
              <StyledButton width="40%" type="submit">
                Accept and continue
              </StyledButton>
            )}
          </StyledFlexColumn>
        </form>
      </StyledModal>
    </StyledFlexRow>
  )
}
