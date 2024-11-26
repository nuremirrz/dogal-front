import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="flex justify-between items-start p-4 bg-white shadow-md rounded-lg mb-4 max-[768px]:flex-wrap">
      {/* Левая часть - Изображение и информация о продукте */}
      <div className="flex space-x-4">
        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500 truncate-text">{product.description}</p>
        </div>
      </div>

      {/* Правая часть - Цена, доступность и кнопки */}
      <div className="flex flex-col items-end space-y-2">
        {/* <p className="text-xl font-bold text-center text-green-600">{product.price} сом</p> */}
        <div className="flex items-center space-x-2 max-[768px]:flex-wrap">
          <a href="../../public/assets/pdf/dogal.pdf" download="dogal.pdf">
          <button className="px-4 py-1 m-1 bg-orange-400 hover:bg-orange-500 text-white rounded">Подробнее</button>
          </a>
          <button className="px-4 py-1 m-1 bg-green-500 hover:bg-green-600 text-white rounded">Купить</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;