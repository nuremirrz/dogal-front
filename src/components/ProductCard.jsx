import React from 'react';

const ProductCard = ({ product, onDetailClick }) => {
  return (
    <div className="flex border-2 border-customGreen-400 justify-between items-start p-4 bg-white shadow-md rounded-lg mb-4 max-[768px]:flex-wrap">
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
            className=" px-4 py-1 m-1 text-white rounded bg-orange-400 hover:bg-orange-500"
            onClick={() => onDetailClick(product)}
          >
            Подробнее
          </button>
          <a href="https://wa.me/c/996501675970" target="_blank" rel="noopener noreferrer">
            <button              
              className=" px-4 py-1 m-1 text-white rounded bg-green-500 hover:bg-green-600"
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
