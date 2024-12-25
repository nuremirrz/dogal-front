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
        spaceBetween={30}
        loop={true}
        className="w-2/3 m-auto my-14 max-[480px]:my-4"
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
    </div>
  );
}

export default Sertificate;
