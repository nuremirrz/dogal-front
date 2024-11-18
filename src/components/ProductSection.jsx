import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Pagination, Spin } from 'antd';
import ProductList from './ProductList';
import Sidebar from './SidebarForProducts';
import axios from 'axios';
import "../styles/ProductSection.css";

const { Title } = Typography;

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: null,
        priceRange: [0, 100000],
        aplicableCrops: [],
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Добавляем состояние для лоадера
    const itemsPerPage = 8;

    const fetchProducts = useCallback(async () => {
        setLoading(true); // Включаем лоадер перед загрузкой данных
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
        } finally {
            setLoading(false); // Выключаем лоадер после загрузки данных
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    
    // Добавляем обработчик touchmove с passive: true для устранения предупреждения
    useEffect(() => {
        const handleTouchMove = () => {};

        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const uniqueCrops = [...new Set(products.flatMap(product => product.aplicableCrops))];
    const minPrice = Math.min(...products.map(product => product.price));
    const maxPrice = Math.max(...products.map(product => product.price));

    const handleFilterChange = (newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        filterProducts(updatedFilters, searchTerm);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        filterProducts(filters, value);
    };

    const resetFilters = () => {
        setFilters({
            category: null,
            priceRange: [minPrice, maxPrice],
            aplicableCrops: [],
        });
        setSearchTerm('');
        setFilteredProducts(products);
    };

    const filterProducts = (filters, searchTerm) => {
        let filtered = products;

        if (filters.category && filters.category !== "Не выбрано") {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(lowerCaseSearchTerm);
                const descriptionMatch = product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm);
                const cropsMatch = product.aplicableCrops && product.aplicableCrops.some(crop => 
                    crop.toLowerCase().includes(lowerCaseSearchTerm)
                );
                return nameMatch || descriptionMatch || cropsMatch;
            });
        }

        if (filters.priceRange) {
            filtered = filtered.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
        }

        if (filters.aplicableCrops.length > 0) {
            filtered = filtered.filter(product =>
                product.aplicableCrops && product.aplicableCrops.some(crop =>
                    filters.aplicableCrops.includes(crop)
                )
            );
        }

        setFilteredProducts(filtered);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex">
            <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                resetFilters={resetFilters}
                onSearch={handleSearch}
                activeIngredients={uniqueCrops}
                minPrice={minPrice}
                maxPrice={maxPrice}
            />

            <div className="flex-grow p-4">
                {loading ? ( // Отображение лоадера, пока данные загружаются
                    <div className="flex justify-center items-center min-h-screen">
                        <Spin size="large" tip="Загрузка продуктов..." />
                    </div>
                ) : (
                    <>
                        <Title className='text-4xl text-center m-8 font-semibold text-green-600' level={2}>Список Продукции</Title>
                        <p className="text-gray-500">Количество Товаров: {filteredProducts.length}</p>
                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={filteredProducts.length}
                            onChange={handlePageChange}
                            style={{ marginBottom: '20px', textAlign: 'center' }}
                        />

                        {filteredProducts.length === 0 ? (
                            <p className="text-center text-gray-500 mt-8">Продукты не найдены</p>
                        ) : (
                            <ProductList products={paginatedProducts} />
                        )}

                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={filteredProducts.length}
                            onChange={handlePageChange}
                            style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductSection;
