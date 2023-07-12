'use client';
import Image from 'next/image';
import calculateRealEstateInvestment, {
  millify,
} from '../utils/MortgageCalculator';

const HousingCard = ({
  card,
  downPayment,
  interestRate,
  favHandler,
  setPropertyData,
  setIsModalOpen,
  isModalOpen,
  favs,
  addCost,
}) => {
  const price = millify(card.price);
  const sqft = card.livingArea;
  const rentEst = millify(Number.parseInt(card.rentZestimate));
  const cashFlow = calculateRealEstateInvestment(
    card.price,
    downPayment,
    interestRate,
    card.rentZestimate,
    addCost
  );
  const cashFlowString = millify(cashFlow.monthlyCashFlow.toFixed());
  const capRate = cashFlow.capitalizationRate * 100;
  const isFaved = favs.has(card.address) ? true : false;

  return (
    <li
      key={card.zpid}
      className='m-2 rounded-md w-[337px] h-[256px] bg-white  shadow-lg cursor-pointer'
    >
      <a
        className=' '
        onClick={() => {
          setPropertyData(card.zpid);
          setIsModalOpen(!isModalOpen);
        }}
      >
        {isFaved ? (
          <span className='material-symbols-outlined cursor-pointer absolute  text-red-500 m-1 '>
            favorite
          </span>
        ) : (
          <span
            onClick={() => favHandler(card)}
            className='material-symbols-outlined cursor-pointer absolute hover:bg-green-200  hover:text-white text-slate-500 bg-slate-200 rounded-full m-1 '
          >
            add_circle
          </span>
        )}
        <Image
          src={card.imgSrc}
          width={337} height={120}
          alt='propert image'
          className=' object-cover rounded-t-md'
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
};

export default HousingCard;
