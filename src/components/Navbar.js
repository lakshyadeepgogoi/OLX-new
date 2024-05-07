import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft, FaAngleDown } from 'react-icons/fa';
import logo from '../assets/logoWhite.png';
import { Link, } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../pages/firebase';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stateName, setStateName] = useState('Fetching location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [user, loading, error] = useAuthState(auth);


  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.photoURL);
    }
  }, [user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success('Logged Out');
    setDropdownOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchCountry = (latitude, longitude) => {
      const apiKey = 'cb41068afa3f4044a25113afa1eca2af';
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data && data.results && data.results.length > 0) {
            setStateName(data.results[0].components.state || 'State not found');
          } else {
            setStateName('State not found');
          }
        })
        .catch(() => {
          setStateName('Error fetching location');
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          fetchCountry(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setStateName('Location access denied');
        }
      );
    } else {
      setStateName('Geolocation is not supported by your browser');
    }
  }, []);

  const handlePost = () => {
    navigate("/Form");
  }

  return (
    <div className="bg-white shadow-md z-10">
      {/* First part of navbar */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-32 h-full ml-2 -mb-2 -mt-2" loading="lazy" />
        </Link>

        {/* Navigation */}
        <div className="flex items-center ml-6 w-9/12 justify-between">
          {/* Search bar */}
          <div className="relative lg:flex-grow lg:mr-6 sm:mr-1 hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiSearch className="text-green-500 " />
            </div>
            <input
              type="text"
              placeholder="Search ads..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-300 w-full font-inter"
            />
          </div>

          {/* Country button - only visible on mobile view */}
          <div className='block md:hidden mx-auto'>
            <button className="font-inter text-gray-700 flex items-center border px-3 py-2 pl-3 pr-3 mt-2 rounded-sm bg-gray-100 ">
              {stateName}
              <FaAngleDown className="ml-1" />
            </button>
          </div>

          <nav className="flex ml-6">
            <ul className="text-black flex gap-x-3 items-center">
              {/* Conditional rendering for Login or Profile button */}
              <li>
                {isLoggedIn ? (
                  <div className="relative inline-block">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="relative flex items-center justify-center p-3 overflow-hidden bg-green-100 rounded-full transition duration-300 hover:bg-green-200 focus:outline-none"
                    >
                      <img src={profileImageUrl} alt="Profile" className="rounded-full w-8 h-8" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 w-60 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-30 overflow-hidden">
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
                        >
                          <span>Logout</span>
                          <FaSignOutAlt className="ml-2" />
                        </button>
                        <Link
                          to="/"
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
                        >
                          <span>Home</span>
                          <FaHome className="ml-2" />
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
                        >
                          <span>Profile</span>
                          <FaUser className="ml-2" />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/Login"
                    className="items-center justify-center overflow-hidden font-medium text-green-500 border rounded-md bg-green-100 transition duration-300 hover:bg-green-200 flex px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-3 whitespace-nowrap"
                  >
                    <span className="font-inter">Sign in</span>
                  </Link>


                )}
              </li>

              {/* Notification Button */}
              <li className='block md:hidden'>
                <button className="relative flex items-center justify-center p-3 overflow-hidden bg-green-100 rounded-full transition duration-300 hover:bg-green-200 focus:outline-none ">
                  <AiOutlineMessage className="text-green-500" />
                </button>
              </li>

              {/* Post ads button */}
              <li className="hidden md:block">
                <button className="flex items-center justify-center px-3 py-3 pl-2 pr-2 gap-x-1  overflow-hidden text-md font-medium text-white bg-green-500 cursor-pointer shadow-md border rounded-md transition duration-300 hover:bg-green-600" onClick={handlePost}>
                  <FaArrowLeft />
                  <span className="mr-2 font-inter">Post ads</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Second part of navbar */}

      <div className='hidden md:block'>
        <div className="border-t-2 border-gray-100 "></div>
        <div className="container mx-auto px-4 py-2 flex relative text-sm ">
          <button className="font-inter text-gray-700 flex items-center border px-2 py-2 pl-2 pr-2 mt-2 rounded-sm bg-gray-100">
            All categories
            <FaAngleDown className="ml-1" />
          </button>
          <div className="border-l-2 border-gray-300 mx-4"></div>
          <ul className="flex text-gray-600 font-medium items-center font-inter gap-x-3">
            <li className="mx-2">Mobile Phones</li>
            <li className="mx-2">Electronics</li>
            <li className="mx-2">Cars</li>
            <li className="mx-2">Bikes</li>
            <li className="mx-2">Properties</li>
            <li className="mx-2">Home and Living</li>
            <li className="mx-2">Essentials</li>
          </ul>

          <button className="font-inter text-gray-700 flex items-center border px-3 py-2 pl-3 pr-3 mt-2 rounded-sm bg-gray-100 absolute right-0">
            {stateName}
            <FaAngleDown className="ml-1" />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;
