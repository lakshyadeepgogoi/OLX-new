import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../pages/firebase'; // Assuming you have set up Firebase in a separate file

import Cards from './Cards';
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaLocationDot, FaCheck  } from "react-icons/fa6"; // Import FaPencilAlt and FaCheck  icons
import { FaRegEdit } from "react-icons/fa";

function ProfileDetails() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.photoURL);
      setName(user.displayName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  // Function to handle profile image upload
  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
   
    setProfileImageUrl(URL.createObjectURL(imageFile));
  };

  // Function to handle save action
  const handleSave = () => {
    // Save profile changes logic goes here
    // For demonstration purposes, let's assume changes are saved successfully
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="flex w-full mt-4">
      {/* Left Section - User Details */}
      <div className="max-w-[20%] pt-4 space-y-4 bg-white shadow-md flex flex-col items-center w-full font-inter">
        <div className="relative">
          <img src={profileImageUrl} alt="Profile" className="w-32 h-32 rounded-full border object-cover mt-4" />
          {isEditing ? (
            <label htmlFor="profileImageUpload" className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
              <FaCheck  className="text-gray-600" onClick={handleSave} />
            </label>
          ) : (
            <label htmlFor="profileImageUpload" className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
              <FaRegEdit className="text-gray-600" />
            </label>
          )}
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <h1 className="text-2xl font-semibold flex flex-wrap">{name}</h1>
        <div className='border-t w-full my-3'></div>

        <div className="space-y-1 flex flex-col items-start leading-8 p-4 w-full">
          <h1 className='text-xl text-gray-400'>Contact Details</h1>
          <p className="flex items-center justify-start gap-2">
            <CiPhone className="text-lg text-blue-400" />
            {phoneNumber}
          </p>
          <p className="flex items-center justify-start gap-2">
            <CiMail className="text-lg text-blue-400" />
            {email}
          </p>
          {/* You might not have address in Google Auth */}
        </div>

        {/* Report Seller Button */}
        <button className="w-full py-2 mt-2  text-gray-600    ">
          Report Seller
        </button>
      </div>

      {/* Right Section - Ads with Tabs */}
      <div className="w-full p-4">
        {/* Your remaining code for displaying ads */}
         {/* Tabs for switching views */}
         <div className="border-b-2 overflow-x-auto whitespace-nowrap">
          <button 
            className="px-4 py-2 text-blue-700 hover:border-blue-700 "
            onClick={() => {}}>
            Recent Ads
          </button>
          <button 
            className="px-4 py-2 text-gray-600 bg-transparent  "
            onClick={() => {}}>
            Boosted Ads
          </button>
          <button 
            className="px-4 py-2  text-gray-600 bg-transparent  "
            onClick={() => {}}>
            Expired Ads
          </button>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4 ">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
        

      </div>
    
  );
}

export default ProfileDetails;
