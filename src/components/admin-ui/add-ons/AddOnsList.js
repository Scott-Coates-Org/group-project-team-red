import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAddOns } from 'redux/addOn'
import AddOnForm from './AddOnForm'
import AddOnListItem from './AddOnListItem'

export default function AddOnsList() {
  const dispatch = useDispatch()

  const { data, isLoaded, hasErrors } = useSelector((state) => state.addOn)

  useEffect(() => {
    // dispatch async thunks are promises
    // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
    dispatch(fetchAllAddOns())
  }, [dispatch])

  return (
    <nav className="d-flex flex-column align-items-center">
      <h1 className="my-3 text-center">Create New Add-On</h1>
      <section>
        {!isLoaded && 'Add-Ons loading…'}
        {hasErrors && 'Error Loading'}
        {isLoaded && (
          <div>
            <h4 className="my-3 text-center">Rooms</h4>
            <AddOnForm />
            {data.map((addOn) => {
              return <AddOnListItem key={addOn.id} {...addOn} />
            })}
          </div>
        )}
      </section>
    </nav>
  )
}
