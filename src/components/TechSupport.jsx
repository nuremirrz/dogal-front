import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';
import '../styles/TechSupport.css';
import defaultImg from '../assets/images/no-photo.jpg';
import { regionNames } from '../data/regionNames';

const TechSupport = () => {
    const { country, region } = useParams();
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    const slugPlace = regionNames[region] || regionNames[country] || 'указанном регионе';

    useEffect(() => {
        const fetchStaff = async () => {
            if (!country) {
                setError('Страна не указана');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
                const url = region
                    ? `${base}/api/employees/country/${country}/region/${region}`
                    : `${base}/api/employees/country/${country}`;

                const response = await axios.get(url);

                if (response.data.length === 0) {
                    const place = regionNames[region] || regionNames[country] || 'указанном регионе';
                    setError(`Сотрудники в ${place} не найдены`);
                    setStaff([]);
                } else {
                    setStaff(response.data);
                }
            } catch (err) {
                console.error('Ошибка при запросе к API:', err.message);
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, [country, region]);

    useEffect(() => {
        if (staff.length > 0 && cardRefs.current.length > 0) {
            gsap.fromTo(
                cardRefs.current.filter(Boolean),
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    stagger: 0.2,
                }
            );
        }
    }, [staff]);

    if (loading) return <p className="loading-message">Загрузка...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (staff.length === 0) return <h2 className="page-title">Сотрудники в {slugPlace} не найдены</h2>;

    return (
        <div className="container tech-sup-container" ref={containerRef}>
            <h2 className="text-3xl text-center m-8 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
                <span
                    className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110 max-[480px]:text-xxl"
                    style={{ display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', borderRadius: '10px', transformOrigin: "center",
                    willChange: "transform" }}
                >
                    Сотрудники технической поддержки в {slugPlace}
                </span>
            </h2>
            <div className="staff-list">
                {staff.map((member, index) => (
                    <div
                        key={member._id || index}
                        className="staff-card border-2 border-orange-500"
                        ref={(el) => (cardRefs.current[index] = el)}
                    >
                        <img
                            src={member.image || defaultImg}
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