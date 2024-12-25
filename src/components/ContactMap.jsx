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

const ContactMap = () => {
  return (
    <div className='contact-map__container'>      
      <MapContainer center={[42.44898219069362, 77.12837773897982]} zoom={7} >
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
