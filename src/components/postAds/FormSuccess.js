import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import check from "../../assets/circle-wavy-check-duotone 1.png"


function FormSuccess() {
  return (
    <div>
        <div className="flex flex-col w-full gap-y-4 mt-6 py-16 items-center justify-center">
                    <img src={check}></img>
                    <h1 className="text-4xl font-bold text-center">Your ad is successfully published</h1>
                    <p className="text-center text-xl mt-2 mb-6">Boost Add to sell faster by reaching more potential buyers</p>
                    {/* Placeholder for step 3 confirmation */}
                    <div className='flex flex-row gap-4'>
                    <button className='border-4 rounded-md text-[#00AAFF] h-14 w-32 sm:w-40 font-semibold py-2 mt-6'>
                    View Ad
                    </button>

                    <button className='bg-green-500 rounded-md text-gray-800 h-14 w-40 font-semibold py-2 mt-6 flex justify-center items-center gap-2' onClick={''}>
                    Boost Ad <FaArrowRightLong/>
                    </button>
                    </div>
        </div>
    </div>
  )
}

export default FormSuccess