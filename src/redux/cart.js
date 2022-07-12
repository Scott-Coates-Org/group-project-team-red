// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  isLoaded: false,
  hasErrors: false,
  errorMsg: '',
}

const cart = createSlice({
  name: 'cart',
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

export const reducer = cart.reducer

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
} = cart.actions

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (cartObj, thunkAPI) => {
    try {
      const cartState = thunkAPI.getState().cart.data
      if (cartState.some((p) => p.name === cartObj.name)) {
        thunkAPI.dispatch(updateData())

        const cartToUpdate = cartState.find((p) => p.name === cartObj.name)

        const updatedCart = {
          ...cartToUpdate,
          quantity: cartToUpdate.quantity + 1,
        }

        const newCartsState = cartState.map((p) =>
          p.name !== updatedCart.name ? p : updatedCart
        )
        thunkAPI.dispatch(updateDataSuccess(newCartsState))
        return
      }
      thunkAPI.dispatch(appendData())
      thunkAPI.dispatch(appendDataSuccess(cartObj))
    } catch (error) {
      console.error('error', error)
      thunkAPI.dispatch(appendDataFailure(error))
    }
  }
)

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (cartObj, thunkAPI) => {
    try {
      const cartState = thunkAPI.getState().cart.data

      const cartToUpdate = cartState.find((p) => p.name === cartObj.name)

      if (cartToUpdate.quantity > 1) {
        thunkAPI.dispatch(updateData())

        const updatedCart = {
          ...cartToUpdate,
          quantity: cartToUpdate.quantity - 1,
        }

        const newCartsState = cartState.map((p) =>
          p.name !== updatedCart.name ? p : updatedCart
        )
        thunkAPI.dispatch(updateDataSuccess(newCartsState))
        return
      }
      thunkAPI.dispatch(deleteData())

      const remainingCarts = cartState.filter((p) => p.name !== cartObj.name)
      thunkAPI.dispatch(deleteDataSuccess(remainingCarts))
    } catch (error) {
      console.error('error', error)
      thunkAPI.dispatch(deleteDataFailure(error))
    }
  }
)

export const deleteItem = createAsyncThunk(
  'cart/deleteItem',
  async (itemName, thunkAPI) => {
    try {
      const cartState = thunkAPI.getState().cart.data
      thunkAPI.dispatch(deleteData())

      const remainingCarts = cartState.filter((p) => p.name !== itemName)
      thunkAPI.dispatch(deleteDataSuccess(remainingCarts))
    } catch (error) {
      console.error('error', error)
      thunkAPI.dispatch(deleteDataFailure(error))
    }
  }
)
