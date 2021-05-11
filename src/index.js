import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import MapGL, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl";
import axios from "axios";

const App = () => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [cities, setCities] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 37,
    longitude: 37,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    axios.get("https://609aacc90f5a13001721bad1.mockapi.io/visitors").then(function ({ data }) {
      setCities(data);
    });
  }, []);

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={"pk.eyJ1Ijoicm9iZXJ0Ym96c2lrIiwiYSI6ImNrYWU4bG9kdjAyaDkzNHBuZ3Qxa3UycTEifQ.Z5U143Bdapv2hjhVxyZOXA"}
    >
      {cities.map((city, index) => {
        return (
          <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
            <svg className="pinStyle" height="20" viewBox="0 0 24 24" onClick={() => setPopupInfo(city)}>
              <path d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9 C20.1,15.8,20.2,15.8,20.2,15.7z" />
            </svg>
          </Marker>
        );
      })}

      {popupInfo && (
        <Popup tipSize={5} anchor="top" longitude={popupInfo.longitude} latitude={popupInfo.latitude} closeOnClick={false} onClose={() => setPopupInfo(null)}>
          <p>
            ID: {popupInfo.id} - IP: {popupInfo.ipaddress}
            <br />
            LAT: {popupInfo.latitude} - LONG: {popupInfo.longitude}
            <br />
            {popupInfo.continent} - {popupInfo.country} - {popupInfo.city} - {popupInfo.region} - {popupInfo.regionisocode}
            <br />
            {popupInfo.connectionorganizationname} - {popupInfo.connectionconnectiontype}
            <br />
            {popupInfo.date} - {popupInfo.browsername} - {popupInfo.osname}
          </p>
        </Popup>
      )}

      <div className="fullscreen fullscreenControlStyle">
        <FullscreenControl />
      </div>
      <div className="nav navStyle">
        <NavigationControl />
      </div>
    </MapGL>
  );
};

export default App;

let react = document.getElementById("root");
render(<App />, react);
