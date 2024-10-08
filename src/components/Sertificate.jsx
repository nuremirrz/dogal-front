import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import certificateImg from '../assets/images/certificate.jpg';

const Sertificate = () => {
  // Array of certificate images
  const certificates = [certificateImg, certificateImg, certificateImg, certificateImg, certificateImg];

  return (
    <div>
      <h2 className='text-4xl text-center m-8 font-semibold'>
        <span 
          className='text-green-50 px-5 italic font-custom bg-green-600' 
          style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
        >
          Сертификаты
        </span>
      </h2>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        loop={true}
        className="w-3/4 m-auto my-14"
        onSwiper={(swiper) => console.log(swiper)}
      >
        {certificates.map((img, index) => (
          <SwiperSlide key={index}>
            <img 
              className='h-128' 
              src={img} 
              alt={`Сертификат ${index + 1}`} 
              loading="lazy" // Lazy loading for performance
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Sertificate;
