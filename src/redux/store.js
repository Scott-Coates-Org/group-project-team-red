// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { reducer as user } from './user'
import { reducer as widget } from './widget'
import { reducer as product } from './product'
import { reducer as room } from './room'
import { reducer as addOn } from './addOn'

const reducer = combineReducers({
  user,
  widget,
  product,
  room,
  addOn,
})

const store = configureStore({
  reducer,
})

export default store
