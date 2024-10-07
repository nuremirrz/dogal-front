import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const locations = [
  { id: 1, name: 'Бишкек', position: [42.8746, 74.5698] },
  { id: 2, name: 'Ош', position: [40.5136, 72.8161] },
  { id: 3, name: 'Нарын', position: [41.4287, 75.9911] },
];

const MainMap = () => {
  return (
    <MapContainer center={[42.8746, 74.5698]} zoom={7} style={{ height: '100vh', width: '100%' }}>
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
  );
};

export default MainMap;
