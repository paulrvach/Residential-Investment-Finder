'use client'
import React from 'react';
import SearchBar from './SearchBar';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
const libraries = ['locality'];


function AutoCompleteLoader(props) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      componentRestrictions: { country: "us" },
    },
  });
  return (
    <>
      <SearchBar
        addCost={props.addCost} setAddCost={props.setAddCost}
        ready={ready}
        getGeocode={getGeocode}
        getLatLng={getLatLng}
        value={value}
        setValue={setValue}
        status={status}
        data={data}
        clearSuggestions={clearSuggestions}
        setSearch={props.setSearch}
        setAdress={props.setAdress}
        setHousingData={props.setHousingData}
        setDownPayment={props.setDownPayment}
        downPayment={props.downPayment}
        interestRate={props.interestRate}
        setInterestRate={props.setInterestRate}
      />
    </>
  );
}

export default AutoCompleteLoader;
