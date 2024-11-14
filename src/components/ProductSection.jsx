import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Input, Select, Pagination } from 'antd';
import ProductList from './ProductList';
import axios from 'axios';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleCategoryChange = (value) => {
        setCategory(value);
        filterProducts(value, searchTerm);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        filterProducts(category, value);
    };

    const filterProducts = (category, searchTerm) => {
        let filtered = products;
        if (category && category !== "Не выбрано") {
            filtered = filtered.filter(product => product.category === category);
        }
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase()

            filtered = filtered.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(lowerCaseSearchTerm)
                const descriptionMatch = product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm)
                const activeIngredientsMatch = product.activeIngredients && product.activeIngredients.some(ingredient => 
                    ingredient.toLowerCase().includes(lowerCaseSearchTerm)
                );

                return nameMatch || descriptionMatch || activeIngredientsMatch;
            })
        }
        setFilteredProducts(filtered);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <Title className='text-4xl text-center m-8 font-semibold text-green-600' level={2}>Продукция</Title>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Search
                    placeholder="Поиск по названию"
                    onSearch={handleSearch}
                    enterButton
                    style={{ width: '30%' }}
                />
                <Select
                    placeholder="Выберите категорию"
                    onChange={handleCategoryChange}
                    style={{ width: '20%' }}
                    value={category}
                >
                    <Option value="Не выбрано">Не выбрано</Option>
                    <Option value="Гербициды">Гербициды</Option>
                    <Option value="ПГР">ПГР</Option>
                    <Option value="Инсектициды">Инсектициды</Option>
                    <Option value="Акарициды">Акарициды</Option>
                    <Option value="Нематициды">Нематициды</Option>
                    <Option value="Фунгициды">Фунгициды</Option>
                    <Option value="Моллюскоциды">Моллюскоциды</Option>
                    <Option value="Фумиганты">Фумиганты</Option>
                </Select>
            </div>
            <ProductList products={paginatedProducts} />
            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={filteredProducts.length}
                onChange={handlePageChange}
                style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}
            />
        </div>
    );
};

export default ProductSection;
