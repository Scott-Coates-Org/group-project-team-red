import React, { useState } from 'react'

export default function AdminDashboard() {

  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({
    room: "",
    duration: "",
    price: "",
    photo: "",
  })

  return (
    <div>Admin Dashboard</div>
  )
}
