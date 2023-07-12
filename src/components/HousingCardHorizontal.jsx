'use client';
import React from 'react';
import Image from 'next/image';
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from '@/components/ui/badge';

import calculateRealEstateInvestment, {
  millify,
} from '../utils/MortgageCalculator';
import { Button } from './ui/button';

const HousingCardHorizontal = ({
  property,
  downPayment,
  interestRate,
  addCost,
  onSelectHandler
}) => {
  const { address, data } = property;
  const price = millify(data.price);
  const sqft = data.livingArea;
  const rentEst = millify(Number.parseInt(data.rentZestimate));
  const cashFlow = calculateRealEstateInvestment(
    data.price,
    downPayment,
    interestRate,
    data.rentZestimate,
    addCost
  );
  const cashFlowString = millify(cashFlow.monthlyCashFlow.toFixed());
  const capRate = cashFlow.capitalizationRate * 100;
  

  return (
    <div className='relative w-full md:h-48 rounded-lg bg-slate-50 shadow-md flex flex-col  md:flex-row overflow-hidden '>
    <Checkbox className='absolute m-2' onClick={() => onSelectHandler(address)}/>
      <Image
        src={data.imgSrc}
        height={256}
        width={256}
        content='cover'
        loading='lazy'
        priority={false}
        alt={data.address}
        style={{ objectFit: 'cover; ' }}
        className='  '
      />
      <div className='mx-2 p-4 w-full flex flex-col md:flex-row justify-between'>
        <div className='h-full flex flex-col justify-between'>
          <h3 className='text-xl mb-4 font-semibold'>{data.address}</h3>
          <div className='flex flex-col justify-between flex-grow'>
            <ul className='flex justify-between '>
              <li className='flex flex-col items-center'>
                <strong className='text-sm'>Rent Est</strong>
                <p>{rentEst}/m</p>
              </li>
              <li className='flex flex-col items-center'>
                <strong className='text-sm'>Cash Flow</strong>
                <p>{cashFlowString}/m</p>
              </li>
              <li className='flex flex-col items-center'>
                <strong className='text-sm'>Cap Rate</strong>
                <p>{capRate.toFixed(1)}%</p>
              </li>
            </ul>

            <div className='flex gap-2 text-sm'>
              <Badge variant={'secondary'}>
               bd: {data.bedrooms}
              </Badge>
              <Badge variant={'secondary'}>
               br: {data.bathrooms}
              </Badge>
              <Badge variant={'secondary'}>
               living: {data.livingArea.toLocaleString()}sqft
              </Badge>
              <Badge variant={'secondary'}>
               lot: {data.lotAreaValue.toLocaleString()}sqft
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <h5 className='text-xl mb-2 font-semibold '>{price}</h5>
        </div>
      </div>
    </div>
  );
};

export default HousingCardHorizontal;
const obj = {
  dateSold: null,
  propertyType: 'SINGLE_FAMILY',
  lotAreaValue: 8606,
  address: '220 S San Jose Dr, Glendora, CA 91741',
  variableData: {
    text: '3D Tour',
    type: '3D_HOME',
  },
  priceChange: -95001,
  zestimate: 1089200,
  imgSrc:
    'https://photos.zillowstatic.com/fp/4690fd5127b5f8b2a9724142b4f23d7e-p_e.jpg',
  price: 1099999,
  bedrooms: 4,
  contingentListingType: null,
  longitude: -117.84102,
  latitude: 34.13364,
  listingStatus: 'FOR_SALE',
  zpid: '21646743',
  listingSubType: {
    is_FSBA: true,
  },
  rentZestimate: 4500,
  daysOnZillow: -1,
  bathrooms: 2,
  livingArea: 2541,
  country: 'USA',
  currency: 'USD',
  lotAreaUnit: 'sqft',
  hasImage: true,
};
