import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрация плагина ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: 1, name: 'Улица Куренкеева, 89', position: [42.890771839421966, 74.6151901670461] },
  { id: 2, name: 'Жибек-Жолу, 361', position: [42.88555029027532, 74.6184604320656] },
  { id: 3, name: 'Буденного, 181', position: [42.88746505367479, 74.64175917116445] },
  { id: 4, name: 'Кулиева 1/4', position: [42.86986765104979, 74.56930809918723] },
  { id: 5, name: 'Проспект Труда, 117а', position: [42.82348880919286, 73.84270332795619] },
  { id: 6, name: 'Кокум-Бий, 34', position: [40.518643126304895, 72.74844830740308] },  
];

const MainMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const el = mapRef.current;

    // GSAP-анимация с ScrollTrigger
    gsap.from(el, {
      y: 100, // Начальная позиция снизу
      opacity: 0, // Прозрачность
      duration: 1.5, // Длительность анимации
      ease: "power2.out", // Плавное движение
      scrollTrigger: {
        trigger: el, // Элемент, который наблюдается
        start: "top 80%", // Когда верх элемента достигает 80% окна
        end: "bottom 60%", // Когда нижняя часть элемента достигает 60% окна
        toggleActions: "play none none none", // Анимация запускается при входе
      },
    });
  }, []);

  return (
    <div className='map__container' ref={mapRef}>
      <h2 className="text-4xl text-center m-8 mb-12 font-semibold max-[480px]:text-2xl max-[480px]:mb-6 relative">
        <span
          className="text-green-50 rounded-xl px-5 py-2 font-custom bg-green-600 max-[480px]:px-4 transform transition-transform duration-500 hover:scale-110 hover:translate-y-1"
          style={{ display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', borderRadius: '10px' }}
        >
          Наши Адреса
        </span>
      </h2>
      <MapContainer center={[42.44898219069362, 77.12837773897982]} zoom={7} className='max-[480px]:mx-0' style={{ height: '100vh', width: '90%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker key={location.id} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MainMap;
