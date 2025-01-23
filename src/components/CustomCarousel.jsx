import React, {useState, useEffect} from 'react';
import { Carousel, Spin } from 'antd';
import sliderLogo2 from '../assets/images/slider2.png'
import sliderLogo3 from '../assets/images/slider3.png'
import sliderLogo4 from '../assets/images/slider4.jpg'
import '../styles/CustomCarousel.css'; // Создадим файл для стилей

const CustomCarousel = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const images = [sliderLogo2, sliderLogo3, sliderLogo4];
    const loadImg = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
      })
    }

    Promise.all(images.map(loadImg)).then(()=> {
      setLoading(false);
    })
  }, [])
    
  return (
    <div className="carousel-container">
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ):(
        <Carousel autoplay autoplaySpeed={5000} draggable>
          <div>
            <img className="carousel-image" src={sliderLogo3} alt="Slider 3" />
          </div>
          <div>
            <img className="carousel-image" src={sliderLogo2} alt="Slider 2" />
          </div>
          <div>
            <img className="carousel-image" src={sliderLogo4} alt="Slider 4" />
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default CustomCarousel;
