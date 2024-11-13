import React from 'react';
import { Row, Col } from 'antd';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
    <Row gutter={[16, 16]} justify="center">
        {products.map(product => (
            <Col xs={24} sm={12} md={8} lg={5} key={product._id}>
                <ProductCard product={product} />
            </Col>
        ))}
    </Row>
);

export default ProductList;
