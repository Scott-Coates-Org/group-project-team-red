/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebaseClient from 'firebase/client'
import firebase from 'firebase/app'
import moment from 'moment'

const initialState = {
  data: {},
  isLoaded: false,
  hasErrors: false,
  errorMsg: '',
}

const calendar = createSlice({
  name: 'calendar',
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

export const reducer = calendar.reducer

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
} = calendar.actions

export const getSelectedDateData = createAsyncThunk(
  'calendar/getSelectedDateData',
  async (selectedDate, thunkAPI) => {
    thunkAPI.dispatch(getData())
    try {
      const data = await _getSelectedDateData(selectedDate)
      thunkAPI.dispatch(getDataSuccess(...data))
    } catch (error) {
      thunkAPI.dispatch(getDataFailure(error))
    }
  }
)

export const updateSelectedDateTimeslots = createAsyncThunk(
  'calendar/updateSelectedDateTimeslots',
  async (bookingObj, thunkAPI) => {
    thunkAPI.dispatch(updateData())
    try {
      const { startingTime, ticketsCount, productName, date, room } =
        bookingObj.orderDetails
      const selectedDate = await _getSelectedDateData(date)
      const timeSlots = selectedDate[0][room].timeSlots
      let newTimeSlots = {}
      const startingTimeMoment = moment(startingTime, 'HH:mm')

      if (productName.includes('Unlimited Pass')) {
        // TODO: Change this in V2 when more than one type of ticket can be bought
        for (const [timeSlot, headCount] of Object.entries(timeSlots)) {
          if (moment(timeSlot, 'HH:mm') < startingTimeMoment) {
            newTimeSlots[timeSlot] = headCount
          } else {
            newTimeSlots[timeSlot] = headCount - ticketsCount
          }
        }
      }
      const endingTimeMoment = moment(startingTime, 'HH:mm').add(2, 'hours')
      if (productName.includes('Power Pass')) {
        // TODO: Change this in V2 when more than one type of ticket can be bought
        for (const [timeSlot, headCount] of Object.entries(timeSlots)) {
          if (
            moment(timeSlot, 'HH:mm') < startingTimeMoment ||
            moment(timeSlot, 'HH:mm') >= endingTimeMoment
          ) {
            newTimeSlots[timeSlot] = headCount
          } else {
            newTimeSlots[timeSlot] = headCount - ticketsCount
          }
        }
      }

      const data = await _updateTimeSlotsCapacity({
        id: date,
        room,
        newTimeSlots,
      })

      thunkAPI.dispatch(updateDataSuccess())
    } catch (error) {
      thunkAPI.dispatch(getDataFailure(error))
    }
  }
)

const _getSelectedDateData = async (selectedDate) => {
  const snapshot = await firebaseClient
    .firestore()
    .collection('dates')
    .where(firebase.firestore.FieldPath.documentId(), '==', selectedDate)
    .get()

  const data = snapshot.docs.map((doc) => doc.data())

  return data
}

const _updateTimeSlotsCapacity = async (timeSlotsObj) => {
  // let timeSlotsUpdate = {}
  // timeSlotsUpdate[`${timeSlotsObj.room}.timeSlots`] = timeSlotsObj.newTimeSlots

  const snapshot = await firebaseClient
    .firestore()
    .collection('dates')
    .doc(timeSlotsObj.id)
    .update({ [`${timeSlotsObj.room}.timeSlots`]: timeSlotsObj.newTimeSlots })
}
