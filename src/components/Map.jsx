import React, { useState, useEffect } from 'react';

import { GoogleMap, Marker } from '@react-google-maps/api';



const Map = ({ search, housingData }) => {
  const [markerArray, setMarkerArray] = useState([]);
  useEffect(() => {
    let markers = [];
    for (let i = 0; i < housingData.length; i++) {
      const currMarker = (
        <Marker
          key={housingData[i].zpid}
          position={{
            lat: housingData[i].latitude,
            lng: housingData[i].longitude,
          }}
          title={housingData[i].address}
          
        />
      );
      markers.push(currMarker);
    }
    setMarkerArray(markers);
    console.log(markerArray);
  }, [housingData]);

  return (
    <GoogleMap
        
      zoom={17}
      center={search}
      mapContainerClassName='w-full h-[90vh] -z-1 '
    >
      <Marker position={search} />
      {markerArray}
    </GoogleMap>
  );
};

export default Map;
