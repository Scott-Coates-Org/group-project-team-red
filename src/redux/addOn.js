// https://dev.to/thatgalnatalie/how-to-get-started-with-redux-toolkit-41e
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebaseClient from 'firebase/client'

const initialState = {
  data: {},
  isLoaded: false,
  hasErrors: false,
}

const addOn = createSlice({
  name: 'addOn',
  initialState,
  reducers: {
    getData: (state) => {
      console.log(state)
    },

    getDataSuccess: (state, action) => {
      state.isLoaded = true
      state.data = action.payload
    },

    getDataFailure: (state, action) => {
      state.isLoaded = true
      state.hasErrors = true
      console.log(action)
    },

    createDataFailure: (state) => {
      state.hasErrors = true
    },
  },
})

export const reducer = addOn.reducer

export const { getData, getDataSuccess, getDataFailure, createDataFailure } =
  addOn.actions

export const fetchAllAddOns = createAsyncThunk(
  'addOn/fetchAllAddOns',
  async (_, thunkAPI) => {
    // Set the loading state to true
    thunkAPI.dispatch(getData())

    try {
      const data = await _fetchAllAddOnsFromDb()
      thunkAPI.dispatch(getDataSuccess(data))
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(getDataFailure(error))
    }
  }
)

export const createAddOn = createAsyncThunk(
  'addOn/createAddOn',
  async (payload, thunkAPI) => {
    try {
      await _createAddOn(payload.name, payload.price, payload.photo)
    } catch (error) {
      console.error('error', error)
      // Set any erros while trying to fetch
      thunkAPI.dispatch(createDataFailure())
    }
  }
)

export const savePhoto = createAsyncThunk(
  'addOn/savePhoto',
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
            console.log('progress:', progress)
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

async function _fetchAllAddOnsFromDb() {
  const snapshot = await firebaseClient.firestore().collection('addOns').get()

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  return data
}

async function _createAddOn(name, price, photo) {
  const doc = await firebaseClient
    .firestore()
    .collection('addOns')
    .add({ name, price, photo })

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
