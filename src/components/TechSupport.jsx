import React from 'react';
import { useParams } from 'react-router-dom';
import staffData from '../data/staffData'; // Импортируйте ваши данные о сотрудниках

const TechSupport = () => {
    const { slug } = useParams(); // Получаем slug из URL
    const staff = slug ? staffData[slug] : staffData; // Получаем данные для выбранной области или страны

    if (!staff) {
        return <h2>Сотрудники не найдены</h2>; // Обработка ошибки
    }

    return (
        <div>
            <h1>Сотрудники технической поддержки {slug ? `в ${slug}` : ''}</h1>
            <div className="staff-list">
                {staff.map((member, index) => (
                    <div key={index} className="staff-card">
                        <img src={member.photo} alt={member.name} />
                        <h2>{member.name}</h2>
                        <p>{member.position}</p>
                        <p>{member.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechSupport;
