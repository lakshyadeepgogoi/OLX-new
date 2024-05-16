import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../pages/firebase';
import { Link } from 'react-router-dom';


function FashionAdCards() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const adsCollectionRef = collection(db, 'categories', 'Fashion', 'ads');
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[88%] m-auto">
            {ads.map(ad => (
                <Link to={`/ad-details/${ad.id}`} key={ad.id}> {/* Wrap card in Link */}
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
                        <p className="font-semibold text-black text-2xl">Rs {ad.price} </p>
                        <p className="text-gray-800 mb-2 text-xl">{ad.adName}</p>
                        <hr></hr>
                            
                            
                            <div className="flex flex-col ">
                               
                                <p className="text-sm text-gray-500">{ad.userAddress}</p>
                                {/* Assuming address is also available in ad data */}

                                <p className="text-xs text-gray-500 items-end mt-4  self-end">
                                <div>{ad && ad.timestamp && new Date(ad.timestamp.seconds * 1000).toLocaleString('en-US', {  day: 'numeric', year: 'numeric', month: 'long',}).toUpperCase()}</div>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    );
}

export default FashionAdCards;
