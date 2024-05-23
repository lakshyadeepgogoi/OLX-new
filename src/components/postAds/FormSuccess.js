import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import check from "../../assets/circle-wavy-check-duotone 1.png";

function FormSuccess() {
  return (
    <div className="bg-gray-100 p-5 flex  justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md sm:h-96  sm:pt-16 w-full max-w-screen-md">
        <img src={check} alt="check mark" className="mx-auto" />
        <h1 className="text-4xl font-bold text-center mt-6">Your ad is successfully published</h1>
        <p className="text-center text-lg mt-2 mb-6">Boost your ad to sell faster by reaching more potential buyers.</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button className="border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white h-12 md:h-14 w-full md:w-36 font-semibold py-2 mt-6 md:mt-0 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
            <a href='/profile' className="mr-2">View Ad</a>
          </button>
          <button className="bg-green-500 rounded-md text-white hover:bg-green-600 h-12 md:h-14 w-full md:w-36 font-semibold py-2 mt-4 md:mt-0 flex items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:scale-105">
            <span>Boost Ad</span>
            <FaArrowRightLong className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormSuccess;
