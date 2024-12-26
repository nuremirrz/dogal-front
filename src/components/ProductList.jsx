import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onProductClick }) => (
    <div className="container mx-auto p-4 border-2 border-customGreen-100 rounded-lg">
      {products.map(product => (
        <ProductCard key={product._id} product={product} onDetailClick={onProductClick} />
      ))}
    </div>
);

export default ProductList;