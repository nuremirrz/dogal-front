import React from 'react';

const ProductCard = ({ product, onDetailClick }) => {
  return (
    <div className="flex border-2 border-customGreen-300 justify-between items-start p-4 bg-white shadow-md rounded-xl mb-4 max-[768px]:flex-wrap transition-transform transform hover:scale-105 hover:shadow-lg">
      {/* <div className="flex border-2 border-customOrange-800 justify-between items-start p-4 bg-white shadow-md rounded-xl mb-4 max-[768px]:flex-wrap hover:shadow-lg"> */}
      {/* Левая часть - Изображение и информация о продукте */}
      <div className="flex space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500 truncate-text">{product.description}</p>
        </div>
      </div>

      {/* Правая часть - Цена, доступность и кнопки */}
      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center space-x-2 max-[768px]:flex-wrap">
          <button
            className="px-4 py-1 m-1 text-white rounded-xl bg-orange-400 hover:bg-orange-500 transition-transform duration-300 ease-out hover:scale-105 shadow-md hover:shadow-lg"
            style={{ willChange: "transform" }}
            onClick={() => onDetailClick(product)}
          >
            Подробнее
          </button>
          <a href="https://wa.me/c/996501675970" target="_blank" rel="noopener noreferrer">
            <button
              className="px-4 py-1 m-1 text-white rounded-xl bg-green-500 hover:bg-green-600 transition-transform duration-300 ease-out hover:scale-105 shadow-md hover:shadow-lg"
              style={{ willChange: "transform" }}
            >
              Купить
            </button>
          </a>
        </div>
      </div>
    </div>
  );

};

export default ProductCard;
