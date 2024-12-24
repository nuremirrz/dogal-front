import React from 'react';
import famLogo from '../assets/images/dogalFam.JPG'; // Ваше изображение
import "../styles/About.css"; // Подключаем стили

const About = () => {
  return (
    <>
      <h2 className='text-4xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6'>
        <span
          className='text-green-50 rounded-xl px-5 py-2  font-custom bg-green-600 max-[480px]:px-4'
          // style={{ borderRadius: '90%' }}
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
    </>

  );
}

export default About;
