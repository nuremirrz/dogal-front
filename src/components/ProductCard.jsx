import React from 'react';
import { Card } from 'antd';

const ProductCard = ({ product }) => (
    <Card
        hoverable
        cover={<img alt={product.name} src={product.image} />}
    >
        <Card.Meta
            title={product.name}
            description={
                <div>
                    <p>{product.description}</p>
                    <p><strong>Цена: </strong>{product.price} сом</p>
                </div>
            }
        />
    </Card>
);

export default ProductCard;
