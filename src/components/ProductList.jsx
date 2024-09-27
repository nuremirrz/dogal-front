import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/apiService';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(); 
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);                
            }
        };

        fetchProducts();
        
    }, []);

    return (
        <>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductList;
