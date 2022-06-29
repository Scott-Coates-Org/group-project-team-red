import { useState } from 'react'

//calendar
import Calendar from 'react-calendar'
import { StyledBox } from './styled/Box.styles'

//assets
import { FaArrowLeft } from 'react-icons/fa'

//style
import './styled/Calendar.css'
import { StyledContainer } from './styled/Container.styles'
import { StyledFlexColumn } from './styled/FlexColumn.styles'
import { StyledFlexRow } from './styled/FlexRow.styles'
import ProductSelection from './ProductSelection'

//array of available time slots for the date
const time = ['08:00', '09:00', '10:00', '14:00', '15:00']

//calendar component
export default function CalendarComponent() {
  const [date, setDate] = useState(new Date())

  const [showProductModal, setShowProductModal] = useState(false)

  return (
    <StyledContainer>
      <StyledFlexColumn>
        <StyledFlexColumn
          style={{
            marginTop: '4em',
          }}
        >
          <div>
            <FaArrowLeft /> <span>Step 1 of 4</span>
          </div>

          <h3>Choose the date</h3>
        </StyledFlexColumn>

        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setShowProductModal(true)}
          />
        </div>
        {showProductModal && <ProductSelection />}
      </StyledFlexColumn>
    </StyledContainer>
  )
}

//Time component displays the time slot when the value of showTime changes to true.

// export function Time({ showTime, date }) {
//   return <div>{showTime ? <Times date={date} /> : null}</div>
// }

//Times component shows available time slots
export function Times({ date }) {
  const [eventTime, setEventTime] = useState(null)
  const [show, setShow] = useState(false)

  const handleClick = (e) => {
    if (date) {
      setEventTime(e.target.innerText)
      time && setShow(true)
    }
  }
  console.log(eventTime)
  return (
    <StyledFlexColumn className="times">
      <StyledFlexRow>
        {time.map((times) => {
          return (
            <StyledBox key={times} onClick={(e) => handleClick(e)}>
              {times}
            </StyledBox>
          )
        })}
      </StyledFlexRow>{' '}
      {show ? (
        <StyledFlexRow>
          Your appointment is set to {eventTime} on {date.toDateString()}
        </StyledFlexRow>
      ) : null}
    </StyledFlexColumn>
  )
}
