import React from 'react';
import { Carousel } from 'antd';
import sliderLogo from '../assets/images/slider.png';
import sliderLogo1 from '../assets/images/slider1.png';
import sliderLogo2 from '../assets/images/slider2.png';
import '../styles/CustomCarousel.css'; // Создадим файл для стилей

const CustomCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel autoplay autoplaySpeed={5000} draggable>
        <div>
          <img className="carousel-image" src={sliderLogo} alt="Slider 1" />
        </div>
        <div>
          <img className="carousel-image" src={sliderLogo1} alt="Slider 2" />
        </div>
        <div>
          <img className="carousel-image" src={sliderLogo2} alt="Slider 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
