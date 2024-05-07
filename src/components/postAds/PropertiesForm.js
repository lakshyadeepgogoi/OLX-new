import React from 'react'
import { Checkbox } from 'flowbite-react';
import { useState } from 'react';

function PropertiesForm() {
  return (
    <div>
        <form onSubmit={''} className="flex flex-col w-full gap-y-4 mt-6">
            <label className='w-full'>
                <p className='text-sm text-gray-800 mb-1'>
                    Ads Name <sup className='text-pink-200'>*</sup>
                </p>
            <input
                required
                type="text"
                value={''}
                onChange={''}
                placeholder="Enter Ad Name"
                name="Ad_name"
                className=' rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2'/>
            </label>

            <label className='w-full relative'>
                <p className='text-sm text-gray-800 mb-1'>
                    Sub-Category <sup className='text-pink-200'>*</sup>
                </p>
            <input
            required
            type={''}
            value={''}
            onChange={''}
            placeholder="Select"
            name="sub-category"
            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
            </label>
{/* section 2  */}
            <div className='grid grid-cols-2 gap-4'>
                <label className='w-full '>
                <p className='text-sm text-gray-800 mb-1'>
                   Brand <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type={''}
                    value={''}
                    onChange={''}
                    placeholder="Select"
                    name="Brand"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                </label>

                <label className='w-full '>
                    <p className='text-sm text-gray-800 mb-1'>
                    Model <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                    required
                    type={''}
                    value={''}
                    onChange={''}
                    placeholder="Select"
                    name="Model"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                </label>

                <label className='w-full'>
                    <p className='text-sm text-gray-800 mb-1'>
                    Conditions <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                    required
                    type={''}
                    value={''}
                    onChange={''}
                    placeholder="Select"
                    name="Conditions"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                </label>

                <label className='w-full '>
                    <p className='text-sm text-gray-800 mb-1'>
                    Authenticityy <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                    required
                    type={''}
                    value={''}
                    onChange={''}
                    placeholder="Select"
                    name="Authenticity"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                </label>
            </div>

            <label className='w-full '>
                    <p className='text-sm text-gray-800 mb-1'>
                    Tags <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                    required
                    type={''}
                    value={''}
                    onChange={''}
                    placeholder="Ads tags"
                    name="Tags"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                </label>

                {/* price and negotiable */}

                <div className='flex flex-row gap-4'>
                    <label className='w-full '>
                        <p className='text-sm text-gray-800 mb-1'>
                        Ads Price (INR) <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                        required
                        type={''}
                        value={''}
                        onChange={''}
                        placeholder="what Price you want"
                        name="price"
                        className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                    </label>
                    <label className='w-full '>
                        <p className='text-sm text-gray-800 mb-1'>
                        Negotiable <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                        required
                        type={''}
                        value={''}
                        onChange={''}
                        placeholder="select"
                        name="Negotiable"
                        className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                    </label>
                </div>
                <label className='w-full '>
                        <p className='text-sm text-gray-800 mb-1'>
                        Description <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                        required
                        type={''}
                        value={''}
                        onChange={''}
                        placeholder="Ad description"
                        name="Description"
                        className='bg-gray-100 rounded-md text-gray-800 w-full h-32 px-4 py-2 text-center'/>
                    </label>

                    <label className='w-full '>
                        <p className='text-sm text-gray-800 mb-1'>
                        Feature <sup className='text-[#939AAD]'> (optional)</sup>
                        </p>
                        <input
                        required
                        type={''}
                        value={''}
                        onChange={''}
                        placeholder="Write a feature in each line eg."
                        name="Description"
                        className='bg-gray-100 rounded-md text-gray-800 w-full h-32 px-4 py-2 text-center'/>
                    </label>

            


            <div className='flex  flex-col-reverse sm:flex-row justify-between items-baseline'>
                <p className='text-[#636A80]'> <Checkbox className='m-2'></Checkbox>Save my contact information for faster posting</p>
                <div className='flex sm:flex-row gap-4'>
                <button className='border-4 rounded-md text-gray-800 h-14 w-36 sm:w-40 font-semibold py-2 mt-6'>
                previous
                </button>

                
                </div>
            </div>
        </form>
    </div>
  )
}

export default PropertiesForm