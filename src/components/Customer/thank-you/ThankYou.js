import React from 'react'
import { StyledContainer } from '../styled/Container.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import Confetti from 'react-confetti'

export default function ThankYou() {
  return (
    <StyledContainer
      style={{
        background: '#5BE786',
      }}
    >
      <Confetti width={window.innerWidth} />
      <StyledFlexColumn
        align="center"
        style={{
          textAlign: 'center',
        }}
      >
        <h1>Thank you</h1>
        <h3>Confirmation #11111</h3>
        <br />
        <div>Booking details</div>
        <br />
        <p>Date of transaction</p>
      </StyledFlexColumn>
    </StyledContainer>
  )
}
