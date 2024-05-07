import React from 'react';
import { useNavigate } from 'react-router-dom';
import Shoe from "../assets/shoes.png";
import { CiShoppingTag, CiLocationOn } from "react-icons/ci";
import { motion } from 'framer-motion';

function Cards({ variants }) {
  const navigate = useNavigate();

  // Function to handle the main card click event
  const handleCardClick = () => {
    navigate('/ads-details');
  };

  // Function to handle the Boost button click event
  const handleBoostClick = (event) => {
    // Prevent the event from bubbling up to the parent div
    event.stopPropagation();
    navigate('/boost-payment-page');
  };

  return (
    <motion.div
      className="card-style"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div
        className="max-w-xs rounded overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer "
        onClick={handleCardClick}
      >
        <div className='relative'>
          <div className="absolute top-7 left-0 transform -translate-x-1/4 -translate-y-1/4 rotate-[-45deg] bg-red-500 text-white text-sm font-bold px-9 py-1 rounded w-32 uppercase">
            Urgents
          </div>
          <img src={Shoe} alt='Shoe' className="w-full p-2 h-56 object-contain" loading='lazy' />
          <div
            className='absolute bottom-2 right-2 px-2 py-1 rounded-lg font-medium bg-black bg-opacity-50 text-white cursor-pointer'
            onClick={handleBoostClick}
          >
            Boost
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-2 flex-col md:flex-row">
            <div className="flex items-center gap-2 ">
              <CiShoppingTag className="text-gray-600 text-lg" />
              <p className='font-inter text-sm'>Education</p>
            </div>
            <button className="bg-blue-500 text-white text-[8px] font-bold py-1 px-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
              Mark as Sold
            </button>
          </div>
          <div className="text-md mb-1 font-inter">Selling my Adidas Shoe</div>
          <div className='border w-full mb-2'></div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-green-500 text-lg" />
              <p className="font-inter text-[12px] text-gray-600">Sector 67, Mohali</p>
            </div>
            <p className="text-red-500 text-sm">Rs 1000</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Cards;
