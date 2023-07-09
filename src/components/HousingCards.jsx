/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import calculateRealEstateInvestment from '../utils/MortgageCalculator';

const millify = (num) => {
  if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1) + 'M';
  } else {
    return '$' + num.toLocaleString();
  }
};

const HousingCards = ({
  props,
  setPropertyData,
  setIsModalOpen,
  isModalOpen,
}) => {
  const [cardsArray, setCardsArray] = useState([]);

  useEffect(() => {
    if (props.length > 0) setCardsArray(props);
  }, [props]);

  const favHandler = () => console.log('CLICKED!');

  return (
    <ul className='flex flex-row h-full w-full '>
      {cardsArray.map((card) => {
        const price = millify(card.price);
        const sqft = card.livingArea;
        const rentEst = millify(Number.parseInt(card.rentZestimate));
        const cashFlow = calculateRealEstateInvestment(card.price, 20, 6.7, card.rentZestimate, 0);
        const cashFlowString = millify(cashFlow.monthlyCashFlow.toFixed());
        const capRate = cashFlow.capitalizationRate * 100;

        return (
          <li key={card.zpid}>
            <a
              className=' m-2 rounded-md w-[337px] h-[256px] bg-white  shadow-lg hover:-translate-y-4'
              onClick={() => {
                setPropertyData(card.zpid);
                setIsModalOpen(!isModalOpen);
              }}
            >
              <span
                onClick={favHandler}
                className='material-symbols-outlined cursor-pointer absolute hover:bg-green-200 hover:text-white text-slate-500 bg-slate-200 rounded-full m-1 '
              >
                add_circle
              </span>
              <img
                src={card.imgSrc}
                className='w-[337px] h-[120px]  object-cover rounded-t-md'
              />
              <div className='px-2 w-[337px] mb-2'>
                <p className='text-xl'>{price}</p>
                <p className='text-md  break-all truncate text-slate-500 '>
                  {card.address}
                </p>
                <div className='flex flex-row gap-4 '>
                  <p>{card.bedrooms}bd</p>
                  <p>{card.bathrooms}br</p>
                  <p> {sqft}sqft</p>
                </div>
              </div>
              <div className='px-2 flex justify-around '>
                <div className='flex flex-col align-middle justify-center '>
                  <p>
                    {cashFlowString}
                    <span>/m</span>
                  </p>
                  <p className='text-slate-400 text-sm'>cash-flow</p>
                </div>
                <div className='flex flex-col align-middle justify-center '>
                  <p>
                    {rentEst}
                    <span>/m</span>
                  </p>
                  <p className='text-slate-400 text-sm'>rent est.</p>
                </div>
                <div className='flex flex-col align-middle justify-center '>
                  <p>{capRate.toFixed(2)}%</p>
                  <p className='text-slate-400 text-sm'>cap-rate:</p>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default HousingCards;
