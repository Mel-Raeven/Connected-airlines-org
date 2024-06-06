import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Center, Input, Space } from "@mantine/core";
// Import your custom SVG icon
import airplaneIcon from './airplane.svg';

const Map: React.FC = () => {
  const [searchFlightNumber, setSearchFlightNumber] = useState<string>("");
  const [currentMarker, setCurrentMarker] = useState<L.Marker | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    const mapInstance = L.map("map").setView([51.505, -0.09], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapInstance);
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (!map) return;

    const markersData = [
      { lat: 51.5, lng: -0.09, flightNumber: "FL123" },
      { lat: 48.8566, lng: 2.3522, flightNumber: "FL456" },
      { lat: 40.7128, lng: -74.006, flightNumber: "FL789" },
      { lat: 35.6895, lng: 139.6917, flightNumber: "FL101" },
      { lat: 39.9042, lng: 116.4074, flightNumber: "FL202" },
      { lat: 37.7749, lng: -122.4194, flightNumber: "FL303" },
      { lat: -33.8688, lng: 151.2093, flightNumber: "FL404" },
      { lat: -22.9068, lng: -43.1729, flightNumber: "FL505" },
      { lat: 34.0522, lng: -118.2437, flightNumber: "FL606" },
      { lat: 55.7558, lng: 37.6176, flightNumber: "FL707" },
      { lat: -26.2041, lng: 28.0473, flightNumber: "FL808" },
      { lat: 43.6532, lng: -79.3832, flightNumber: "FL909" },
      { lat: 41.8781, lng: -87.6298, flightNumber: "FL1010" },
      { lat: 51.5074, lng: -0.1278, flightNumber: "FL1111" },
      { lat: 48.8566, lng: 2.3522, flightNumber: "FL1212" },
      { lat: 52.5200, lng: 13.4050, flightNumber: "FL1313" },
      { lat: 28.6139, lng: 77.2090, flightNumber: "FL1414" },
      { lat: 34.0522, lng: -118.2437, flightNumber: "FL1515" },
      { lat: 40.7128, lng: -74.0060, flightNumber: "FL1616" },
      { lat: 35.6895, lng: 139.6917, flightNumber: "FL1717" },
      { lat: 37.7749, lng: -122.4194, flightNumber: "FL1818" },
      { lat: 37.7749, lng: -122.4194, flightNumber: "FL1919" },
      { lat: 22.5726, lng: 88.3639, flightNumber: "FL2020" },
      { lat: 55.7558, lng: 37.6176, flightNumber: "FL2121" },
      { lat: 43.6532, lng: -79.3832, flightNumber: "FL2222" },
      { lat: 51.5074, lng: -0.1278, flightNumber: "FL2323" },
      { lat: 48.8566, lng: 2.3522, flightNumber: "FL2424" },
      { lat: 52.5200, lng: 13.4050, flightNumber: "FL2525" },
      { lat: 28.6139, lng: 77.2090, flightNumber: "FL2626" },
      { lat: 34.0522, lng: -118.2437, flightNumber: "FL2727" },
      { lat: 40.7128, lng: -74.0060, flightNumber: "FL2828" },
      { lat: 35.6895, lng: 139.6917, flightNumber: "FL2929" },
      { lat: 37.7749, lng: -122.4194, flightNumber: "FL3030" },
      { lat: 22.5726, lng: 88.3639, flightNumber: "FL3131" },
      { lat: 55.7558, lng: 37.6176, flightNumber: "FL3232" },
      { lat: 43.6532, lng: -79.3832, flightNumber: "FL3333" },
      { lat: 51.5074, lng: -0.1278, flightNumber: "FL3434" },
      { lat: 48.8566, lng: 2.3522, flightNumber: "FL3535" },
      { lat: 52.5200, lng: 13.4050, flightNumber: "FL3636" },
      { lat: 28.6139, lng: 77.2090, flightNumber: "FL3737" },
      { lat: 34.0522, lng: -118.2437, flightNumber: "FL3838" },
      { lat: 40.7128, lng: -74.0060, flightNumber: "FL3939" },
      { lat: 35.6895, lng: 139.6917, flightNumber: "FL4040" },
      { lat: 37.7749, lng: -122.4194, flightNumber: "FL4141" },
      { lat: 22.5726, lng: 88.3639, flightNumber: "FL4242" },
      { lat: 55.7558, lng: 37.6176, flightNumber: "FL4343" },
      { lat: 43.6532, lng: -79.3832, flightNumber: "FL4444" },
      { lat: 51.5074, lng: -0.1278, flightNumber: "FL4545" },
      { lat: 48.8566, lng: 2.3522, flightNumber: "FL4646" },
      { lat: 52.5200, lng: 13.4050, flightNumber: "FL4747" },
      { lat: 28.6139, lng: 77.2090, flightNumber: "FL4848" },
      { lat: 34.0522, lng: -118.2437, flightNumber: "FL4949" },
      { lat: 40.7128, lng: -74.0060, flightNumber: "FL5050" }
    ];
    const newMarkers: L.Marker[] = [];
    markersData.forEach((data) => {
      const customIcon = L.icon({
        iconUrl: airplaneIcon,
        iconSize: [15, 15],
        iconAnchor: [12.5, 12.5],
      });
      const marker = L.marker([data.lat, data.lng], { icon: customIcon });
      marker
        .bindPopup(
          `Flight Number: ${data.flightNumber}<br/>Latitude: ${data.lat}<br/>Longitude: ${data.lng}`
        )
        .addTo(map);
      newMarkers.push(marker);
    });
    setMarkers(newMarkers);

    return () => {
      if (map) {
        map.eachLayer((layer) => {
          map.removeLayer(layer);
        });
      }
    };
  }, [map]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedMarkers = markers.map((marker) => {
        const lat = marker.getLatLng().lat + getRandomOffset();
        const lng = marker.getLatLng().lng + getRandomOffset();
        marker.setLatLng([lat, lng]);
        return marker;
      });
      setMarkers(updatedMarkers);
    }, 500);

    return () => clearInterval(interval);
  }, [markers]);

  const handleSearchFlightNumber = () => {
    if (!searchFlightNumber) {
      markers.forEach((marker) => marker.addTo(map!));
      return;
    }

    const markerData = [
      { lat: 51.5, lng: -0.09, flightNumber: "FL123" },
      { lat: 48.8566, lng: 2.3522, flightNumber: "FL456" },
      { lat: 40.7128, lng: -74.006, flightNumber: "FL789" },
      { lat: 35.6895, lng: 139.6917, flightNumber: "FL101" },
    ].find((data) => data.flightNumber === searchFlightNumber);

    if (markerData && map) {
      if (currentMarker) {
        map.removeLayer(currentMarker);
      }

      const newMarker = L.marker([markerData.lat, markerData.lng]).addTo(map);
      newMarker
        .bindPopup(
          `Flight Number: ${markerData.flightNumber}<br/>Latitude: ${markerData.lat}<br/>Longitude: ${markerData.lng}`
        )
        .openPopup();
      setCurrentMarker(newMarker);

      markers.forEach((marker) => map.removeLayer(marker));
    }
  };

  const getRandomOffset = () => (Math.random() - 0.5) * 5;

  return (
    <div>
      <div id="map" style={{ height: "30rem" }}></div>
      <div>
      <Space h={"1rem"}/>
        <Center>
          <Input
            w={"10rem"}
            type="text"
            value={searchFlightNumber}
            onChange={(e) => setSearchFlightNumber(e.target.value)}
            placeholder="Enter flight number"
          />
        </Center>
        <Space h={"1rem"}/>
        <Button onClick={handleSearchFlightNumber}>Search</Button>
      </div>
    </div>
  );
};

export default Map;
