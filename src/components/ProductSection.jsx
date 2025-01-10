import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Pagination, Spin, Modal } from 'antd';
import ProductList from './ProductList';
import Sidebar from './SidebarForProducts';
import axios from 'axios';
// import agro from '../assets/images/agro.png'
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
    const [loading, setLoading] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для выбранного продукта
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const uniqueCrops = [...new Set(products.flatMap(product => product.aplicableCrops))].sort((a, b) => a.localeCompare(b));
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

    const handleProductClick = (product) => {
        setSelectedProduct(product); // Устанавливаем выбранный продукт
        setIsModalOpen(true); // Открываем модальное окно
    };

    const handleCloseModal = () => {
        setSelectedProduct(null); // Сбрасываем выбранный продукт
        setIsModalOpen(false); // Закрываем модальное окно
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex agro">
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
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <h2 className="text-4xl text-center m-4 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
                            <span
                                className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110 hover:translate-y-1"
                                style={{ display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', borderRadius: '10px' }}
                            >
                                Список Продуктов
                            </span>
                        </h2>
                        {/* <img src={agro} alt="agro" className="agro" /> */}
                        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <p className="text-customGreen-800 font-semibold">Количество Товаров: {filteredProducts.length}</p>
                        </div> */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <p className="text-green-50 rounded-xl px-5 py-1 mb-2 bg-orange-400">Количество Товаров: {filteredProducts.length}</p>
                        </div>
                        {filteredProducts.length === 0 ? (
                            <p className="text-center text-gray-500 mt-8">Продукты не найдены</p>
                        ) : (
                            <ProductList products={paginatedProducts} onProductClick={handleProductClick} />
                        )}

                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={filteredProducts.length}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['8', '10', '20', '50', '100']}
                            onShowSizeChange={(current, size) => {
                                setItemsPerPage(size);
                                setCurrentPage(1);
                            }}
                            style={{ marginTop: '20px', marginBottom: '30px', textAlign: 'center' }}
                        />
                    </>
                )}
                <Modal
                    title={selectedProduct?.name}
                    open={isModalOpen}
                    onCancel={handleCloseModal}
                    footer={null}
                >
                    {selectedProduct && (
                        <div>
                            <img className='h-56' src={selectedProduct.image} alt="photo" />
                            <p><strong>Категория:</strong> {selectedProduct.category}</p>
                            {selectedProduct.activeIngredients && (
                                <p>
                                    <strong>Активные ингредиенты:</strong> {selectedProduct.activeIngredients.join(', ')}
                                </p>
                            )}
                            <p><strong>Описание:</strong> {selectedProduct.description}</p>
                            {selectedProduct.aplicableCrops && (
                                <p>
                                    <strong>Применимые культуры:</strong> {selectedProduct.aplicableCrops.join(', ')}
                                </p>
                            )}

                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default ProductSection;
