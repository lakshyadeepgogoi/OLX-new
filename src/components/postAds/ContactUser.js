import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc,addDoc } from 'firebase/firestore';
import { db } from '../../pages/firebase';

function ContactUser({ selectedCategory, docId, collectionId }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const history = useNavigate();
    const [error, setError] = useState('');

    console.log("Received selectedCategory:", selectedCategory);

    console.log("Received docId:", docId);
    console.log("Received collectionId:", collectionId);
    

    const handlePostAd = async () => {
        try {
            const docRef = doc(db, 'categories', selectedCategory, collectionId, docId); 
            await updateDoc(docRef, {
                phoneNumber,
                whatsappNumber,
                email,
                userAddress
            });

            history('/form-success');
        } catch (error) {
            console.error('Error updating document:', error);
            setError('Error updating document. Please try again.');
        }
    };

    return (
        <div>
            <form className="flex flex-col w-full gap-y-4 mt-6">
                <div className='flex flex-row  gap-x-4'>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="phoneNumber" className="text-[#636A80]">Phone Number:</label>
                        <input className='rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2 border' type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="whatsappNumber" className="text-[#636A80]">WhatsApp Number:</label>
                        <input className='rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2 border' type="text" id="whatsappNumber" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-row  gap-x-4'>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="email" className="text-[#636A80]">Email:</label>
                        <input className='rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2 border' type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-[#636A80]">Address:</label>
                        <input className='rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2 border' type="text" id="address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
                    </div>
                </div>
            </form>
            <button onClick={handlePostAd} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Post Ad</button>

            {error && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p className="text-red-500">{error}</p>
                        <button onClick={() => setError('')} className="text-blue-500 underline mt-2">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactUser;
