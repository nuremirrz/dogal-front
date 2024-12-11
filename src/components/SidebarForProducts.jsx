import React from 'react';
import { Input, Slider, Select, Button, Collapse } from 'antd';
import Link from 'antd/es/typography/Link';

const { Search } = Input;
const { Option } = Select;

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

    const items = [
        {
            key: '1',
            label: 'Поиск',
            children: (
                <Search
                    placeholder="Поиск по названию"
                    onSearch={onSearch}
                    enterButton="Поиск"
                    style={{ width: '100%' }}
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
                <Link href="../../public/assets/pdf/dogal.pdf" download="dogal.pdf">
                <button className="px-4 py-1 m-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded">Получить полный список препоратов</button>
            </Link>
            ),
        },
    ];

    return (
        <div className="p-4 h-3/4 sticky top-14 left-0 right-0 bg-white shadow-md rounded-lg mb-4 w-1/5 max-[768px]:w-1/2">
             <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
            <Collapse
                items={items}
                defaultActiveKey={['1', '2']}
                className="bg-white shadow-md rounded-lg"
            />
            <div className="mt-4 text-center">
                {/* <Button
                    // type="default"
                    onClick={resetFilters}
                    className="bg-green-500 hover:bg-green-600 text-white border-green-600"
                >
                    Сбросить фильтры
                </Button> */}
                <button onClick={resetFilters} className="px-4 py-1 m-1 bg-green-500 hover:bg-green-600 text-white rounded">Сбросить фильтры</button>
            </div>                       
        </div>
    );
};

export default SidebarForProducts;
