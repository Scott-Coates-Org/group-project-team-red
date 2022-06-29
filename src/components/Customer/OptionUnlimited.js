import React, { useState } from 'react'
import { StyledFlexColumn } from './styled/FlexColumn.styles'
import { StyledFlexRow } from './styled/FlexRow.styles'
import { StyledBox } from './styled/Box.styles'
import { FaArrowDown, FaArrowUp, FaCheck } from 'react-icons/fa'
import Socks from '../Customer/assets/socks.jpg'

const color = {
  c1: '#fff',
  c2: '#35bd21',
  c3: '#333',
}
export default function OptionUnlimited() {
  const [count, setCount] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  return (
    <StyledFlexColumn>
      <StyledFlexRow justify="space-between">
        <StyledFlexRow
          justify="left"
          style={{
            marginTop: '0.5em',
          }}
        >
          <img src={Socks} alt="socks" width="20%" />
          <h5 style={{ alignSelf: 'center', padding: '0 1em ' }}>
            Unlimited Jumps
          </h5>
        </StyledFlexRow>
        <StyledFlexRow justify="right">
          <StyledBox onClick={() => setShowOptions((prevShow) => !prevShow)}>
            {showOptions ? <FaArrowUp /> : <FaArrowDown />}
          </StyledBox>
        </StyledFlexRow>
      </StyledFlexRow>

      <StyledFlexRow justify="space-between">
        <h6>hello</h6>
        <StyledFlexColumn>
          <StyledFlexRow>
            <StyledBox
              style={{
                cursor: 'pointer',
                flexGrow: '1',
              }}
              bg={color.c1}
              color={color.c3}
              onClick={() => setCount((prevCount) => prevCount - 1)}
            >
              <p style={{ alignSelf: 'flex-start', margin: '0', padding: '0' }}>
                -
              </p>
            </StyledBox>
            <StyledBox
              style={{ flexGrow: '2' }}
              bg={count === 0 ? color.c1 : color.c2}
              color={count === 0 ? color.c3 : color.c1}
            >
              <p style={{ alignSelf: 'center', margin: '0', padding: '0' }}>
                {count}
              </p>
            </StyledBox>
            <StyledBox
              style={{ cursor: 'pointer', flexGrow: '1' }}
              bg={color.c1}
              color={color.c3}
              onClick={() => setCount((prevCount) => prevCount + 1)}
            >
              <p style={{ alignSelf: 'flex-end', margin: '0', padding: '0' }}>
                +
              </p>
            </StyledBox>
          </StyledFlexRow>
          {count > 0 && (
            <p style={{ margin: '0', padding: '0', fontSize: '1em' }}>
              <FaCheck style={{ color: '#35bd21' }} /> Item added
            </p>
          )}
        </StyledFlexColumn>
      </StyledFlexRow>
    </StyledFlexColumn>
  )
}
