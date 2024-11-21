import React from 'react';
import { Input, Slider, Select, Button, Collapse } from 'antd';

const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const SidebarForProducts = ({ filters, onFilterChange, resetFilters, onSearch, activeIngredients, minPrice, maxPrice }) => {
    const handlePriceChange = (value) => {
        onFilterChange({ priceRange: value });
    };

    const handleCropChange = (value) => {
        onFilterChange({ aplicableCrops: value });
    };

    const handleCategoryChange = (value) => {
        onFilterChange({ category: value });
    };

    return (
        <Collapse
            defaultActiveKey={['1', '2']}
            className="p-4 h-3/4 sticky top-12 left-0 right-0 bg-white shadow-md rounded-lg mb-4 w-1/5 max-[768px]:w-1/2"
        >
            {/* Поиск */}
            <Panel header="Поиск" key="1">
                <Search
                    placeholder="Поиск по названию"
                    onSearch={onSearch}
                    enterButton="Поиск"
                    style={{ width: '100%' }}
                />
            </Panel>

            {/* Категория */}
            <Panel header="Категория" key="2">
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
            </Panel>

            {/* Цена */}
            <Panel header="Цена" key="3">
                <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    defaultValue={filters.priceRange}
                    onChange={handlePriceChange}
                />
            </Panel>

            {/* Применимые Культуры */}
            <Panel header="Применимые Культуры" key="4">
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
            </Panel>

            {/* Сброс фильтров */}
            <div className="mt-4 text-center">
                <Button
                    type="default"
                    onClick={resetFilters}
                    className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                >
                    Сбросить фильтры
                </Button>
            </div>
        </Collapse>
    );
};

export default SidebarForProducts;
