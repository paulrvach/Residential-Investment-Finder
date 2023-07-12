'use client'
import React from 'react';

import { Combobox } from '@headlessui/react';
import DownPaymentInput from './DownPaymentInput';
import IntrestInput from './InterestInput';
import AdditionalCostsBtn from './AdditionalCostsBtn'

import axios from 'axios';

const SearchBar = ({
  setSearch,
  setAdress,
  setHousingData,
  setDownPayment,
  addCost, setAddCost,
  downPayment,
  interestRate,
  setInterestRate,
  ready,
  value,
  setValue,
  status,
  data,
  getGeocode,
  getLatLng,
  clearSuggestions
}) => {
  

  const handleSelect = async ({ target }) => {
    const address = target.value;
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSearch({ lat, lng });
    setAdress(address);
  };

  const handleSubmit = async ({ target }) => {
    const address = target.innerText;
    const options = {
      method: 'GET',
      url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
      params: {
        location: address,
        home_type: 'houses',
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'd87800ef18msh2596b125023ff06p11ff9cjsn2536ddae906b',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const { data } = response;
      if (Array.isArray(data.props)) setHousingData(data.props)
      else alert('No For Sale Properties in this location')
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className='w-[100%] relative '>
      <div className='absolute z-10 mt-2 ml-2 w-full'>
        <div className='flex gap-8 w-full align-top items-start'>
          <Combobox
            className='cursor-default overflow-hidden w-3/5 rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'
            as='div'
            onSelect={handleSelect}
          >
            <Combobox.Input
              className='  default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              displayValue={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              disable={!ready ? 'false': 'true'}
              placeholder='Location'
            />
            <Combobox.Options
              onClick={handleSubmit}
              className='  mt-1 max-h-60 w-full overflow-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:none sm:text-sm'
            >
              {status === 'OK' &&
                data.map(({ place_id, description }) => {
                  return (
                    <Combobox.Option
                      className=' cursor-default select-none py-2 pl-10 pr-4'
                      key={place_id}
                      value={description}
                    >
                      {description}
                    </Combobox.Option>
                  );
                })}
            </Combobox.Options>
          </Combobox>
          <div className='flex gap-4 mt-2 '>
          <DownPaymentInput
            setDownPayment={setDownPayment}
            downPayment={downPayment}
          />
          <IntrestInput
            interestRate={interestRate}
            setInterestRate={setInterestRate}
          />
          <AdditionalCostsBtn addCost={addCost} setAddCost={setAddCost}/></div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
