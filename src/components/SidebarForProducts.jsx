import React from 'react';
import { Input, Slider, Select, Button, Collapse } from 'antd';
import Link from 'antd/es/typography/Link';
import '../styles/Sidebar.css'

const { Search } = Input;
const { Option } = Select;

const SidebarForProducts = ({ filters, onFilterChange, resetFilters, onSearch, activeIngredients }) => {

    const handleCropChange = (value) => {
        onFilterChange({ aplicableCrops: value });
    };

    const handleCategoryChange = (value) => {
        onFilterChange({ category: value });
    };

    const items = [
        {
            key: '1',
            label: 'Поиск',
            children: (
                <Search
                    placeholder="Поиск по названию"
                    onSearch={onSearch}
                    enterButton="Поиск"
                    style={{
                        width: '100%',
                        borderRadius: '0.75rem',
                        transition: 'all 0.3s ease-out', // Добавляем плавность анимации
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Фиксируем тень
                    }}
                    className="hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-out"
                />

            ),
        },
        {
            key: '2',
            label: 'Категория',
            children: (
                <Select
                    placeholder="Выберите категорию"
                    onChange={handleCategoryChange}
                    style={{ width: '100%' }}
                    value={filters.category}
                >
                    <Option value="Не выбрано">Не выбрано</Option>
                    <Option value="Гербициды">Гербициды</Option>
                    <Option value="ПГР">ПГР</Option>
                    <Option value="Специальные Препараты">Специальные Препараты</Option>
                    <Option value="Инсектициды">Инсектициды</Option>
                    <Option value="Удобрения">Удобрения</Option>
                    <Option value="Акарициды">Акарициды</Option>
                    <Option value="Нематициды">Нематициды</Option>
                    <Option value="Фунгициды">Фунгициды</Option>
                    <Option value="Моллюскоциды">Моллюскоциды</Option>
                    <Option value="Фумиганты">Фумиганты</Option>
                </Select>
            ),
        },
        {
            key: '3',
            label: 'Применимые Культуры',
            children: (
                <Select
                    mode="multiple"
                    placeholder="Выберите культуры"
                    style={{ width: '100%' }}
                    onChange={handleCropChange}
                    value={filters.aplicableCrops}
                >
                    {activeIngredients.map((crop) => (
                        <Option key={crop} value={crop}>
                            {crop}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            key: '4',
            label: 'Вся продукция',
            children: (
                // <Slider
                //     range
                //     min={minPrice}
                //     max={maxPrice}
                //     defaultValue={filters.priceRange}
                //     onChange={handlePriceChange}
                // />
                <Link href="../../public/assets/pdf/dogal.pdf" className='no-underline flex justify-center' download="dogal.pdf">
                    <button
                        className="px-4 py-1 m-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-xl transition-transform duration-300 ease-out hover:scale-105 shadow-md hover:shadow-lg"
                        style={{ willChange: "transform" }}
                    >
                        Полный список препаратов
                    </button>
                </Link>
            ),
        },
    ];

    return (
        <div className="sidebar p-4 h-3/4 sticky top-14 left-0 right-0 bg-white shadow-md rounded-lg mb-4 w-1/5 max-[768px]:w-1/2 max-[480px]:static max-[480px]:w-full">
            <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
            <Collapse
                items={items}
                defaultActiveKey={['1', '2']}
                className="bg-white shadow-md rounded-lg"
            />
            <div className="mt-4 text-center">
                <button
                    onClick={resetFilters}
                    className="px-4 py-1 m-1 bg-green-500 hover:bg-green-600 transition-transform duration-300 ease-out hover:scale-105 shadow-md hover:shadow-lg text-white rounded-xl"
                    style={{ willChange: "transform" }}
                >
                    Сбросить фильтры
                </button>
            </div>
        </div>
    );
};

export default SidebarForProducts;
