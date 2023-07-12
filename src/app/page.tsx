'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookies } from 'cookies-next';

import Map from '../components/Map.jsx';
import AutoCompleteLoader from '../components/AutoCompleteLoader.jsx';
import HousingCards from '../components/HousingCards.jsx';

import { useLoadScript } from '@react-google-maps/api';

const loadScriptLibraries = ['places'];

const HomePage = ({ params }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBKfB7ckl9pwKNePhTdI4Al6uLiy_Uksz0',
    libraries: loadScriptLibraries,
  });

  const [search, setSearch] = useState({ lat: 40.7831, lng: -73.9712 });
  const [address, setAddress] = useState('Manhattan, NY');
  const [housingData, setHousingData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyData, setPropertyData] = useState({});
  const [modalInfo, setModalInfo] = useState({ status: 'error' });
  const [downPayment, setDownPayment] = useState(20000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [favorited, setFavorited] = useState([]);
  const [addCost, setAddCost] = useState(0);

  const checkCookies = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/cookies');
      if (Array.isArray(data)) {
        setFavorited(data);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  // fetch data or create cookie if cookies exsist
  useEffect(() => {
    if (favorited.length === 0) checkCookies();
  }, []);

  const fetchPropertyData = async () => {
    const options = {
      method: 'GET',
      url: 'https://zillow-com1.p.rapidapi.com/property',
      params: { zpid: propertyData },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'd87800ef18msh2596b125023ff06p11ff9cjsn2536ddae906b',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setModalInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = isLoaded ? (
    <>
      <div className=''>
        <AutoCompleteLoader
          addCost={addCost} setAddCost={setAddCost}
          setSearch={setSearch}
          setAdress={setAddress}
          setHousingData={setHousingData}
          setDownPayment={setDownPayment}
          downPayment={downPayment}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
        />
      </div>
      <Map search={search} housingData={housingData} />
      <div className='absolute bottom-0 w-screen overflow-x-scroll'>
        <HousingCards
          addCost={addCost}
          favorited={favorited}
          setFavorited={setFavorited}
          housingData={housingData}
          setPropertyData={setPropertyData}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          downPayment={downPayment}
          interestRate={interestRate}
        />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );

  return (
    <div>
      {renderContent}
    </div>
  );
};

export default HomePage;
