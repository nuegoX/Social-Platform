import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ feature }) => {
  return (
    <div className='md:w-[200px] md:h-[200px] sm:h-[150px] sm:w-[150px] w-[120px] h-[120px] border-solid border-2 border-purple-600 rounded flex items-center justify-center hover:bg-blue-400'>
      <h1 className='text-white md:text-3xl hover:font-bold hover:text-gray-200'>{feature}</h1>
    </div>
  );
};

export default FeatureCard;
