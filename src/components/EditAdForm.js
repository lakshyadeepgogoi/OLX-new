import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../pages/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditAdForm() {
    const { adsId, category } = useParams();
    const [adData, setAdData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdData = async () => {
            try {
                const adDocRef = doc(db, 'categories', category, 'ads', adsId);
                const adDoc = await getDoc(adDocRef);
                if (adDoc.exists()) {
                    setAdData(adDoc.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching ad data:', error);
            }
        };
        fetchAdData();
    }, [adsId, category]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const adDocRef = doc(db, 'categories', category, 'ads', adsId);
            await updateDoc(adDocRef, adData);
            navigate('/'); // Redirect to home or specific page after update
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <div>
            {adData ? (
                <form onSubmit={handleUpdate}>
                    <label>
                        Ad Name:
                        <input
                            type="text"
                            value={adData.adName}
                            onChange={(e) => setAdData({ ...adData, adName: e.target.value })}
                        />
                    </label>
                    {/* Add other input fields as necessary */}
                    <button type="submit">Update Ad</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EditAdForm;
