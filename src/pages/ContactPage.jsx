import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import MyFooter from '../components/MyFooter';
import '../styles/Contact.css';
import { Spin } from 'antd';

// Динамическая загрузка компонентов
const ContactContent = React.lazy(() => import('../components/ContactContent'));
const ContactMap = React.lazy(() => import('../components/ContactMap'));

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <div className="contact-container">
                {/* Заголовок страницы */}
                
                <h1 className="contact-title text-center text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110"
                    style={{
                        transformOrigin: "center",
                        willChange: "transform"
                    }}>
                    Свяжитесь с нами
                </h1>


                {/* Контент страницы с индикатором загрузки */}
                <Suspense fallback={<Spin size="large" style={{ display: 'block', margin: '50px auto' }} />}>
                    <ContactContent />
                </Suspense>

                {/* Подзаголовок перед картой */}
                <h3 className="contact-subtitle text-center mt-8 text-green-800 font-bold text-3xl mb-8">
                    Наше Местоположение
                </h3>

                {/* Карта с индикатором загрузки */}
                <Suspense fallback={<Spin size="large" style={{ display: 'block', margin: '50px auto' }} />}>
                    <ContactMap />
                </Suspense>
            </div>
            <MyFooter />
        </>
    );
};

export default ContactPage;
