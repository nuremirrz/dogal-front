import React from 'react';
import { Input, Slider, Checkbox, Select, Button } from 'antd';

const { Search } = Input;
const { Option } = Select;

const SidebarForProducts = ({ filters, onFilterChange, resetFilters, onSearch, activeIngredients, minPrice, maxPrice }) => {
  const handlePriceChange = (value) => {
    onFilterChange({ priceRange: value });
  };

  
  const handleCropChange = (checkedValues) => {
    onFilterChange({ aplicableCrops: checkedValues }); // Изменяем фильтр для культур
};


  const handleCategoryChange = (value) => {
    onFilterChange({ category: value });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 w-1/5 max-[768px]:w-1/2">
      <h3 className="text-lg font-semibold mb-4">Фильтры</h3>

      {/* Поиск по названию */}
      <div className="mb-4">
        <Search
          placeholder="Поиск по названию"
          onSearch={onSearch}
          enterButton="Поиск"
          style={{ width: '100%' }}
        />
      </div>

      {/* Категория */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Категория</label>
        <Select
          placeholder="Выберите категорию"
          onChange={handleCategoryChange}
          style={{ width: '100%' }}
          value={filters.category}
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

      {/* Диапазон цен */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Цена</label>
        <Slider
          range
          min={minPrice}       // Минимальная цена из базы данных
          max={maxPrice}       // Максимальная цена из базы данных
          defaultValue={filters.priceRange}
          onChange={handlePriceChange}
        />
      </div>

      {/* Применимые Культуры */}
<div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Применимые Культуры</label>
    <Checkbox.Group onChange={handleCropChange} value={filters.aplicableCrops}>
        {activeIngredients.map((crop) => (
            <Checkbox key={crop} value={crop}>{crop}</Checkbox>
        ))}
    </Checkbox.Group>
</div>

{/* изменить фильтр */}
      {/* Кнопка для сброса фильтров */}
      <Button type="default" onClick={resetFilters} className="mt-4 bg-green-600 hover:bg-green-700 text-white border-green-600">
        Сбросить фильтры
      </Button>
    </div>
  );
};

export default SidebarForProducts;
