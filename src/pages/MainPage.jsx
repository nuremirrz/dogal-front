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
      <About/>
      <News/>
      <Sertificate/>
      <MainMap/>
      <MyFooter/>
    </>
  )
}

export default MainPage