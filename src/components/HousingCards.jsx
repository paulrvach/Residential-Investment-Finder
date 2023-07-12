'use client';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import axios from 'axios';
import HousingCard from './HousingCard.jsx';


const HousingCards = ({
  housingData,
  setPropertyData,
  setIsModalOpen,
  isModalOpen,
  downPayment,
  interestRate,
  favorited,
  setFavorited,
  addCost
}) => {
  const [cardsArray, setCardsArray] = useState([]);
  const [favs, setFavs] = useState(new Set());


  useEffect(() => {
    if (housingData.length > 0) setCardsArray(housingData);
    favorited.forEach((fav) => {
      favs.add(fav.address);
    });
  }, [housingData, favs, favorited]);

  const favHandler = async (house) => {
    const { data } = await axios.post('http://localhost:3000/api/favorites', {
      data: house,
    });
    
    const response = data;
    if (response.houses.length !== 0) {
      setFavorited(response.houses);
      setFavs(new Set(response.houses.map((obj) => obj.address)));
    } else {
      alert('No For Sale Properties in this area!')
    }
  };

  return (
    <ul className='flex flex-row h-full w-full gap-3 '>
      {cardsArray.map((card) => (
        <li key={card.address}>
          <HousingCard
           addCost={addCost}
            card={card}
            favs={favs}
            setFavs={setFavs}
            downPayment={downPayment}
            interestRate={interestRate}
            favHandler={favHandler}
            setPropertyData={setPropertyData}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </li>
      ))}
    </ul>
  );
};

export default HousingCards;
