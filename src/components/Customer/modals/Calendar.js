/* eslint-disable no-unused-vars */
import { useState } from 'react'

//calendar
import Calendar from 'react-calendar'

//assets
import { FaArrowLeft } from 'react-icons/fa'

//style
import '../styled/Calendar.css'
import { StyledContainer } from '../styled/Container.styles'
import { StyledFlexColumn } from '../styled/FlexColumn.styles'
import { StyledFlexRow } from '../styled/FlexRow.styles'
import { StyledBox } from '../styled/Box.styles'

//components
import ProductList from '../modal-components/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedDateData } from 'redux/calendar'
import { dateStrToDateObj } from 'utils/miscelaneous'
import { setSessionTime } from 'redux/cart'

//calendar component
export default function CalendarComponent({ hideCalendar }) {
  const [showProductModal, setShowProductModal] = useState(false)

  const dispatch = useDispatch()

  const getFormattedDate = (date) => {
    let year = date.getFullYear()
    let month = (1 + date.getMonth()).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    return month + '-' + day + '-' + year
  }

  const getSelectedBookingDateData = (date) => {
    dispatch(getSelectedDateData(getFormattedDate(date)))
    setShowProductModal(true)
  }

  return (
    <StyledContainer>
      <StyledFlexColumn>
        <StyledFlexColumn
          style={{
            marginTop: '4em',
          }}
        >
          <div>
            {/* TODO: Functionality works, need to implement the clickable hover effect */}
            <FaArrowLeft onClick={() => hideCalendar(true)} />
            <span>Step 1 of 4</span>
          </div>

          <h3>Choose the date</h3>
        </StyledFlexColumn>

        <div className="calendar-container">
          {/*TODO: The maxDate prop can help to only allow users select days loaded on db */}
          <Calendar onClickDay={(date) => getSelectedBookingDateData(date)} />
        </div>
        {showProductModal && (
          <ProductList step1NextPageState={setShowProductModal} />
        )}
      </StyledFlexColumn>
    </StyledContainer>
  )
}

//Time component displays the time slot when the value of showTime changes to true.

export function Time({ showTime, date }) {
  return <div>{showTime ? <Times date={date} /> : null}</div>
}

//Times component shows available time slots
export function Times({ room }) {
  const [eventTime, setEventTime] = useState(null)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const date = useSelector(({ calendar }) => calendar.data)
  const timeSlots = Object.entries(date[room].timeSlots).sort()

  const cart = useSelector(({ cart }) => cart.data)

  // TODO: For V2 when it will be possible to buy more than one type of product at the same time we will have a bug because of cart.length and cart[0]

  // TODO: Display the timeSlots on a grid, now they are a large single row

  if (!cart.length) return null

  const handleClick = (e) => {
    if (date) {
      dispatch(
        setSessionTime({
          selectedProduct: cart[0].name,
          startingTime: e.target.innerText,
        })
      )
      setEventTime(e.target.innerText)
      timeSlots && setShow(true)
    }
  }

  return (
    <StyledFlexColumn className="times">
      <StyledFlexRow>
        {timeSlots.map((timeSlot) => {
          if (timeSlot[1] - cart[0].quantity > 0)
            return (
              <StyledBox key={timeSlot[0]} onClick={(e) => handleClick(e)}>
                {timeSlot[0]}
              </StyledBox>
            )
        })}
      </StyledFlexRow>
      {cart[0].startingTime ? (
        <StyledFlexRow>
          Your appointment is set to {cart[0].startingTime} on
          {dateStrToDateObj(date.id)}
        </StyledFlexRow>
      ) : null}
    </StyledFlexColumn>
  )
}
