import React from 'react'
import Navbar from '../components/Navbar'
import MyFooter from '../components/MyFooter'
import ProductSection from '../components/ProductSection'
import '../styles/Product.css'

const ProductsPage = () => {
  return (
    <>
    <Navbar/>
    <div className="product-container">      
      <ProductSection/>
    </div>
    <MyFooter/>
    </>
  )
}

export default ProductsPage