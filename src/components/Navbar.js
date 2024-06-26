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
import heart from '../assets/Heart.png'


import { db } from '../pages/firebase';
// import { getDocs, collection } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';



const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stateName, setStateName] = useState('Fetching location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [categories, setCategories] = useState([]);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);


 


  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.photoURL);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      toast.success('Logged Out');
      setDropdownOpen(false);
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
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

  useEffect(() => {
    const fetchProfileImageUrl = async () => {
      if (user) {
        if (user.photoURL) {
          setProfileImageUrl(user.photoURL);
        } else {
          // User logged in with email and password, fetch profile image URL from Firestore
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              setProfileImageUrl(userDoc.data().profileImageUrl || '');
            }
          } catch (error) {
            console.error('Error fetching profile image URL:', error);
          }
        }
      }
    };

    fetchProfileImageUrl();
  }, [user]);


  useEffect(() => {
    const fetchCategory = async () => {

      const categoryRef = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoryRef);
      const categoriesList = categorySnapshot.docs.map(doc => doc.id);
      setCategories(categoriesList);
    };

    fetchCategory()
  }, []);



  const handleCategoryClick = async (category) => {
    // Here you can navigate to a page to show ads of the selected category
    navigate(`/category/${category}`);
  };

  return (
    <div className="bg-white shadow-md z-10 w-full">
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
          {/* <div className='block md:hidden mx-auto'>
            <button className="font-inter text-gray-700 flex items-center border px-3 py-2 pl-3 pr-3 mt-2 rounded-sm bg-gray-100 ">
              {stateName}
              <FaAngleDown className="ml-1" />
            </button>
          </div> */}

          <nav className="flex sm:ml-6 ml-auto">
            <ul className="text-black flex gap-x-2 items-center">
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
              {/* <li className='block md:hidden'>
                <button className="relative flex items-center justify-center p-3 overflow-hidden bg-green-100 rounded-full transition duration-300 hover:bg-green-200 focus:outline-none ">
                  <AiOutlineMessage className="text-green-500" />
                </button>
              </li> */}


                {/* wishlist */}
          <a className='w-12 h-12 bg-[#E8F7FF] outline-2 outline-blue-900 rounded-full flex items-center justify-center' href='/wishlist'> <img src={heart} alt='heart' className='' /></a>
              

              <div>
              <Link to='/chat-app'>
                <button className='border-2 px-4 py-3 rounded-md'>Chat</button>
                </Link>
              </div>

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
      <div className='hidden md:block w-full'>
        <div className="border-t-2 border-gray-100 "></div>
        <div className="container mx-auto px-4 py-2 flex relative text-sm w-full h-16">
          <div className='relative' onMouseEnter={() => setCategoriesDropdownOpen(true)}
            onMouseLeave={() => setTimeout(() => setCategoriesDropdownOpen(false), 1000)} >
            <button
              className="whitespace-nowrap font-inter text-gray-700 flex items-center border px-2 py-2 pl-2 pr-2 ml-4 rounded-sm bg-gray-100"

            >
              All categories
              <FaAngleDown className="ml-1" />
            </button>
            {categoriesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                style={{ opacity: categoriesDropdownOpen ? 1 : 0, transition: 'opacity 0.3s ease' }}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                onMouseLeave={() => setTimeout(() => setCategoriesDropdownOpen(false), 300)}>
                <ul className="text-gray-700">
                  <Link to='/phones&gadgets'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Phones & Gadgets</li>
                  </Link>
                  <Link to='/electronics&appliances'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Electronics & Appliances</li>
                  </Link>
                  <Link to='/Vehicles'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Vehicles</li>
                  </Link>
                  <Link to='/Properties'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Properties</li>
                  </Link>
                  <Link to='/Spare&Parts'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Spare Parts</li>
                  </Link>
                  <Link to='/Furnitures'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Furnitures</li>
                  </Link>
                  <Link to='/Books&Stationery'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Books & Stationery</li>
                  </Link>
                  <Link to='/Sports&Gyms'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sports & Gyms</li>
                  </Link>
                  <Link to='/Fashion&Clothings'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Fashion & Clothings</li>
                  </Link>
                  <Link to='/Services'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Services</li>
                  </Link>
                  <Link to='/Vacancies'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Vacancies</li>
                  </Link>
                  <Link to='/Pets'>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pets</li>
                  </Link>
                </ul>
              </div>
            )}


          </div>

          <div className="border-l-2 border-gray-300 mx-4"></div>
          <ul className="flex text-gray-600 font-medium items-center font-inter gap-x-4 ">
            <Link to='/phones&gadgets'>
              <li className="whitespace-nowrap">Phones & Gadgets</li>
            </Link>

            <Link to='/electronics&appliances'>
              <li className="whitespace-nowrap">Electronics & Appliances</li>
            </Link>

            <Link to='/Vehicles'>
              <li className="whitespace-nowrap">Vehicles</li>
            </Link>

            <Link to='/Properties'>
              <li className="whitespace-nowrap">Properties</li>
            </Link>

            <Link to='/Spare&Parts'>
              <li className="whitespace-nowrap">Spare Parts</li>
            </Link>
            <Link to='/Furnitures'>
              <li className="whitespace-nowrap">Furnitures</li>
            </Link>
            <Link to='/Books&Stationery'>
              <li className="whitespace-nowrap">Books & Stationery</li>
            </Link>
            <Link to='/Sports&Gyms'>
              <li className="whitespace-nowrap">Sports & Gyms</li>
            </Link>

            {/*<li className=" whitespace-nowrap">Fashion & Clothings</li>
              <li className=" whitespace-nowrap">Services</li> */}
          </ul>


          <button className="font-inter text-gray-700 flex items-center border px-3 py-2 pl-3 pr-3 my-2 rounded-sm bg-gray-100 absolute right-5">
            {stateName}
            <FaAngleDown className="ml-1" />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;
