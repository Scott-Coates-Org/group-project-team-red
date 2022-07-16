import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  isLoaded: false,
  hasErrors: false,
  errorMsg: '',
}

const customer = createSlice({
  name: 'customer',
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
      state.data = { ...state.data, waiverSignature: action.payload }
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

export const reducer = customer.reducer

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
} = customer.actions

export const setCustomerData = createAsyncThunk(
  'customer/setCustomer',
  async (customerObj, thunkAPI) => {
    thunkAPI.dispatch(createData())
    try {
      thunkAPI.dispatch(createDataSuccess(customerObj))
    } catch (error) {
      console.error('error', error)
      thunkAPI.dispatch(updateDataFailure(error))
    }
  }
)

export const appendCustomerWaiver = createAsyncThunk(
  'customer/appendWaiver',
  async (encodedWaiverString, thunkAPI) => {
    thunkAPI.dispatch(appendData())
    try {
      thunkAPI.dispatch(appendDataSuccess(encodedWaiverString))
    } catch (error) {
      console.error('error', error)
      thunkAPI.dispatch(appendDataFailure(error))
    }
  }
)
