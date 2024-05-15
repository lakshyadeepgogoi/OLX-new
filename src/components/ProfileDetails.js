import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../pages/firebase';
import { CiPhone, CiMail } from "react-icons/ci";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { motion } from 'framer-motion';
import { CiShoppingTag, CiLocationOn } from "react-icons/ci";
import { getDocs, collection, where, query, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import LazyLoad from 'react-lazyload';
import { useNavigate } from 'react-router-dom';



function ProfileDetails() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [ads, setAds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cardHeight, setCardHeight] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [selectedAdCategory, setSelectedAdCategory] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [adBeingEdited, setAdBeingEdited] = useState(null);


    useEffect(() => {
        const fetchUserProfileImage = async () => {
            if (user) {
                setProfileImageUrl(user.photoURL);
                setName(user.displayName || '');
                setEmail(user.email || '');
                setPhoneNumber(user.phoneNumber || '');

                if (!user.photoURL) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setProfileImageUrl(userDoc.data().profileImageUrl);
                    }
                }
            }
        };
        fetchUserProfileImage();
    }, [user]);

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const storageRef = ref(storage, `profileImages/${user.uid}/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            const downloadURL = await getDownloadURL(storageRef);

            setProfileImageUrl(downloadURL);

            await setDoc(doc(db, 'users', user.uid), { profileImageUrl: downloadURL }, { merge: true });
        }
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        const fetchUserAds = async () => {
            try {
                const userId = auth.currentUser.uid;
                const categories = ['Electronics', 'Fashion', 'Furnitures', 'Mobiles', 'BooksStati', 'Pets', 'Properties', 'Services', 'Spare_Parts', 'Sports_Gyms', 'Vacancies', 'vehicles'];
                let allUserAds = [];

                for (const category of categories) {
                    const adsCollectionQuery = query(collection(db, 'categories', category, 'ads'), where('userId', '==', userId));
                    const querySnapshot = await getDocs(adsCollectionQuery);
                    const categoryAds = querySnapshot.docs.map(doc => ({ id: doc.id, category, ...doc.data() }));
                    allUserAds = [...allUserAds, ...categoryAds];
                }

                setAds(allUserAds);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user ads:', error);
                setIsLoading(false);
            }
        };
        fetchUserAds();
    }, []);

    const handleDeleteAd = async () => {
        try {
            if (selectedAdId && selectedAdCategory) {
                await deleteDoc(doc(db, 'categories', selectedAdCategory, 'ads', selectedAdId));
                setAds(ads.filter(ad => ad.id !== selectedAdId));
                setIsConfirmationModalOpen(false); // Close the confirmation modal after deletion
            }
        } catch (error) {
            console.error('Error deleting ad:', error);
        }
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/boost-payment-page');
    };

    return (
        <div className="flex flex-col md:flex-row w-full mt-4">
            <div className="max-w-full md:max-w-[20%] pt-4 space-y-4 bg-white shadow-md flex flex-col items-center w-full font-inter md:w-auto md:flex-shrink-0">
                <div className="relative">
                    <img src={profileImageUrl} alt="Profile" className="w-32 h-32 rounded-full border object-cover mt-4" />
                    {isEditing ? (
                        <label htmlFor="profileImageUpload" className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
                            <FaCheck className="text-gray-600" onClick={handleSave} />
                        </label>
                    ) : (
                        <label htmlFor="profileImageUpload" className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
                            <FaRegEdit className="text-gray-600" onClick={() => setIsEditing(true)} />
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
                <h1 className="text-2xl font-semibold flex flex-wrap justify-center ">{name}</h1>
                <div className='border-t w-full my-3'></div>
                <div className="space-y-1 flex flex-col items-center leading-8 p-4 w-full">
                    <h1 className='text-xl text-gray-400'>Contact Details</h1>
                    <p className="flex items-center justify-start gap-2">
                        <CiPhone className="text-lg text-blue-400" />
                        {phoneNumber}
                    </p>
                    <p className="flex items-center justify-start gap-2">
                        <CiMail className="text-lg text-blue-400" />
                        {email}
                    </p>
                </div>
                <button className="w-full py-2 mt-2 text-gray-600">
                    Report Seller
                </button>
            </div>
            <div className="w-full p-4">
                <div className="border-b-2 overflow-x-auto whitespace-nowrap">
                    <button
                        className="px-4 py-2 text-blue-700 hover:border-blue-700 "
                        onClick={() => { }}>
                        Recent Ads
                    </button>
                    <button
                        className="px-4 py-2 text-gray-600 bg-transparent  "
                        onClick={() => { }}>
                        Boosted Ads
                    </button>
                    <button
                        className="px-4 py-2  text-gray-600 bg-transparent  "
                        onClick={() => { }}>
                        Expired Ads
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-4 max-w-full">
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="animate-pulse w-full">
                                <div className="h-56 bg-gray-300 rounded-md"></div>
                                <div className="flex justify-between mt-2">
                                    <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                                    <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                                    <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                                <div className="mt-2">
                                    <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        ads.map(ad => (
                            <motion.div
                                key={ad.id}
                                className="card-style flex items-center"
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                            >
                                <LazyLoad height={cardHeight} width={cardWidth} offset={100}>
                                    <div className=" w-full rounded overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer flex relative"
                                        ref={el => {
                                            if (el) {
                                                setCardHeight(el.clientHeight);
                                                setCardWidth(el.clientWidth);
                                            }
                                        }}
                                    >
                                        <div className="w-1/2">
                                            <div className="relative">
                                                {ad.images && ad.images.length > 0 && (
                                                    <img src={ad.images[0]} alt="Ad" className="w-full p-2 h-56 object-fill" loading='lazy' />
                                                )}
                                                <div
                                                    onClick={handleClick}
                                                    className="absolute bottom-2 right-2 px-2 py-1 rounded-lg font-medium bg-black bg-opacity-50 text-white cursor-pointer"
                                                >
                                                    Boost
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-1/2 p-4">
                                            <div className="flex justify-between mb-2 flex-col md:flex-row">
                                                <div className="flex items-center gap-2">
                                                    <CiShoppingTag className="text-gray-600 text-lg" />
                                                    <p className='font-inter text-sm'>{ad.subcategory}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setSelectedAdId(ad.id);
                                                        setSelectedAdCategory(ad.category);
                                                        setIsConfirmationModalOpen(true);
                                                    }}
                                                    className="bg-blue-500 text-white text-[8px] font-bold py-1 px-2 rounded-full hover:bg-blue-600 transition-colors duration-200 w-20"
                                                >
                                                    Mark as Sold
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setAdBeingEdited(ads);
                                                        navigate(`/edit-ad/${ads.id}`);
                                                    }}
                                                    className="bg-green-500 text-white text-[8px] font-bold py-1 px-2 rounded-full hover:bg-green-600 transition-colors duration-200 w-20"
                                                >
                                                    Edit
                                                </button>

                                            </div>
                                            <div className="text-md mb-1 font-inter">{ad.adName}</div>
                                            <div className='border w-full mb-2'></div>

                                            <div className="flex justify-between flex-col">
                                                <div className="flex items-center gap-2">
                                                    <CiLocationOn className="text-green-500 text-lg" />
                                                    <p className="font-inter text-[12px] text-gray-600">{ad.userAddress}</p>
                                                </div>
                                                <div className='absolute bottom-2 right-2'>
                                                    <p className="text-red-500 text-xl font-semibold">
                                                        {ad.category === 'Vacancies' ? `₹ ${ad.salery}` : `₹ ${ad.price}`}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LazyLoad>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {isConfirmationModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this ad?</p>
                        <div className="flex justify-between">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4"
                                onClick={handleDeleteAd}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                onClick={() => setIsConfirmationModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDetails;


