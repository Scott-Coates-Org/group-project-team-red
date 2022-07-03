import React, { useState } from 'react'

//style
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledBox } from '../styled/Box.styles'

//assets
import { FaArrowDown, FaArrowUp, FaCheck } from 'react-icons/fa'
import Socks from '../assets/socks.jpg'

//components
import Recipe from '../modals/Recipe'

const color = {
  c1: '#fff',
  c2: '#35bd21',
  c3: '#333',
}

//option for unlimited pass
export default function OptionUnlimited() {
  const [count, setCount] = useState(0)
  const [product, setProduct] = useState('')
  console.log(product)

  const [showDetails, setShowDetails] = useState(true)
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
          <StyledFlexColumn>
            <h5
              className="product.title"
              style={{ alignSelf: 'center', padding: '0 1em ' }}
            >
              Unlimited Pass
            </h5>
            <p>Access to all Park attractions that are open!</p>
            <p>Altitude Safety Socks Required</p>
          </StyledFlexColumn>
        </StyledFlexRow>
        <StyledFlexRow justify="right">
          <StyledBox onClick={() => setShowDetails((prevShow) => !prevShow)}>
            {showDetails ? <FaArrowUp /> : <FaArrowDown />}
          </StyledBox>
        </StyledFlexRow>
      </StyledFlexRow>

      {showDetails && (
        <StyledFlexRow justify="space-between" alignSelf="center">
          <h6 className="product-title">Unlimited Pass 7 or Older</h6>
          <StyledFlexColumn>
            <StyledFlexRow alignSelf="center">
              <h6 style={{ margin: '0 0.5em' }}>$25.00</h6>
              <StyledBox
                style={{
                  cursor: 'pointer',
                  flexGrow: '1',
                }}
                bg={color.c1}
                color={color.c3}
                onClick={() => setCount((prevCount) => prevCount - 1)}
              >
                <p
                  style={{ alignSelf: 'flex-start', margin: '0', padding: '0' }}
                >
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
                onClick={() => {
                  setCount((prevCount) => prevCount + 1)
                  setProduct(document.querySelector('.product-title').innerText)
                }}
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
      )}
      {count > 0 && <Recipe />}
    </StyledFlexColumn>
  )
}
