import React from 'react'

export default function AddOnListItem(props) {
  return (
    <div
      className="addOn-list-item"
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
      <div className="m-4">Price: {props.price}</div>
    </div>
  )
}
