import React, { useState, useEffect, useMemo } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../pages/firebase';
import { Link } from 'react-router-dom';

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
                const categories = ['Electronics', 'Fashion', 'Furnitures', 'Mobiles', 'BooksStati', 'Pets', 'Services', 'Spare_Parts', 'Sports_Gyms', 'Vacacies', 'vehicles'];
                let allCategoryAds = [];
    
                for (const category of categories) {
                    const adsCollectionRef = collection(db, 'categories', category, 'ads');
                    const adsSnapshot = await getDocs(adsCollectionRef);
                    const categoryAds = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    allCategoryAds = [...allCategoryAds, ...categoryAds];
                }
    
                // Sort ads by timestamp in descending order
                allCategoryAds.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    
                // Slice the array to only include the latest 16 ads
                const latestAds = allCategoryAds.slice(0, 16);
    
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
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5 xl:gap-6 w-[95%] m-auto">
            {memoizedAds.map(ad => (
                <Link to={`/ad-details/${ad.id}`} key={ad.id}> {/* Wrap card in Link */}
                    <div className="border rounded-md overflow-hidden h-[380px] w-[260px] xl:w-[290px] relative">
                        {ad.promoted && (
                            <span className="bg-yellow-500 text-white py-1 px-2 absolute top-0 right-0 rounded-bl-md">
                                Promoted
                            </span>
                        )}
                        {ad.images && ad.images.length > 0 && (
                            <img src={ad.images[0]} alt="Ad" className="w-full h-52 object-cover" loading="lazy" />
                        )}
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
