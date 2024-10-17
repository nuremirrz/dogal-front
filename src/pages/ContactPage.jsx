  import React from 'react'
  import Navbar from '../components/Navbar'
  import MyFooter from '../components/MyFooter'
  import ContactContent from '../components/ContactContent'
  import ContactMap from '../components/ContactMap'
  import '../styles/Contact.css'

  const ContactPage = () => {
    return (
      <>
      <Navbar/>
      <div className="contact-container">
        <h1 className='contact-title text-center'>Свяжитесь с нами</h1>
        <ContactContent/>
        <h3 className='contact-subtitle text-customGreen-600'>Наше расположение</h3>
        <ContactMap/>
      </div>
      <MyFooter/>
      </>
    )
  }

  export default ContactPage