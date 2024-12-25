import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const locations = [
  { id: 1, name: 'Жибек-Жолу, 361', position: [42.88555029027532, 74.6184604320656] },
  { id: 2, name: 'Улица Куренкеева, 89', position: [42.890771839421966, 74.6151901670461] },
  { id: 3, name: 'Улица Ленина, 214/1', position: [42.87442066079001, 74.77217908866677] },
  { id: 4, name: 'Советская, 208', position: [42.88139869708584, 74.61098205477653] },
  { id: 5, name: 'Советская, 84', position: [42.85566743381516, 74.60974948422275] },
  { id: 6, name: 'Манаса, 302', position: [42.90841269772956, 74.58520595477803] },
  { id: 7, name: 'Кокум-Бий, 34', position: [40.518643126304895, 72.74844830740308] },
  { id: 8, name: 'Жамансариева, 188', position: [42.49193893507034, 78.38799058420163] },
];

const MainMap = () => {
  return (
    <div className='map__container'>
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
