import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRooms } from 'redux/room'
import RoomForm from './RoomForm'
import RoomListItem from './RoomListItem'

export default function RoomsList() {
  const dispatch = useDispatch()

  const { data, isLoaded, hasErrors } = useSelector((state) => state.room)

  useEffect(() => {
    // dispatch async thunks are promises
    // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
    dispatch(fetchAllRooms())
  }, [dispatch])

  return (
    <nav className="d-flex flex-column align-items-center">
      <h1 className="my-3 text-center">Create New Room</h1>
      <section>
        {!isLoaded && 'Rooms loading…'}
        {hasErrors && 'Error Loading'}
        {isLoaded && (
          <div>
            <h4 className="my-3 text-center">Rooms</h4>
            <RoomForm />
            {data.map((room) => {
              return <RoomListItem key={room.id} {...room} />
            })}
          </div>
        )}
      </section>
    </nav>
  )
}
