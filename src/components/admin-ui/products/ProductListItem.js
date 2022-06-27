import React from 'react'

export default function ProductListItem(props) {
  return (
    <div
      className="product-list-item"
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
      <h4 className="m-4">{props.title}</h4>
      <div className="m-4">Room: {props.room}</div>
      <div className="m-4">Duration: {props.duration}</div>
      <div className="m-4">${props.price}</div>
    </div>
  )
}
