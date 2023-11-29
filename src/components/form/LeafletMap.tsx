import { HK_CENTER } from '@/constants';
import L from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';

const customMarkerIcon = L.icon({
  iconUrl: '/assets/leaflet/marker-icon.png',
  iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
  shadowUrl: '/assets/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const LeafletMap = ({ markerCoor, setMarkerCoor }: { markerCoor: L.LatLngExpression; setMarkerCoor: React.Dispatch<React.SetStateAction<L.LatLngExpression>> }) => {
  return (
    <MapContainer center={HK_CENTER} zoom={10} scrollWheelZoom={false} style={{ width: '100%', height: 300 }}>
      <MapComponent setMarkerCoor={setMarkerCoor} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
        maxZoom={20}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <Marker position={markerCoor} icon={customMarkerIcon} />
    </MapContainer>
  );
};

const MapComponent = ({ setMarkerCoor }: { setMarkerCoor: React.Dispatch<React.SetStateAction<L.LatLngExpression>> }) => {
  useMapEvent('click', (e) => {
    setMarkerCoor(e.latlng);
  });
  return null;
};

export default LeafletMap;
