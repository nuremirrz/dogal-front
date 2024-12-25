import React from 'react';
import backgroundImage from '../assets/images/slider.png';

const BlurredBackground = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)', // Эффект размытия
                height: '100vh', // Полноэкранный фон
                width: '100%',
                position: 'absolute', // Фиксация позади остальных элементов
                top: 0,
                left: 0,
                zIndex: -10000, // Отправляем фон назад
            }}
        >
        </div>
    );
};

export default BlurredBackground;
