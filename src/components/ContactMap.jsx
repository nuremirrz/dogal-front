import React, { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрация плагина ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactMap = () => {
  const mapRef = useRef(null);

  // Мемоизация данных локаций
  const locations = useMemo(
    () => [
      { id: 1, name: "Улица Куренкеева, 89", position: [42.890771839421966, 74.6151901670461] },
      { id: 2, name: "Жибек-Жолу, 361", position: [42.88555029027532, 74.6184604320656] },
      { id: 3, name: "Буденного, 181", position: [42.88746505367479, 74.64175917116445] },
      { id: 4, name: "Кулиева 1/4", position: [42.86986765104979, 74.56930809918723] },
      { id: 5, name: "Труда проспект, 117а", position: [42.82348880919286, 73.84270332795619] },
      { id: 6, name: "Кокум-Бий, 34", position: [40.518643126304895, 72.74844830740308] },
    ],
    []
  );

  useEffect(() => {
    const el = mapRef.current;

    // GSAP-анимация с ScrollTrigger
    gsap.fromTo(
      el,
      { y: 100, opacity: 0 }, // Начальная позиция и прозрачность
      {
        y: 0, // Конечная позиция
        opacity: 1, // Конечная прозрачность
        duration: 1.5, // Длительность анимации
        ease: "power2.out", // Плавное движение
        scrollTrigger: {
          trigger: el, // Элемент, который наблюдается
          start: "top 80%", // Когда верх элемента достигает 80% окна
          end: "bottom 60%", // Когда нижняя часть элемента достигает 60% окна
          toggleActions: "play none none none", // Анимация запускается только один раз
        },
      }
    );
  }, []);

  return (
    <div className="contact-map__container" ref={mapRef}>
      <MapContainer center={[42.44898219069362, 77.12837773897982]} zoom={7} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

export default ContactMap;
