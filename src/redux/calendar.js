import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebaseClient from 'firebase/client'
import firebase from 'firebase/app'

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

const _getSelectedDateData = async (selectedDate) => {
  const snapshot = await firebaseClient
    .firestore()
    .collection('dates')
    .where(firebase.firestore.FieldPath.documentId(), '==', selectedDate)
    .get()

  const data = snapshot.docs.map((doc) => doc.data())

  return data
}
