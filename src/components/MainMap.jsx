import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const locations = [
  { id: 1, name: 'Бишкек', position: [42.8746, 74.5698] },
  { id: 2, name: 'Ош', position: [40.5136, 72.8161] },
  { id: 3, name: 'Нарын', position: [41.4287, 75.9911] },
];

const MainMap = () => {
  return (
    <div className='map__container'>
      <h2 className='text-4xl text-center m-8 font-semibold'>
        <span 
          className='text-green-50 px-5 italic font-custom bg-green-600' 
          style={{clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)'}}>Наши Адреса
        </span>
      </h2>
      <MapContainer center={[42.44898219069362, 77.12837773897982]} zoom={7} style={{ height: '100vh', width: '80%' }}>
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
