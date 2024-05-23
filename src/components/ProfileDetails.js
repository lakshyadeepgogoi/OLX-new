import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../pages/firebase';
import { CiPhone, CiMail } from "react-icons/ci";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { motion } from 'framer-motion';
import { CiShoppingTag, CiLocationOn } from "react-icons/ci";
import { getDocs, collection, where, query, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import LazyLoad from 'react-lazyload';
import { useNavigate } from 'react-router-dom';

function ProfileDetails() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [ads, setAds] = useState([]); // Added ads state variable
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [selectedAdCategory, setSelectedAdCategory] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false); // Added state for updating profile
    const [activeTab, setActiveTab] = useState('recentAds');
    const [oldProfileImageUrl, setOldProfileImageUrl] = useState('');
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        if (user) {
            setProfileImageUrl(user.photoURL);
            setName(user.displayName || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber || '');

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setProfileImageUrl(userData.profileImageUrl || user.photoURL);
                setName(userData.displayName || user.displayName || '');
                setEmail(userData.email || user.email || '');
                setPhoneNumber(userData.phoneNumber || user.phoneNumber || '');
            }
        }
    };
    useEffect(() => {
        fetchUserProfile();
    }, [user]);




    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            setIsUploadingImage(true); // Set loading state while uploading
            const storageRef = ref(storage, `profileImages/${user.uid}/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            const downloadURL = await getDownloadURL(storageRef);

            if (oldProfileImageUrl && oldProfileImageUrl !== user.photoURL) {
                const oldImageRef = ref(storage, oldProfileImageUrl);
                try {
                    await deleteObject(oldImageRef);
                } catch (error) {
                    console.error('Error deleting old profile image:', error);
                }
            }

            setProfileImageUrl(downloadURL);
            setOldProfileImageUrl(downloadURL);

            await setDoc(doc(db, 'users', user.uid), { profileImageUrl: downloadURL }, { merge: true });
            setIsUploadingImage(false); // Clear loading state after upload
        }
    };





    const handleSaveProfile = async () => {
        setIsUpdatingProfile(true); // Set loading state
        try {
            if (user) {
                console.log("Updating profile with data:", { name, email, phoneNumber }); // Check the values
                // Update user profile in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    displayName: name,
                    email: email,
                    phoneNumber: phoneNumber
                }, { merge: true });

                // Fetch updated profile
                await fetchUserProfile();

                // Update local state
                setName(name);
                setEmail(email);
                setPhoneNumber(phoneNumber);
            }
            setIsEditingProfile(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsUpdatingProfile(false); // Reset loading state
        }
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const fetchUserAds = async () => {
            try {
                const userId = auth.currentUser.uid;
                const categories = ['Electronics', 'Fashion', 'Furnitures', 'Mobiles', 'BooksStati', 'Pets', 'Properties', 'Services', 'Spare_Parts', 'Sports_Gyms', 'Vacancies', 'Vehicles'];
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
        setIsDeleting(true);
        try {
            if (selectedAdId && selectedAdCategory) {
                await deleteDoc(doc(db, 'categories', selectedAdCategory, 'ads', selectedAdId));
                setAds(ads.filter(ad => ad.id !== selectedAdId));
                setIsConfirmationModalOpen(false);
            }
        } catch (error) {
            console.error('Error deleting ad:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    const handleClick = () => {
        navigate('/boost-payment-page');
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="flex flex-col md:flex-row w-full mt-4">
            <div className="max-w-full md:max-w-[20%] pt-4 space-y-4 bg-white shadow-md flex flex-col items-center w-full font-inter md:w-auto md:flex-shrink-0 ">
                <div className="relative">
                    {profileImageUrl ? (
                        <img src={profileImageUrl} alt="Profile" className="w-32 h-32 rounded-full border object-cover mt-4" />
                    ) : (
                        <div
                            className="w-32 h-32 rounded-full border flex items-center justify-center mt-4"
                            style={{ backgroundColor: getRandomColor() }}
                        >
                            <span className="text-4xl font-semibold text-white">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}

                    {isUploadingImage && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 rounded-full w-32 h-32 mt-4 ">
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}


                    <label htmlFor="profileImageUpload" className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer">
                        {isEditing ? (
                            <FaCheck className="text-gray-600" onClick={handleSave} />
                        ) : (
                            <FaRegEdit className="text-gray-600" onClick={() => setIsEditing(true)} />
                        )}
                    </label>
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
                <div className="space-y-1 flex flex-col items-start leading-8 p-4 w-full ">
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
                <button
                    className=" p-3 mt-4 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 "
                    onClick={() => setIsEditingProfile(true)}
                >
                    <span className="flex items-center justify-center">
                        <FaRegEdit className="mr-2 text-md " />
                        Edit Profile
                    </span>
                </button>

            </div>
            <div className="w-full p-4">
                <div className="border-b-2 overflow-x-auto whitespace-nowrap">
                    <button
                        className={`px-4 py-2 text-blue-700 hover:border-blue-700 ${activeTab === 'recentAds' && 'border-b-2'}`}
                        onClick={() => handleTabChange('recentAds')}
                    >
                        Recent Ads
                    </button>
                    <button
                        className={`px-4 py-2 text-gray-600 bg-transparent ${activeTab === 'boostedAds' && 'border-b-2'}`}
                        onClick={() => handleTabChange('boostedAds')}
                    >
                        Boosted Ads
                    </button>
                    <button
                        className={`px-4 py-2  text-gray-600 bg-transparent ${activeTab === 'expiredAds' && 'border-b-2'}`}
                        onClick={() => handleTabChange('expiredAds')}
                    >
                        Expired Ads
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mt-4 w-full">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="animate-pulse w-full">
                                <div className="h-56 bg-gray-300 rounded-md"></div>
                                <div className="flex justify-between mt-2">
                                    <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                                    <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                                </div>
                                <div className="w-full h-4 bg-gray-300 rounded-md mt-2"></div>
                            </div>
                        ))
                    ) : (
                        ads.length > 0 ? (
                            ads.map(ad => (
                                <motion.div
                                    key={ad.id}
                                    className="card-style w-full flex"
                                    initial="hidden"
                                    animate="visible"
                                    variants={variants}
                                >
                                    <LazyLoad height={200} offset={100}>
                                        <div className="w-full rounded overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 cursor-pointer flex relative">
                                            <div className="relative w-[300px]">
                                                <div className=' w-full'>
                                                    {ad.images && ad.images.length > 0 && (
                                                        <img
                                                            src={ad.images[0]}
                                                            alt="Ad"
                                                            className="w-full max-w-full h-56 object-cover"
                                                            loading='lazy'
                                                        />
                                                    )}
                                                </div>
                                                <div onClick={handleClick} className="absolute bottom-2 right-2 px-2 py-1 rounded-lg font-medium bg-black bg-opacity-50 text-white cursor-pointer">
                                                    Boost
                                                </div>
                                            </div>

                                            <div className="w-1/2 p-4 flex flex-col justify-between">
                                                <div className="flex justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <CiShoppingTag className="text-gray-600 text-lg" />
                                                        <p className='font-inter text-sm'>{ad.subcategory}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedAdId(ad.id);
                                                                setSelectedAdCategory(ad.category);
                                                                setIsConfirmationModalOpen(true);
                                                            }}
                                                            className="bg-blue-500 text-white text-[8px] font-bold py-1 px-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                                                        >
                                                            Mark as Sold
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                navigate(`/edit-ad/${ad.id}`);
                                                            }}
                                                            className="bg-green-500 text-white text-[8px] font-bold py-1 px-2 rounded-full hover:bg-green-600 transition-colors duration-200"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-md mb-1 font-inter">{ad.adName}</div>
                                                <div className='border w-full mb-2'></div>

                                                <div className="flex justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <CiLocationOn className="text-green-500 text-lg" />
                                                        <p className="font-inter text-[12px] text-gray-600">{ad.userAddress}</p>
                                                    </div>
                                                    <div className='text-red-500 text-xl font-semibold'>
                                                        {ad.category === 'Vacancies' ? `₹ ${ad.salery}` : `₹ ${ad.price}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </LazyLoad>
                                </motion.div>
                            ))
                        ) : (
                            <div className="w-full text-center text-gray-600">No data found</div>
                        )
                    )}
                </div>
            </div>

            {isConfirmationModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this ad?</p>
                        {isDeleting ? (
                            <div className="flex justify-center items-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                </svg>
                                Deleting...
                            </div>
                        ) : (
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
                        )}
                    </div>
                </div>
            )}

            {isEditingProfile && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 w-96">
                        <h2 className="text-xl font-semibold mb-4>                        ">Edit Profile</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    id="phone"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    {isUpdatingProfile ? "Updating..." : "Save"}
                                </button>
                                <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDetails;


