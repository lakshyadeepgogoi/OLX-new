import React, { useState } from 'react';
import { BsStarFill, BsCheckCircle } from 'react-icons/bs';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { GiOnTarget } from "react-icons/gi";

function BoostPaymentPage() {
    const [selectedOption, setSelectedOption] = useState({
        days: 30,
        reach: 10,
        price: 839,
    });

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    }

    return (
        <div className="max-w-screen-md mx-auto p-4">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold uppercase">Reach more buyers and sell faster</h1>
                <p className="text-lg">Upgrade your ad to a top position</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <MdOutlineFeaturedPlayList className="text-xl text-blue-500" />
                        <p className="font-semibold">Urgent Ad</p>
                    </div>
                    <BsStarFill className="text-yellow-500 text-xl" />
                </div>

                <p className="flex items-center">Get noticed with 'URGENT' tag in a top position</p>
                <p className="flex items-center text-sm font-light"><GiOnTarget className="text-green-500 mr-2" />Ad will be highlighted to top positions</p>

                {/* Options with interactive selection and checkbox design */}
                <div className="mt-4 space-y-4">
                    <OptionDetail
                        option={{ days: 30, reach: 10, price: 839 }}
                        selectedOption={selectedOption}
                        onSelectOption={handleSelectOption}
                    />
                    <OptionDetail
                        option={{ days: 15, reach: 4, price: 499 }}
                        selectedOption={selectedOption}
                        onSelectOption={handleSelectOption}
                    />
                    <OptionDetail
                        option={{ days: 7, reach: 2, price: 359 }}
                        selectedOption={selectedOption}
                        onSelectOption={handleSelectOption}
                    />
                </div>
            </div>

            <button className="mx-auto block bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded w-40">
                Pay ₹{selectedOption.price}
            </button>

        </div>
    );
}

function OptionDetail({ option, selectedOption, onSelectOption }) {
    const isSelected = option.days === selectedOption.days;

    return (
        <div
            className={`flex justify-between items-center p-3 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}
            onClick={() => onSelectOption(option)}
            style={{ cursor: 'pointer' }}
        >
            <div>
                <p className='text-lg font-semibold'>Urgent Ad for {option.days} Days</p>
                <p className="flex items-center font-light"><GiOnTarget className="text-green-500 mr-2" />Reach up to {option.reach} times more buyers</p>
            </div>
            <div className="flex items-center space-x-2">
                <p className="font-semibold">₹{option.price}</p>
                {isSelected && <BsCheckCircle className="text-lg text-white" />}
            </div>
        </div>
    );
}

export default BoostPaymentPage;
