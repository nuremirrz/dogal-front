import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import certificateImg from '../assets/images/certificate.jpg'

const Sertificate = () => {
  return (
    <div>
        <h2 className='text-3xl text-center m-8 font-semibold'>Сертификаты</h2>      
      <Swiper
      spaceBetween={50}
      slidesPerView={4}
      loop={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img className='h-128 ' src={certificateImg} alt="certificateImg" /></SwiperSlide>
      <SwiperSlide><img className='h-128 ' src={certificateImg} alt="certificateImg" /></SwiperSlide>
      <SwiperSlide><img className='h-128 ' src={certificateImg} alt="certificateImg" /></SwiperSlide>
      <SwiperSlide><img className='h-128 ' src={certificateImg} alt="certificateImg" /></SwiperSlide>      
      <SwiperSlide><img className='h-128 ' src={certificateImg} alt="certificateImg" /></SwiperSlide>      
    </Swiper>
    </div>
  )
}

export default Sertificate