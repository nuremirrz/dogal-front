import React from 'react'
import { Carousel, Card } from 'antd'
import Navbar from '../components/Navbar'
import sliderLogo from '../assets/slider.png'
import MainMap from '../components/MainMap'

const MainPage = () => {

  return (
    <>
      <Navbar />
      <Carousel autoplay>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
      </Carousel>
      <h2 className='text-3xl text-center font-semibold'>О Компании</h2>
      <div className="about-company flex">
        <Card style={{ width: 500 }}>
          <h3 className='text-2xl mb-5 font-semibold'>Наше видение и ценности</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, nihil reiciendis aut corporis laudantium explicabo odit natus eaque optio laborum, in saepe impedit doloremque ipsam ullam nisi praesentium voluptates voluptatum eligendi minima tempore asperiores soluta.</p>
        </Card>
        <Card><img src={sliderLogo} alt="companyPhoto" /></Card>
      </div>
      <h2 className='text-3xl text-center font-semibold'>Новости</h2>
      <Carousel autoplay>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
      </Carousel>
      <h2 className='text-3xl text-center font-semibold'>Сертификаты</h2>
      <Carousel autoplay>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
        <div><img src={sliderLogo} alt="sliderLogo" /></div>
      </Carousel>
      <MainMap/>
    </>
  )
}

export default MainPage