import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft, FaAngleDown } from 'react-icons/fa';
import logo from '../assets/logoWhite.png';
import { Link } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../pages/firebase';
import { db } from '../pages/firebase';
import { useEffect } from 'react';
import { signOut } from "firebase/auth";
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';



function ProfileNav({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [user, loading, error] = useAuthState(auth);


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
    

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePost = () => {
        navigate("/form");
    }


    return (
        <div className='bg-white shadow-md z-20'>
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
                            <CiSearch className="text-gray-500" />
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
                        <button className="font-inter text-gray-700 flex items-center border px-3 py-2 pl-3 pr-3 mt-2 rounded-sm bg-gray-100">
                            India
                            <FaAngleDown className="ml-1" />
                        </button>
                    </div>

                    <nav className="flex ml-6">
                        <ul className="text-black flex gap-x-3 items-center">
                            {/* Conditional rendering for Login or Profile button */}
                            
                            <li>

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


                            </li>

                            {/* Notification Button */}
                            <li className='block md:hidden'>
                                <button className="relative flex items-center justify-center p-3 overflow-hidden bg-green-100 rounded-full transition duration-300 hover:bg-green-200 focus:outline-none ">
                                    <AiOutlineMessage className="text-green-500" />
                                </button>
                            </li>

                            {/* Post ads button */}
                            <li className="hidden md:block">
                                <button className="flex items-center justify-center px-3 py-3 pl-2 pr-2 gap-x-1  overflow-hidden text-md font-medium text-white bg-green-500 cursor-pointer shadow-md border rounded-md transition duration-300 hover:bg-green-600 " onClick={handlePost}>
                                    <FaArrowLeft />
                                    <span className="mr-2 font-inter">Post ads</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ProfileNav