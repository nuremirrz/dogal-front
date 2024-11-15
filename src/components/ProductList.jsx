import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
  <div className="grid gap-4 grid-cols-1 my-12 sm:grid-cols-3 lg:grid-cols-4">
    {products.map(product => (
      <div
        key={product._id}
        className="flex justify-center"
      >
        <ProductCard product={product} />
      </div>
    ))}
  </div>
);

export default ProductList;
