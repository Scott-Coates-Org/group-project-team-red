import React, { useEffect, useState } from 'react'

//style
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledBox } from '../styled/Box.styles'

//assets
import { FaArrowDown, FaArrowUp, FaCheck } from 'react-icons/fa'
import Socks from '../assets/socks.jpg'

//components
import Receipt from '../modals/Receipt'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from 'redux/cart'
import { Times } from '../modals/Calendar'

const color = {
  c1: '#fff',
  c2: '#35bd21',
  c3: '#333',
}

//option for unlimited pass
export default function OptionUnlimited() {
  const [showDetails, setShowDetails] = useState(true)
  const [count, setCount] = useState(0)

  const dispatch = useDispatch()

  const cart = useSelector(({ cart }) => cart.data)

  const myObj = cart.find((item) => item.name === 'Unlimited Pass')

  useEffect(() => {
    if (myObj) setCount(myObj.quantity)
    else setCount(0)
  }, [myObj])

  const countUp = () => {
    if (count < 50) {
      addProductToCart()
    }
  }

  const countDown = () => {
    if (count > 0) {
      removeProductFromCart()
    }
  }

  const addProductToCart = () => {
    dispatch(
      addItemToCart({
        name: 'Unlimited Pass',
        room: 'bigRoom',
        duration: 'Unlimited Time',
        price: 25,
        quantity: 1,
        requirements: 'Altitude Socks',
      })
    )
  }

  const removeProductFromCart = () => {
    dispatch(removeItemFromCart({ name: 'Unlimited Pass' }))
  }

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
              className="product.name"
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
        <StyledFlexColumn>
          <h6>Session time</h6>
          {count > 0 && <Times room={'bigRoom'} />}
          <StyledFlexRow justify="space-between" alignSelf="center">
            <h6 className="product-name">Unlimited Pass 7 or Older</h6>
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
                  onClick={countDown}
                >
                  <p
                    style={{
                      alignSelf: 'flex-start',
                      margin: '0',
                      padding: '0',
                    }}
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
                  onClick={countUp}
                >
                  <p
                    style={{ alignSelf: 'flex-end', margin: '0', padding: '0' }}
                  >
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
      )}
      {count > 0 && <Receipt />}
    </StyledFlexColumn>
  )
}
