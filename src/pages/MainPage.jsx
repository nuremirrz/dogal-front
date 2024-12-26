import React from 'react'
import Navbar from '../components/Navbar'
import CustomCarousel from '../components/CustomCarousel'
import About from '../components/About'
import News from '../components/News'
import Sertificate from '../components/Sertificate'
import MainMap from '../components/MainMap'
import MyFooter from '../components/MyFooter'

const MainPage = () => {

  return (
    <>
      <Navbar /> 
      <CustomCarousel />     
      {/* <Carousel autoplay autoplaySpeed={5000} draggable>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo1} alt="sliderLogo1" /></div>
        <div><img src={sliderLogo2} alt="sliderLogo2" /></div>        
      </Carousel> */}
      <About/>
      <News/>
      <Sertificate/>
      <MainMap/>
      <MyFooter/>
    </>
  )
}

export default MainPage