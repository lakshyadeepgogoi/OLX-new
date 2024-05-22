import React, { useState, useEffect, useMemo } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../pages/firebase';
import { Link } from 'react-router-dom';
import { CiShoppingTag, CiLocationOn } from "react-icons/ci";
import LazyLoad from 'react-lazyload';
import { motion } from 'framer-motion';

const CACHE_DURATION = 300000; // Cache duration in milliseconds (e.g., 5 minutes)
let cachedAds = null;
let cacheTimestamp = null;

function Cards({ variants }) {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAllCategoryAds = async () => {
          const now = new Date().getTime();
  
          if (cachedAds && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
              setAds(cachedAds);
              setLoading(false);
              return;
          }
  
          try {
              const categories = ['Electronics', 'Fashion', 'Furnitures', 'Mobiles', 'BooksStati', 'Pets', 'Services', 'Spare_Parts', 'Sports_Gyms', 'Vacancies', 'Vehicles','Properties'];
              let allCategoryAds = [];
  
              for (const category of categories) {
                  const adsCollectionRef = collection(db, 'categories', category, 'ads');
                  const adsSnapshot = await getDocs(adsCollectionRef);
                  const categoryAds = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                  allCategoryAds = [...allCategoryAds, ...categoryAds];
              }

  
              console.log('Fetched all category ads:', allCategoryAds); // Log fetched data
              cachedAds = allCategoryAds; // Cache the data
              cacheTimestamp = now; // Update the cache timestamp
              setAds(allCategoryAds);
          } catch (error) {
              console.error('Error fetching ads:', error); // Log any errors
          } finally {
              setLoading(false);
          }
      };
  
      fetchAllCategoryAds();
  }, []);
  

    const memoizedAds = useMemo(() => ads, [ads]);

    if (loading) {
        // Placeholder for loading state
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 max-w-10/12 mx-auto ">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="animate-pulse w-full">
                        <div className="h-72 bg-gray-300 rounded-md"></div>
                        <div className="flex justify-between mt-2">
                            <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 w-full "
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            {memoizedAds.map(ad => (
                <Link to={`/ad-details/${ad.id}`} key={ad.id} className="border rounded-md overflow-hidden h-[400px] relative">
                    <div className="relative">
                        {ad.promoted && (
                            <span className="bg-yellow-500 text-white py-1 px-2 absolute top-0 right-0 rounded-bl-md">
                                Promoted
                            </span>
                        )}
                        <LazyLoad height={200} offset={100} once>
                            <img src={ad.images && ad.images.length > 0 ? ad.images[0] : ''} alt="Ad" className="w-full h-60 object-cover" loading="lazy" />
                        </LazyLoad>
                        <div className="p-4">
                            <p className="font-semibold text-black text-lg mb-2">Rs {ad.price}</p>
                            <p className="text-gray-800 mb-2 text-xl">{ad.adName}</p>
                            <hr className="my-2" />
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <CiShoppingTag className="text-gray-600 text-lg" />
                                    <p className='font-inter text-sm'>{ad.subcategory}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CiLocationOn className="text-green-500 text-lg" />
                                    <p className="font-inter text-[12px] text-gray-600">{ad.userAddress}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{ad.timestamp && new Date(ad.timestamp.seconds * 1000).toLocaleString('en-US', { day: 'numeric', year: 'numeric', month: 'long' }).toUpperCase()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </motion.div>
    );
}

export default Cards;
