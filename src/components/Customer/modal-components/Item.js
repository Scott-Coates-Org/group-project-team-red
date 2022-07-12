import React, { useEffect, useState } from 'react'

//style
import { StyledBox } from '../styled/Box.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledItem } from '../styled/Item.styles'

//assets
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from 'redux/cart'

const color = {
  c1: '#fff',
  c2: '#35bd21',
  c3: '#333',
}
//Receipt single item
export default function Item() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch()

  const cart = useSelector(({ cart }) => cart.data)

  const myObj = cart.find((item) => item.name === 'Toddler Socks')

  useEffect(() => {
    if (myObj) setCount(myObj.quantity)
    else setCount(0)
  }, [myObj])

  const countUp = () => {
    if (count < 50) {
      addAddOnToCart()
    }
  }

  const countDown = () => {
    if (count > 0) {
      removeAddOnFromCart()
    }
  }

  const addAddOnToCart = () => {
    dispatch(
      addItemToCart({
        name: 'Toddler Socks',
        price: 3.5,
        quantity: 1,
      })
    )
  }

  const removeAddOnFromCart = () => {
    dispatch(removeItemFromCart({ name: 'Toddler Socks' }))
  }

  return (
    <StyledItem>
      <StyledFlexRow justify="space-between">
        <StyledFlexColumn>
          <p
            style={{
              padding: '0',
              margin: '0',
              justifySelf: 'center',
            }}
          >
            Toddler Socks
          </p>
          <h5 style={{ margin: '0', padding: '0' }}>$3.50</h5>
        </StyledFlexColumn>

        <StyledFlexColumn>
          <StyledFlexRow>
            <StyledBox
              style={{
                cursor: 'pointer',
                flexGrow: '1',
              }}
              bg={color.c1}
              color={color.c3}
              onClick={countDown}
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
              onClick={countUp}
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
    </StyledItem>
  )
}
