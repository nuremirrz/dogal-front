import React from 'react'
import { Carousel } from 'antd'
import Navbar from '../components/Navbar'
import sliderLogo from '../assets/images/slider.png'
import sliderLogo1 from '../assets/images/slider1.png'
import sliderLogo2 from '../assets/images/slider2.png'
import MainMap from '../components/MainMap'
import MyFooter from '../components/MyFooter'
import About from '../components/About'
import News from '../components/News'
import Sertificate from '../components/Sertificate'

const MainPage = () => {

  return (
    <>
      <Navbar />      
      <Carousel autoplay autoplaySpeed={5000} draggable>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo1} alt="sliderLogo1" /></div>
        <div><img src={sliderLogo2} alt="sliderLogo2" /></div>        
      </Carousel>
      <About/>
      <News/>
      <Sertificate/>
      <MainMap/>
      <MyFooter/>
    </>
  )
}

export default MainPage