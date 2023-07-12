'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import HousingCardHorizontal from '../../components/HousingCardHorizontal';
import DownPaymentInput from '@/components/DownPaymentInput';
import IntrestInput from '@/components/InterestInput';
import AdditionalCostsBtn from '@/components/AdditionalCostsBtn';
import SelectedPropertyMenu from '@/components/SelectedPropertyMenu';

const Favorites = () => {
  const [favs, setFavs] = useState([]);
  const [downPayment, setDownPayment] = useState(20000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [addCost, setAddCost] = useState(0);
  const selected = useRef(new Set());

  const onSelectHandler = (address) => {
    if (!selected.current.has(address)) selected.current.add(address);
    else selected.current.delete(address);
    console.log(selected.current);
  };

  useEffect(() => {
    const fetchFaves = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/favorites');
        if (Array.isArray(data)) {
          console.log('DATA: ', data);
          setFavs(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaves();
  }, []);
  return (
    <div className='mx-24 mt-8'>
      <div className='flex  mt-2 mb-8 justify-between items-center '>
        <h1 className='text-3xl'>Favorites</h1>
        <div className='flex gap-4'>
          <div className='flex flex-col items-center'>
            <a className='font-bold text-xs mb-2'>Down Payment</a>
            <DownPaymentInput
              setDownPayment={setDownPayment}
              downPayment={downPayment}
            />
          </div>
          <div className='flex flex-col items-center'>
            <a className='font-bold text-xs mb-2'>Interest Rate</a>
            <IntrestInput
              interestRate={interestRate}
              setInterestRate={setInterestRate}
            />
          </div>
          <div className='flex flex-col items-center'>
            <a className='font-bold text-xs mb-2'>Additional Costs</a>
            <AdditionalCostsBtn addCost={addCost} setAddCost={setAddCost} />
          </div>
          <div className='flex flex-col items-center'>
            <a className='font-bold text-xs mb-2'>Selection</a>
            <SelectedPropertyMenu />
          </div>
        </div>
      </div>
      <div>
        <div className='w-full h-full flex flex-col gap-4'>
          {favs.map((property) => (
            <a className='' key={property.address}>
              <HousingCardHorizontal
                property={property}
                downPayment={downPayment}
                interestRate={interestRate}
                addCost={addCost}
                onSelectHandler={onSelectHandler}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
