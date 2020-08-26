import React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import './App.css';
import getAllLogEntries from './Api';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 43.651070,
    longitude: -79.347015,
    zoom: 3 
  });
  const [entries, setLogEntries] = useState([])
  useEffect(() => {
    (async () => {
      const logEntries =  await getAllLogEntries()
      setLogEntries(logEntries)
    })();
  },[]);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/ramandsb/ckeaxqbt302lw19o54po1nkdt"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}>
      {
        entries.map((item) => {
          return (
            <Marker latitude={item.latitude} longitude={item.longitude} offsetLeft={-20} offsetTop={-10}>
              <img style={{width: '24px', height: '24px'}} src="https://lh3.googleusercontent.com/proxy/jkg1X3KtYE9ysASkqSi6M2hFiU-P6_VRrtG3-hTzZVGNJrrG6a3vLrac3QyNfNwR5yceC-BpBEoJfTJ1171JFVv_9UtMZUxS7UQ2VQiD4eBABl1MqXpRELn6vzlI58tvliJdRsIQSm1L" alt='marker'/>
            </Marker>
          )
        })
      }
    </ReactMapGL>
  );
}

export default App;
