  import React from 'react'
  import Navbar from '../components/Navbar'
  import MyFooter from '../components/MyFooter'
  import ContactContent from '../components/ContactContent'
  import ContactMap from '../components/ContactMap'
  import '../styles/Contact.css'
import BlurredBackground from '../components/BlurredBackground'

  const ContactPage = () => {
    return (
      <>
      <Navbar/>
      <div className="contact-container">
        <h1 className='contact-title text-center text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110 hover:translate-y-1'>Свяжитесь с нами</h1>
        <ContactContent/>
        <BlurredBackground/>
        {/* <h3 className='contact-subtitle text-customGreen-600'>Наше расположение</h3> */}
        <h3 className='contact-subtitle mt-4 text-black'>Наше расположение</h3>
        <ContactMap/>
      </div>
      <MyFooter/>
      </>
    )
  }

  export default ContactPage