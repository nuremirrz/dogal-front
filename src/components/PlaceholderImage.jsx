import React from 'react';

const PlaceholderImage = ({ alt }) => {
    return (
        <div className="flex justify-center items-center w-full h-full bg-gray-200 text-gray-500">
            <span>{alt || 'Изображение недоступно'}</span>
        </div>
    );
};

export default PlaceholderImage;
