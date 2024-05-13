import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../pages/firebase';

function AdDetailPage() {
    const { id } = useParams(); // Get the ad ID from the URL params
    const [adDetails, setAdDetails] = useState(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const adDocRef = doc(db, 'categories', 'Mobiles', 'ads', id);
                const adDocSnapshot = await getDoc(adDocRef);
                if (adDocSnapshot.exists()) {
                    setAdDetails({ id: adDocSnapshot.id, ...adDocSnapshot.data() });
                } else {
                    console.log('Ad not found');
                }
            } catch (error) {
                console.error('Error fetching ad details:', error);
            }
        };

        fetchAdDetails();
    }, [id]);

    return (
        <div className="container mx-auto flex justify-between w-5/6 mt-12">
            <div className="w-1/2" >
                {adDetails && adDetails.images && (
                    <div className="flex overflow-x-auto w-full  border-2 no-scrollbar p-4" 
                    style={{height:'500px'}}>
                        {adDetails.images.map((image, index) => (
                            <img key={index} src={image} alt={`Ad Image ${index + 1}`} className="w-11/12 h-full object-cover mr-2" />
                        ))}
                    </div>
                )}
                


                {adDetails && (
                    <div>
                        <p className="text-lg text-gray-700 mt-4">{adDetails.description}</p>
                    </div>
                )}
            </div>
            <div className="w-1/2">
                {adDetails && (
                    <div>
                        <h2 className="text-2xl font-bold">{adDetails.adName}</h2>
                        <p className="text-lg text-gray-700">Price: Rs {adDetails.price}</p>
                        <p className="text-lg text-gray-700">Date Posted: {adDetails.timestamp && new Date(adDetails.timestamp.seconds * 1000).toLocaleString()}</p>
                        <p className="text-lg text-gray-700 mt-4">{adDetails.userAddress}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Contact via WhatsApp</button>

                    </div>
                )}
            </div>
        </div>
    );
}

export default AdDetailPage;
