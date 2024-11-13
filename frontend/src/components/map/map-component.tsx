"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";

// Fix for default marker icon

interface MapProps {
  location: string;
  title?: string;
}

const MapComponent = ({ location, title }: MapProps) => {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  // Move the icon fix inside the component
  useEffect(() => {
    interface IconDefault extends Icon.Default {
      _getIconUrl?: string;
    }
    delete (Icon.Default.prototype as IconDefault)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });
  }, []);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}`
        );
        const data = await response.json();
        if (data && data[0]) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    getCoordinates();
  }, [location]);

  if (!coordinates) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>{title || location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
