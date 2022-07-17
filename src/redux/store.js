// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { reducer as user } from './user'
import { reducer as product } from './product'
import { reducer as room } from './room'
import { reducer as addOn } from './addOn'
import { reducer as calendar } from './calendar'
import { reducer as cart } from './cart'
import { reducer as customer } from './customer'
import { reducer as bookingDetails } from './bookingDetails'

const reducer = combineReducers({
  user,
  product,
  room,
  addOn,
  calendar,
  cart,
  customer,
  bookingDetails,
})

const store = configureStore({
  reducer,
})

export default store
