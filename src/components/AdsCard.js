import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../pages/firebase';

function AdsCard() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            const adsCollectionRef = collection(db, 'categories', 'selectedCategory', 'ads');
            const adsSnapshot = await getDocs(adsCollectionRef);
            const adsData = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAds(adsData);
        };

        fetchAds();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ads.map(ad => (
                <div key={ad.id} className="border rounded-md overflow-hidden">
                    {ad.promoted && (
                        <span className="bg-yellow-500 text-white py-1 px-2 absolute top-0 right-0 rounded-bl-md">
                            Promoted
                        </span>
                    )}
                    {ad.images && ad.images.length > 0 && (
                        <img src={ad.images[0]} alt="Ad" className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                        <p className="font-bold text-lg mb-2">{ad.price} INR</p>
                        <p className="text-gray-800 mb-2">{ad.adName}</p>
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-500">{ad.timestamp}</p>
                            {/* Assuming address is also available in ad data */}
                            <p className="text-sm text-gray-500">{ad.address}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdsCard;
