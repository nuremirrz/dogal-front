import React from 'react'
import Navbar from '../components/Navbar'
import MyFooter from '../components/MyFooter'
import '../styles/Contact.css'

const ContactPage = () => {
  return (
    <>
    <Navbar/>
    <div className="contact-container">
      <h1 className='contact-title text-center'>Свяжитесь с нами</h1>
    </div>
    <MyFooter/>
    </>
  )
}

export default ContactPage