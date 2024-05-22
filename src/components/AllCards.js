import React, { useState, useEffect, useMemo } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../pages/firebase';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const CACHE_DURATION = 300000; // Cache duration in milliseconds (e.g., 5 minutes)
let cachedAds = null;
let cacheTimestamp = null;

function AllCards() {
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
                const categories = ['Electronics', 'Fashion', 'Furnitures', 'Mobiles', 'BooksStati', 'Pets', 'Services', 'Spare_Parts', 'Sports_Gyms', 'Vacancies', 'Vehicles'];
                let allCategoryAds = [];
    
                for (const category of categories) {
                    const adsCollectionRef = collection(db, 'categories', category, 'ads');
                    const adsSnapshot = await getDocs(adsCollectionRef);
                    const categoryAds = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    allCategoryAds = [...allCategoryAds, ...categoryAds];
                }
    
                // Sort ads by timestamp in descending order
                allCategoryAds.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    
                // Slice the array to only include the latest 12 ads
                const latestAds = allCategoryAds.slice(0, 20);
    
                console.log('Fetched latest 16 category ads:', latestAds); // Log fetched data
                cachedAds = latestAds; // Cache the data
                cacheTimestamp = now; // Update the cache timestamp
                setAds(latestAds);
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
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5 xl:gap-6 w-[95%] m-auto">
                {Array.from({ length: 12 }).map((_, index) => (
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
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5 xl:gap-6 my-8 w-[95%] m-auto">
            {memoizedAds.map(ad => (
                <Link to={`/ad-details/${ad.id}`} key={ad.id}> {/* Wrap card in Link */}
                    <div className="border rounded-md overflow-hidden h-[380px] w-[260px] xl:w-[290px] relative">
                        {ad.promoted && (
                            <span className="bg-yellow-500 text-white py-1 px-2 absolute top-0 right-0 rounded-bl-md">
                                Promoted
                            </span>
                        )}
                        <LazyLoad height={200} offset={100} once>
                            <img src={ad.images && ad.images.length > 0 ? ad.images[0] : ''} alt="Ad" className="w-full h-52 object-cover" loading="lazy" />
                        </LazyLoad>
                        <div className="p-3">
                            <p className="font-semibold text-black text-2xl">Rs {ad.price}</p>
                            <p className="text-gray-800 mb-2 text-xl">{ad.adName}</p>
                            <hr />
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-500">{ad.userAddress}</p>
                                <p className="text-xs text-gray-500 items-end mt-4 self-end">
                                    <div>{ad && ad.timestamp && new Date(ad.timestamp.seconds * 1000).toLocaleString('en-US', { day: 'numeric', year: 'numeric', month: 'long' }).toUpperCase()}</div>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default AllCards;
