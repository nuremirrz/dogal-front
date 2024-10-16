import React from 'react';
import { useParams } from 'react-router-dom';
import staffData from '../data/staffData'; // Импортируйте ваши данные о сотрудниках
import '../styles/TechSupport.css'

const TechSupport = () => {
    const { slug } = useParams(); // Получаем slug из URL
    const staff = staffData[slug]; // Получаем данные для выбранной области или страны
    let slugPlace = ''

    switch(slug) {
        case 'kazakhstan':  // if (x === 'value1')
            slugPlace = 'Казахстане'
            break  
        case 'batken':  
            slugPlace = 'Баткенской области'
            break 
        case 'russia':  
            slugPlace = 'России'
            break 
        case 'chuy':  
            slugPlace = 'Чуйской области'
            break 
        case 'osh':  
            slugPlace = 'Ошской области'
            break 
        case 'issyk-kul':  
            slugPlace = 'Баткенской области'
            break 
        case 'talas':  
            slugPlace = 'Таласской области'
            break
        case 'jalalabad':  
            slugPlace = 'Джалал-Абадской области'
            break  
        case 'naryn':  
            slugPlace = 'Нарынской области'
            break  
                  
    }
    console.log(slugPlace)
    // Проверяем, является ли staff массивом
    if (!Array.isArray(staff)) {
        return <h2 className="page-title">Сотрудники в {slugPlace} не найдены</h2>; // Обработка ошибки
    }

    return (
        <div className="container">
            <h1 className="page-title">Сотрудники технической поддержки {slug ? `в ${slugPlace}` : ''}</h1>
            <div className="staff-list">
                {staff.map((member, index) => (
                    <div key={index} className="staff-card">
                        <img src={member.photo} alt={member.name} className="staff-photo" />
                        <div className="staff-info">
                            <h2 className="staff-name">{member.name}</h2>
                            <p className="staff-position">{member.position}</p>
                            <p className="staff-phone">{member.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechSupport;
