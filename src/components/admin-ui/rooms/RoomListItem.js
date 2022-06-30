import React from 'react'

export default function RoomListItem(props) {
  return (
    <div
      className="room-list-item"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: '10px',
      }}
    >
      <img className="m-4" src={props.photo} style={{ width: '100px' }} />
      <h4 className="m-4">{props.name}</h4>
      <div className="m-4">Capacity: {props.capacity}</div>
    </div>
  )
}
