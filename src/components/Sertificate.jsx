import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'; // Иконки из Ant Design
import 'swiper/css';
import 'swiper/css/autoplay';
import certificateImg1 from '../assets/images/cert1.png';
import certificateImg2 from '../assets/images/cert2.png';
import certificateImg3 from '../assets/images/cert3.png';
import certificateImg4 from '../assets/images/cert4.png';
import certificateImg5 from '../assets/images/cert5.png';

const Sertificate = () => {
  // Массив с изображениями сертификатов
  const certificates = [certificateImg1, certificateImg2, certificateImg3, certificateImg4, certificateImg5];

  
  const handlePrevSlide = () => {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slidePrev();
  };

  const handleNextSlide = () => {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slideNext();
  };

  return (
    <div>
      <h2 className="text-4xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
        <span
          className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110 hover:translate-y-1"
          style={{ display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', borderRadius: '10px' }}
        >
          Сертификаты
        </span>
      </h2>

      <div className="relative w-2/3 m-auto my-14 max-[480px]:my-4">
        {/* Левая стрелка */}
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          onClick={handlePrevSlide}
          style={{
            fontSize: 'calc(1.5rem + 0.5vw)', // Адаптивный размер стрелок
            color: '#16a34a',
          }}
        >
          <LeftOutlined />
        </div>

        <Swiper
         modules={[Autoplay]} // Подключаем модуль Autoplay
         autoplay={{
          delay: 1, // Интервал между переключениями (минимальный)
          disableOnInteraction: false, // Продолжает после взаимодействия
        }}
        speed={5000} // Скорость перехода между слайдами (3 секунды)
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          className="swiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {certificates.map((img, index) => (
            <SwiperSlide
              key={index}
              className="certificate-slide flex justify-center items-center h-64"
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                backgroundColor: '#fff',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img
                className="h-auto max-h-full w-auto object-contain"
                src={img}
                alt={`Сертификат ${index + 1}`}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Правая стрелка */}
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          onClick={handleNextSlide}
          style={{
            fontSize: 'calc(1.5rem + 0.5vw)', // Адаптивный размер стрелок
            color: '#16a34a',
          }}
        >
          <RightOutlined />
        </div>
      </div>
    </div>
  );
};

export default Sertificate;
