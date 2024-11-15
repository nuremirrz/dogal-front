import React from 'react';
import sliderLogo from '../assets/images/slider.png'; // Ваше изображение
import "../styles/About.css"; // Подключаем стили

const About = () => {
  return (
    <>
      <h2 className='text-4xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6'>
        <span
          className='text-green-50 px-5 italic font-custom bg-green-600 max-[480px]:px-4'
          style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
        >
          О Компании
        </span>
      </h2>
      <div className="about-container">
        <div className="about-card">
          <img className="about-image" src={sliderLogo} alt="Company" />
          <div className="about-content">
            <h3 className="about-header">Наше видение и ценности</h3>
            <p className="about-text">
            Стать ведущим партнером в сельском хозяйстве, предоставляя качественные средства защиты растений для устойчивого увеличения урожайности.
            </p>
          </div>
        </div>
      </div>
    </>

  );
}

export default About;
