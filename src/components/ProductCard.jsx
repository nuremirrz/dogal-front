import React from 'react'
import { Card } from 'antd';

const ProductCard = ({ product }) => {
    // console.log(product)
    return (
        <>
            <Card
                hoverable
                cover={<img alt={product.name} src={product.image} />}
            >
                <Card.Meta
                    title={product.name}
                    description={
                        <div>
                            <p><strong>{product.activeIngredients}</strong></p>
                            <p>{product.description}</p>
                            <p><strong>Цена: </strong>{product.price} сом</p>
                        </div>
                    }
                />
            </Card>

        </>
    )

}

export default ProductCard