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
  // getCloneProperties,
} from '@syncfusion/ej2-react-grids'
// import Header from './Header'

import React from 'react'

// import { ordersGrid, ordersData } from './data2'

const BookingsPage = () => {
  let ordersData = (ordersData = [
    {
      date: new Date(2022, 6, 9, 12, 0),
      time: new Date(2022, 6, 9, 12, 0),
      id: 42203142,
      count: 20,
      amount: 187.0,
      bookingName: 'JC Gutierrez',
      transactionDate: new Date(2022, 6, 9, 12, 0),
      // ProductImage: product6,
    },
    {
      date: new Date(2022, 6, 10, 13, 0),
      time: new Date(2022, 6, 10, 13, 0),
      id: 42203172,
      count: 8,
      amount: 569.0,
      bookingName: 'Louise Kelley',
      transactionDate: new Date(2022, 6, 4, 12, 25),
      // ProductImage: product6,
    },
    {
      date: new Date(2022, 6, 10, 13, 0),
      time: new Date(2022, 6, 10, 13, 0),
      id: 42212508,
      count: 30,
      amount: 495.0,
      bookingName: 'Kari Howell',
      transactionDate: new Date(2022, 6, 3, 9, 1),
      // ProductImage: product6,
    },
    {
      IsAllDay: true,
      date: new Date(2022, 6, 11, 13, 0),
      time: new Date(2022, 6, 11, 13, 0),
      id: 42212508,
      count: 30,
      amount: 495.0,
      bookingName: 'Kari Howell',
      transactionDate: new Date(2022, 6, 3, 9, 1),
      // ProductImage: product6,
    },
  ])

  const ordersGrid = [
    {
      field: 'date',
      headerText: 'BOOKING DATE',
      textAlign: 'Center',
      width: '120',
      format: { type: 'dateTime', format: 'dd MMMM yyyy' },
    },
    {
      field: 'time',
      headerText: 'SESSION TIME',
      width: '120',
      textAlign: 'Center',
      format: { type: 'dateTime', format: 'HH:mm' },
    },
    {
      field: 'id',
      headerText: 'BOOKING ID',
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'count',
      headerText: 'HEADCOUNT',
      textAlign: 'Center',
      width: '120',
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
      field: 'transactionDate',
      headerText: 'TRANSACTION DATE',
      width: '120',
      textAlign: 'Center',
      format: { type: 'dateTime', format: 'dd MMMM yyyy HH:mm' },
    },
  ]
  return (
    <div>
      <div className="orders-container">
        <h3>Bookings</h3>
        {/* <Header category="Chart" title="Orders" /> */}
        <GridComponent
          id="gridcomp"
          dataSource={ordersData}
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
    </div>
  )
}

export default BookingsPage
