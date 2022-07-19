// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebaseClient from 'firebase/client'

const initialState = {
  data: [],
  isLoaded: false,
  hasErrors: false,
  errorMsg: '',
}

const booking = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    getData: (state) => {
      state.isLoaded = false
      state.hasErrors = false
      state.errorMsg = ''
    },

    getDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = action.payload
    },

    getDataFailure: (state, action) => {
      state.isLoaded = true
      state.hasErrors = true
      state.errorMsg = action.payload.message
    },
    createData: (state) => {
      state.isLoaded = false
      state.hasErrors = false
      state.errorMsg = ''
    },
    createDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = action.payload
    },
    createDataFailure: (state, action) => {
      state.isLoaded = true
      state.hasErrors = true
      state.errorMsg = action.payload.message
    },
    appendData: (state) => {
      state.isLoaded = false
      state.hasErrors = false
      state.errorMsg = ''
    },
    appendDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = [...state.data, action.payload]
    },
    appendDataFailure: (state, action) => {
      state.isLoaded = true
      state.hasErrors = true
      state.errorMsg = action.payload.message
    },
    // eslint-disable-next-line no-unused-vars
    deleteData: (state, action) => {
      state.isLoaded = false
      state.hasErrors = false
      state.errorMsg = ''
    },
    deleteDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = action.payload
    },
    deleteDataFailure: (state, action) => {
      state.isLoaded = true
      state.hasErrors = true
      state.errorMsg = action.payload.message
    },
    // eslint-disable-next-line no-unused-vars
    updateData: (state, action) => {
      state.isLoaded = false
      state.hasErrors = false
      state.errorMsg = ''
    },
    updateDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = action.payload
    },
    updateDataFailure: (state, action) => {
      state.isLoaded = true
      state.hasErrors = true
      state.errorMsg = action.payload.message
    },
  },
})

export const reducer = booking.reducer

export const {
  getData,
  getDataSuccess,
  getDataFailure,
  createData,
  createDataSuccess,
  createDataFailure,
  appendData,
  appendDataSuccess,
  appendDataFailure,
  deleteData,
  deleteDataSuccess,
  deleteDataFailure,
  updateData,
  updateDataSuccess,
  updateDataFailure,
} = booking.actions

export const fetchAllBookings = createAsyncThunk(
  'booking/fetchAllBookings',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(getData())

    try {
      const data = await _fetchAllBookingsFromDb()
      thunkAPI.dispatch(getDataSuccess(data))
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error))
    }
  }
)

export const getSingleBookingObj = createAsyncThunk(
  'booking/getSingleBookingObj',
  async (id, thunkAPI) => {
    thunkAPI.dispatch(getData())
    try {
      const data = await _fetchBookingById(id)
      thunkAPI.dispatch(getDataSuccess(data))
      return data
    } catch (error) {
      thunkAPI.dispatch(getDataFailure(error))
    }
  }
)

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingObj, thunkAPI) => {
    thunkAPI.dispatch(createData())
    try {
      await _createBooking(bookingObj)
      thunkAPI.dispatch(createDataSuccess(bookingObj))
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(createDataFailure())
    }
  }
)

export const updateBookingBillingStatus = createAsyncThunk(
  'booking/updateBillingStatus',
  async (bookingObj, thunkAPI) => {
    thunkAPI.dispatch(updateData())
    try {
      const newBookingObj = { ...bookingObj }
      newBookingObj.billingStatus = 'Payed'
      await _updateBookingBillingStatus(newBookingObj)
      thunkAPI.dispatch(updateDataSuccess([newBookingObj]))
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(createDataFailure())
    }
  }
)

async function _fetchAllBookingsFromDb() {
  const snapshot = await firebaseClient.firestore().collection('bookings').get()

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return data
}

async function _fetchBookingById(id) {
  const snapshot = await firebaseClient
    .firestore()
    .collection('bookings')
    .where('id', '==', id)
    .get()

  const data = snapshot.docs.map((doc) => doc.data())

  return data
}

async function _createBooking(bookingObj) {
  const doc = await firebaseClient
    .firestore()
    .collection('bookings')
    .doc(bookingObj.id)
    .set(bookingObj)

  return doc
}

const _updateBookingBillingStatus = async (bookingObj) => {
  await firebaseClient
    .firestore()
    .collection('bookings')
    .doc(bookingObj.id)
    .update({
      billingStatus: bookingObj.billingStatus,
    })
}
