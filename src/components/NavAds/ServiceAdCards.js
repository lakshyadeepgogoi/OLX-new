import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../pages/firebase';
import { Link } from 'react-router-dom';



function ServiceAdCards() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const adsCollectionRef = collection(db, 'categories', 'Services', 'ads');
                const adsSnapshot = await getDocs(adsCollectionRef);
                const adsData = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log('Fetched ads data:', adsData); // Log fetched data
                setAds(adsData);
            } catch (error) {
                console.error('Error fetching ads:', error); // Log any errors
            }
        };
    
        fetchAds();
    }, []);
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12 m-auto">
            {ads.map(ad => (
                <Link to={`/ad-details/${ad.id}`} key={ad.id}> {/* Wrap card in Link */}

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
                    <p className="text-gray-800 mb-2 text-xl">{ad.adName}</p>
                    <hr></hr>
                        <p className="font-medium text-black text-2xl mb-2">Rs {ad.price} </p>
                       
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-500">
                                {ad.timestamp && new Date(ad.timestamp.seconds * 1000).toLocaleString()}
                            </p>
                            {/* Assuming address is also available in ad data */}
                            <p className="text-sm text-gray-500">{ad.userAddress}</p>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
}

export default ServiceAdCards;
