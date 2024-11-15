import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Pagination } from 'antd';
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
        activeIngredients: [],
    });
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

    // Добавляем обработчик touchmove с passive: true для устранения предупреждения
    useEffect(() => {
        const handleTouchMove = () => {};

        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);
    // Получаем уникальные активные ингредиенты из продуктов
    const uniqueActiveIngredients = [...new Set(products.flatMap(product => product.activeIngredients))];

    // Вычисляем минимальную и максимальную цену из данных продуктов
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
            priceRange: [minPrice, maxPrice], // Сбрасываем на минимальную и максимальную цены из базы данных
            activeIngredients: [],
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
                const activeIngredientsMatch = product.activeIngredients && product.activeIngredients.some(ingredient => 
                    ingredient.toLowerCase().includes(lowerCaseSearchTerm)
                );
                return nameMatch || descriptionMatch || activeIngredientsMatch;
            });
        }
        if (filters.priceRange) {
            filtered = filtered.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
        }
        if (filters.activeIngredients.length > 0) {
            filtered = filtered.filter(product =>
                product.activeIngredients && product.activeIngredients.some(ingredient =>
                    filters.activeIngredients.includes(ingredient)
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
                activeIngredients={uniqueActiveIngredients}
                minPrice={minPrice}  // Передаем минимальную цену
                maxPrice={maxPrice}  // Передаем максимальную цену
            />
            <div className="flex-grow p-4">
                <Title className='text-4xl text-center m-8 font-semibold text-green-600' level={2}>Список Продукции</Title>
                <p className="text-gray-500">Количество Товаров: {products.length}</p>
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
            </div>
        </div>
    );
};

export default ProductSection;
