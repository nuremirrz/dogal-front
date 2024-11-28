import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import certificateImg1 from '../assets/images/cert1.png';
import certificateImg2 from '../assets/images/cert2.png';
import certificateImg3 from '../assets/images/cert3.png';
import certificateImg4 from '../assets/images/cert4.png';
import certificateImg5 from '../assets/images/cert5.png';

const Sertificate = () => {
  // Массив с изображениями сертификатов
  const certificates = [certificateImg1, certificateImg2, certificateImg3, certificateImg4, certificateImg5];

  return (
    <div>
      <h2 className='text-4xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6'>
        <span 
          className='text-green-50 px-5 italic font-custom bg-green-600 max-[480px]:px-4' 
          style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
        >
          Сертификаты
        </span>
      </h2>

      <Swiper
  slidesPerView={3}
  spaceBetween={30} // Промежуток между карточками слайдера
  loop={true}
  className="w-2/3 m-auto my-14 max-[480px]:my-4"
  breakpoints={{
    // Уменьшаем количество карточек на маленьких экранах
    320: {
      slidesPerView: 1, // 1 карточка на маленьких экранах
      spaceBetween: 20,  // Меньший промежуток на маленьких экранах
    },
    640: {
      slidesPerView: 2, // 2 карточки на экранах среднего размера
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3, // 3 карточки на больших экранах
      spaceBetween: 30,
    },
  }}
>
  {certificates.map((img, index) => (
    <SwiperSlide
      key={index}
      className="certificate-slide flex justify-center items-center h-64" // Добавляем правильное выравнивание
    >
      <img 
        className="h-auto max-h-full w-auto object-contain" // Контроль пропорций изображения
        src={img} 
        alt={`Сертификат ${index + 1}`} 
        loading="lazy" // Lazy loading для улучшения производительности
      />
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
}

export default Sertificate;
