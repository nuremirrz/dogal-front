import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
    <div className="container mx-auto p-4">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
);

export default ProductList;