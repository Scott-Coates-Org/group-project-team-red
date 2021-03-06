/* eslint-disable no-unused-vars */
// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebaseClient from 'firebase/client'

const initialState = {
  data: {},
  isLoaded: false,
  hasErrors: false,
}

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getData: (state) => {},

    getDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = action.payload
    },

    getDataFailure: (state, action) => {
      state.isLoaded = true
      state.hasErrors = true
    },

    createDataFailure: (state) => {
      state.hasErrors = true
    },
  },
})

export const reducer = product.reducer

export const { getData, getDataSuccess, getDataFailure, createDataFailure } =
  product.actions

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (_, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData())

    try {
      const data = await _fetchAllProductsFromDb()
      thunkAPI.dispatch(getDataSuccess(data))
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error))
    }
  }
)

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (payload, thunkAPI) => {
    try {
      await _createProduct(
        payload.title,
        payload.room,
        payload.duration,
        payload.price,
        payload.photo
      )
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(createDataFailure())
    }
  }
)

export const savePhoto = createAsyncThunk(
  'product/savePhoto',
  async (payload) => {
    const file = payload.file

    try {
      const fileName = _appendToFilename(file.name, '_' + Date.now())
      const uploadTask = _updloadFile(fileName, file)

      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            reject(error)
          },
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadURL) => resolve(downloadURL))
              .catch(reject)
          }
        )
      })

      const downloadURL = await uploadPromise

      return downloadURL
    } catch (error) {
      alert('Error saving photo: ' + JSON.stringify(error))
    }
  }
)

async function _fetchAllProductsFromDb() {
  const snapshot = await firebaseClient.firestore().collection('products').get()

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return data
}

async function _createProduct(title, room, duration, price, photo) {
  const doc = await firebaseClient
    .firestore()
    .collection('products')
    .add({ title, room, duration, price, photo })

  return doc
}

// https://stackoverflow.com/a/31205878/173957
function _appendToFilename(filename, string) {
  var dotIndex = filename.lastIndexOf('.')
  if (dotIndex === -1) return filename + string
  else
    return (
      filename.substring(0, dotIndex) + string + filename.substring(dotIndex)
    )
}

function _updloadFile(fileName, file) {
  const uploadTask = firebaseClient.storage().ref(`/${fileName}`).put(file)

  return uploadTask
}
