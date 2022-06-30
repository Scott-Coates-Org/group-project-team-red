import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from 'redux/product'
import ProductForm from './ProductForm'
import ProductListItem from './ProductListItem'

export default function ProductsList() {
  const dispatch = useDispatch()

  const { data, isLoaded, hasErrors } = useSelector((state) => state.product)

  useEffect(() => {
    // dispatch async thunks are promises
    // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <nav className="d-flex flex-column align-items-center">
      <h1 className="my-3 text-center">Administrator Dashboard</h1>
      <section>
        {!isLoaded && 'Products loading…'}
        {hasErrors && 'Error Loading'}
        {isLoaded && (
          <div>
            <h4 className="my-3 text-center">Products</h4>
            <ProductForm />
            {data.map((product) => {
              return <ProductListItem key={product.id} {...product} />
            })}
          </div>
        )}
      </section>
    </nav>
  )
}
