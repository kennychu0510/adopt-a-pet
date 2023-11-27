"use client";

import { HK_CENTER } from "@/constants";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useOnScreen from "@/hooks/useOnScreen";
import { useEffect, useRef, useState } from "react";

const customMarkerIcon = L.icon({
  iconUrl: "/assets/leaflet/marker-icon.png",
  iconRetinaUrl: "/assets/leaflet/marker-icon-2x.png",
  shadowUrl: "/assets/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export default function ClientMap({ latLng }: { latLng: L.LatLngExpression }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <MapContainer
        center={HK_CENTER}
        zoom={16}
        scrollWheelZoom={false}
        style={{ width: "100%", height: 300 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        <Marker position={latLng} icon={customMarkerIcon} />
      </MapContainer>
      <div ref={ref}></div>
    </>
  );
}

const MapInteraction = ({
  zoomIn,
  latLng,
}: {
  zoomIn: boolean;
  latLng: L.LatLngExpression;
}) => {
  const [done, setDone] = useState(false);
  const map = useMap();
  useEffect(() => {
    if (zoomIn && !done) {
      map.flyTo(latLng, 16);
      setDone(true);
    }
  }, [zoomIn, done]);
  return null;
};
