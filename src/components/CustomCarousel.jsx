import React from 'react';
import { Carousel } from 'antd';
import sliderLogo from '../assets/images/slider.png';
import sliderLogo2 from '../assets/images/slider2.png'
import sliderLogo3 from '../assets/images/slider3.png'
import sliderLogo4 from '../assets/images/slider4.jpg'
import '../styles/CustomCarousel.css'; // Создадим файл для стилей

const CustomCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel autoplay autoplaySpeed={5000} draggable>
        <div>
          <img className="carousel-image" src={sliderLogo} alt="Slider 1" />
        </div>
        <div>
          <img className="carousel-image" src={sliderLogo2} alt="Slider 2" />
        </div>
        <div>
          <img className="carousel-image" src={sliderLogo3} alt="Slider 3" />
        </div>
        <div>
          <img className="carousel-image" src={sliderLogo4} alt="Slider 4" />
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
