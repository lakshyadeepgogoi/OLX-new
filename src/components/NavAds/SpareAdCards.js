import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../pages/firebase';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

function SpareAdCards() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const adsCollectionRef = collection(db, 'categories', 'Spare_Parts', 'ads');
                const adsSnapshot = await getDocs(adsCollectionRef);
                const adsData = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log('Fetched ads data:', adsData);
                setAds(adsData);
            } catch (error) {
                console.error('Error fetching ads:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchAds();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5 xl:gap-6 w-[95%] m-auto">
            {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
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
                    <LazyLoad key={ad.id} height={380} offset={100}>
                        <Link to={`/ad-details/${ad.id}`}>
                            <div className="border-2 rounded-md overflow-hidden h-[380px] w-[260px] xl:w-80">
                                {ad.promoted && (
                                    <span className="bg-yellow-500 text-white py-1 px-2 absolute top-0 right-0 rounded-bl-md">
                                        Promoted
                                    </span>
                                )}
                                {ad.images && ad.images.length > 0 && (
                                    <img src={ad.images[0]} alt="Ad" className="w-full h-52 object-cover" />
                                )}
                                <div className="p-3">
                                    <p className="font-semibold text-black text-2xl">Rs {ad.price}</p>
                                    <p className="text-gray-800 mb-2 text-xl">{ad.adName}</p>
                                    <hr />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">{ad.userAddress}</p>
                                        <p className="text-xs text-gray-500 items-end mt-4 self-end">
                                            {ad.timestamp && new Date(ad.timestamp.seconds * 1000).toLocaleString('en-US', { day: 'numeric', year: 'numeric', month: 'long' }).toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </LazyLoad>
                ))
            )}
        </div>
    );
}

export default SpareAdCards;
