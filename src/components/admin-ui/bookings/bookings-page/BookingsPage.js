import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBookings } from 'redux/bookingDetails'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Inject,
} from '@syncfusion/ej2-react-grids'

import React from 'react'

const BookingsPage = () => {
  const [bookingsDisplayData, setBookingsDisplayData] = useState('')
  const [bookingsIsFormatted, setBookingsIsFormatted] = useState(false)

  const dispatch = useDispatch()

  //import redux bookings data
  const {
    data: bookingsData,
    // isLoaded,
    hasErrors,
    // errorMsg
  } = useSelector((state) => state.bookingDetails)

  //fetch data from db to redux
  useEffect(() => {
    // dispatch async thunks are promises
    // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
    dispatch(fetchAllBookings())
  }, [dispatch])
  console.log(bookingsData)

  //format fetched Data
  const formatData = (dataToFormat) => {
    const formattedData = []
    console.log(dataToFormat)
    dataToFormat.forEach((item) => {
      const {
        date,
        startingTime: time,
        ticketsCount: count,
      } = item.orderDetails
      const { id } = item
      const amount = 82.29
      const {
        firstName,
        lastName,
        cellNumber: phoneNumber,
        email,
      } = item.customerDetails.customerData
      // const formattedDate = Date(date, 'mm:dd:yyyy')
      // const formattedTime = Date(time, 'hh:mm')
      console.log(date, time)
      const bookingName = firstName + ' ' + lastName
      formattedData.push({
        date,
        time,
        id,
        count,
        amount,
        bookingName,
        phoneNumber,
        email,
      })
    })
    console.log('data to Format: ', dataToFormat)
    console.log('formattedData: ', formattedData)
    return formattedData
  }

  useEffect(() => {
    if (bookingsData.length > 0) {
      setBookingsDisplayData(formatData(bookingsData))
      console.log('data to render: ', bookingsDisplayData)
    }
    setBookingsIsFormatted(true)
  }, [bookingsData])

  //grid formatting for Grid Component (dates messy)
  const ordersGrid = [
    {
      field: 'date',
      headerText: 'BOOKING DATE',
      textAlign: 'Center',
      width: '120',
      // format: { type: 'dateTime', format: 'dd MMMM yyyy' },
    },
    {
      field: 'time',
      headerText: 'TIME',
      width: '100',
      textAlign: 'Center',
      // format: { type: 'dateTime', format: 'HH:mm' },
    },
    {
      field: 'id',
      headerText: 'ID',
      width: '80',
      textAlign: 'Center',
    },
    {
      field: 'count',
      headerText: 'COUNT',
      textAlign: 'Center',
      width: '80',
    },
    {
      field: 'amount',
      headerText: 'AMOUNT ($)',
      textAlign: 'Center',
      format: 'C2',
      width: '120',
    },
    {
      field: 'bookingName',
      headerText: 'BOOKING NAME',
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'phoneNumber',
      headerText: 'PHONE NUMBER',
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'email',
      headerText: 'EMAIL',
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'transactionDate',
      headerText: 'TRANSACTION DATE',
      width: '120',
      textAlign: 'Center',
      // format: { type: 'dateTime', format: 'dd MMMM yyyy HH:mm' },
    },
  ]
  return (
    <div>
      <div className="orders-container">
        <h3>Bookings</h3>
        <section>
          {!bookingsIsFormatted && 'Bookings loading…'}
          {hasErrors && 'Error Loading'}
          {bookingsIsFormatted && (
            <div>
              <GridComponent
                id="gridcomp"
                dataSource={bookingsDisplayData}
                allowPaging
                allowSorting
              >
                <ColumnsDirective>
                  {ordersGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page]} />
              </GridComponent>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default BookingsPage
