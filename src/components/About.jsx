import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import famLogo from '../assets/images/dogalFam.JPG'; // Ваше изображение
import grape from '../assets/images/enjoy-2.png'
import stick2 from '../assets/images/branch-2.png'
import "../styles/About.css"; // Подключаем стили

gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;

    // GSAP + ScrollTrigger
    gsap.from(el, {
      x: -200, // Элемент появляется с левой стороны
      opacity: 0, // Начальная прозрачность
      duration: 2.5, // Длительность анимации
      ease: "power2.out", // Плавность движения
      scrollTrigger: {
        trigger: el, // Элемент, за которым будет следить ScrollTrigger
        start: "top 80%", // Анимация начнется, когда элемент войдет в 80% высоты окна
        end: "bottom 60%", // Анимация завершится, когда элемент достигнет 60% высоты окна
        toggleActions: "play none none none", // Анимация запускается только при входе в область
      },
    });
  }, []);

  return (
    <div className='about' ref={aboutRef}>
      <h2 className="text-4xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
        <span
          className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110"
          style={{
            display: 'inline-block',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            willChange: 'transform', // Оптимизация для анимации
            transformOrigin: 'center', // Убирает резкие скачки
          }}
        >
          О Компании
        </span>
      </h2>
      
      <div className="about-container">
        <div className="about-card">
          <img className="about-image" src={famLogo} alt="Company" />
          <div className="about-content">
            <h3 className="about-header">Наше видение и ценности</h3>
            <p className="about-text">
              Мы стремимся стать ведущим партнером в сельском хозяйстве, предоставляя качественные средства защиты растений для устойчивого увеличения урожайности. <br />
              Мы уверены, что поддержка фермеров в их ежедневных усилиях по улучшению урожайности и сохранению плодородности почвы — это ключ к долгосрочному успеху. <br />
              Наши продукты не только защищают растения, но и способствуют развитию экологически безопасных методов ведения сельского хозяйства.
            </p>
          </div>
        </div>
      </div>
      <img src={grape} className='grape' alt="grape" />
      <img src={stick2} className='stick' alt="stick" />
    </div>

  );
}

export default About;
