import React from 'react'
import { Carousel } from 'antd'
import Navbar from '../components/Navbar'
import sliderLogo from '../assets/images/slider.png'
import MainMap from '../components/MainMap'
import MyFooter from '../components/MyFooter'
import About from '../components/About'
import News from '../components/News'

const MainPage = () => {

  return (
    <>
      <Navbar />
      <Carousel autoplay autoplaySpeed={5000} draggable>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
      </Carousel>
      <About/>
      <News/>
      <h2 className='text-3xl text-center font-semibold'>Сертификаты</h2>
      <Carousel autoplay autoplaySpeed={3000} draggable>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
      </Carousel>
      <MainMap/>
      <MyFooter/>
    </>
  )
}

export default MainPage