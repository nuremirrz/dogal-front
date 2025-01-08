import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import '../styles/TechSupport.css';
import defaultImg from '../assets/images/no-photo.jpg';

const TechSupport = () => {
    const { country, slug } = useParams(); // Получаем country и slug из URL
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const containerRef = useRef(null); // Ссылка на контейнер всех карточек
    const cardRefs = useRef([]); // Массив ссылок для каждой карточки

    // Словарь для отображения наименований регионов/стран на русском
    const regionNames = {
        kazakhstan: 'Казахстане',
        russia: 'России',
        uzbekistan: 'Узбекистане',
        batken: 'Баткенской области',
        chuy: 'Чуйской области',
        osh: 'Ошской области',
        'issyk-kul': 'Иссык-Кульской области',
        talas: 'Таласской области',
        jalalabad: 'Джалал-Абадской области',
        naryn: 'Нарынской области',
    };

    const slugPlace = regionNames[slug] || regionNames[country] || 'указанном регионе';

    // Получение данных сотрудников из API
    useEffect(() => {
        const fetchStaff = async () => {
            setLoading(true);
            try {
                const url = slug
                    ? `/tech-sup/country/${country}/region/${slug}` // Если указан регион
                    : `/tech-sup/country/${country}`; // Если указана только страна

                const response = await axios.get(url);
                setStaff(response.data);
            } catch (err) {
                setError('Ошибка при загрузке данных');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, [country, slug]);

    // GSAP-анимация появления карточек
    useEffect(() => {
        if (staff.length > 0) {
            gsap.fromTo(
                cardRefs.current,
                { opacity: 0, y: 50 }, // Начальная позиция и прозрачность
                {
                    opacity: 1,
                    y: 0, // Конечная позиция
                    duration: 1, // Длительность анимации
                    ease: "power2.out",
                    stagger: 0.2, // Интервал между анимацией карточек
                }
            );
        }
    }, [staff]);

    // Обработка состояния загрузки, ошибки и пустого результата
    if (loading) return <p className="loading-message">Загрузка...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (staff.length === 0) return <h2 className="page-title">Сотрудники в {slugPlace} не найдены</h2>;

    return (
        <div className="container tech-sup-container" ref={containerRef}>
            <h2 className="text-3xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
                <span
                    className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110"
                    style={{ display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', borderRadius: '10px' }}
                >
                    Сотрудники технической поддержки в {slugPlace}
                </span>
            </h2>
            <div className="staff-list">
                {staff.map((member, index) => (
                    <div
                        key={index}
                        className="staff-card border-2 border-orange-500"
                        ref={(el) => (cardRefs.current[index] = el)} // Добавляем ссылку на карточку
                    >
                        <img
                            src={member.image || defaultImg} // Установка изображения по умолчанию
                            alt={member.name}
                            className="staff-photo"
                        />
                        <div className="staff-info">
                            <h2 className="staff-name">{member.name}</h2>
                            <p className="staff-position">{member.position}</p>
                            <p className="staff-phone">{member.contact}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechSupport;
