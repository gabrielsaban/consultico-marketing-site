'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import type { CircleMarker as LeafletCircleMarker } from 'leaflet';

const position: [number, number] = [55.8617, -4.2577];

export default function ContactMap() {
  const [isDark, setIsDark] = useState(false);
  const markerRef = useRef<LeafletCircleMarker | null>(null);

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    syncTheme();
    window.addEventListener('themechange', syncTheme);
    return () => window.removeEventListener('themechange', syncTheme);
  }, []);

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const tileAttribution =
    '';

  const OpenPopup = () => {
    const map = useMap();
    useEffect(() => {
      map.whenReady(() => {
        markerRef.current?.openPopup();
      });
    }, [map]);
    return null;
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer attribution={tileAttribution} url={tileUrl} />
        <OpenPopup />
        <CircleMarker
          ref={markerRef}
          center={position}
          radius={6}
          pathOptions={{ color: '#007BFF', fillColor: '#007BFF', fillOpacity: 0.9 }}
        >
          <Popup closeOnClick={false} autoClose={false}>
            <div className="font-helvetica text-[0.9rem] leading-tight text-gray-900">
              <div className="font-bold">Consultico Head Office</div>
              <div>50 Richmond St, Glasgow G1 1XP</div>
            </div>
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
