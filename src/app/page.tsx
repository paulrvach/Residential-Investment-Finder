'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar.jsx';
import Map from '../components/Map.jsx';
import SearchBar from '../components/SearchBar.jsx';

import { useLoadScript } from '@react-google-maps/api';
import HousingCards from '../components/HousingCards.jsx';

const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBKfB7ckl9pwKNePhTdI4Al6uLiy_Uksz0',
    libraries: ['places'],
  });
  const [search, setSearch] = useState({ lat: 40.7831, lng: -73.9712 });
  const [address, setAdress] = useState('Manhattan, NY');
  const [housingData, setHousingData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyData, setPropertyData] = useState({});
  const [modalInfo, setModalInfo] = useState({ status: 'error' });

  useEffect(() => {
    // console.log(propertyData);
    const getData = async () => {
      const options = {
        method: 'GET',
        url: 'https://zillow-com1.p.rapidapi.com/property',
        params: { zpid: propertyData },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key':
            'd87800ef18msh2596b125023ff06p11ff9cjsn2536ddae906b',
          'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
        },
      };
      // console.log(options)
      try {
        const response = await axios.request(options);
        setModalInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [isModalOpen]);
  console.log(modalInfo);
  return (
    <div>
      <NavBar />
      {isLoaded ? (
        <SearchBar
          setSearch={setSearch}
          setAdress={setAdress}
          setHousingData={setHousingData}
        />
      ) : (
        <h1>Loading</h1>
      )}
      {isLoaded ? (
        <Map search={search} housingData={housingData} />
      ) : (
        <h1>Loading</h1>
      )}
      <div className='absolute bottom-0 w-screen overflow-x-scroll'>
        <HousingCards
          props={housingData}
          setPropertyData={setPropertyData}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </div>
    </div>
  );
};

export default HomePage;
