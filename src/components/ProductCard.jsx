import React from 'react';
import { Card } from 'antd';

const ProductCard = ({ product }) => (
  <Card
    hoverable
    cover={<img alt={product.name} src={product.image} className="w-full h-48 object-contain" />}
    className="w-60 h-85 bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
  >
    <Card.Meta
      title={<h2 className="text-lg font-semibold">{product.name}</h2>}
      description={
        <div>
          <p><strong>{product.activeIngredients}</strong></p>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p><strong>Цена: </strong>{product.price} сом</p>
        </div>
      }
    />
  </Card>
);

export default ProductCard;
