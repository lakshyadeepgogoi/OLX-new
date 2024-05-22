import React from 'react'
import { Checkbox } from 'flowbite-react';
import { useState } from 'react';
import { auth, db } from '../../pages/firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, getDocs, collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

function VehiclesForm({ nextStep, previousStep, selectedCategory }) {
    const [subcategory, setSubcategory] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [totalkm, setTotalkm] = useState('');
    const [price, setPrice] = useState('');
    const [negotiable, setNegotiable] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [adName, setAdName] = useState('');

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [documentId, setDocumentId] = useState('');
    const [collectionId, setCollectionId] = useState('');
    const [images, setImages] = useState(Array(6).fill(null));
    const [imageLoadings, setImageLoadings] = useState(Array(6).fill(false));

    const navigate = useNavigate();

    const handleSubcategoryChange = (event) => {
        const selectedSubcategory = event.target.value;
        setSubcategory(selectedSubcategory);

        switch (selectedSubcategory) {
            case 'Bike':
                setBrandOptions(['Harley Davidson', 'Yamaha', 'Honda', 'Suzuki']);
                break;
            case 'Cars':
                setBrandOptions(['Toyota', 'Ford', 'Honda', 'Chevrolet']);
                break;
            case 'Scooty':
                setBrandOptions(['Vespa', 'TVS', 'Honda', 'Hero']);
                break;
            default:
                setBrandOptions([]);
                break;
        }
    };

    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;
        setBrand(event.target.value);
    };

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleNegotiableChange = (event) => {
        setNegotiable(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAdNameChange = (event) => {
        setAdName(event.target.value);
    };
    const handletotalKmChange = (event) => {
        setTotalkm(event.target.value);
    };

    const handleAddTag = () => {
        if (tags.length < 5 && newTag.trim() !== '') {
            setTags(prevTags => [...prevTags, newTag.trim()]);
            setNewTag('');
        }
    };


    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageChange = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            setImageLoadings(prev => prev.map((loading, idx) => idx === index ? true : loading));

            const storage = getStorage();
            const storageRef = ref(storage, `AdImages/${file.name}`);

            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);

                setImages(prevImages => {
                    const newImages = [...prevImages];
                    newImages[index] = downloadURL;
                    return newImages;
                });
                setImageLoadings(prev => prev.map((loading, idx) => idx === index ? false : loading));
            } catch (error) {
                console.error('Error uploading image:', error);
                setImageLoadings(prev => prev.map((loading, idx) => idx === index ? false : loading));
            }
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
    };

    const handlePreviousClick = async (event) => {
        previousStep();
    };

    if (!selectedCategory) {
        throw new Error('Category is required.');
    }

    const handleNextClick = async (event) => {
        event.preventDefault();
        try {
            if (!subcategory || !brand || !model || !adName || !price || !negotiable || !description) {
                setError('All fields are required.');
                return;
            }

            setIsSubmitting(true);
            const userId = auth.currentUser.uid
            if (!userId) {
                throw new Error('User ID not found.');
            }



            const categoryRef = doc(db, 'categories', selectedCategory);
            const adsCollectionRef = collection(categoryRef, 'ads');
            const vehicleDocRef = await addDoc(adsCollectionRef, {
                selectedCategory,
                userId,
                subcategory,
                brand,
                model,
                adName,
                tags,
                description,
                price,
                totalkm,
                negotiable,
                images: images.filter(image => image !== null),
                timestamp: serverTimestamp(),
            });

            setIsSubmitting(false);
            setError('');
            console.log("Form data submitted successfully :", vehicleDocRef.id);

            const collectionId = adsCollectionRef.id;
            const docId = vehicleDocRef.id;
            setCollectionId(collectionId);
            setDocumentId(docId);



            nextStep(selectedCategory, collectionId, docId);

        } catch (error) {
            setIsSubmitting(false);
            console.error("Error adding form data to Firestore: ", error);
            setError('Error submitting form. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={''} className="flex flex-col w-full gap-y-4 mt-6">
                {/* Form fields and controls */}
                <label className='w-full'>
                    <p className='text-sm text-gray-800 mb-1'>
                        Ad Name <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        value={adName}
                        onChange={handleAdNameChange}
                        placeholder="Enter Ad Name"
                        className='rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2'
                    />
                </label>

                <label className='w-full relative'>
                    <p className='text-sm text-gray-800 mb-1'>
                        Sub-Category <sup className='text-pink-200'>*</sup>
                    </p>
                    <select
                        required
                        value={subcategory}
                        onChange={handleSubcategoryChange}
                        className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                    >
                        <option value="">Select</option>
                        <option value="Bike">Bike</option>
                        <option value="Cars">Cars</option>
                        <option value="Scooty">Scooty</option>
                    </select>
                </label>

                <div className='grid grid-cols-2 gap-4'>
                    <label className='w-full'>
                        <p className='text-sm text-gray-800 mb-1'>
                            Brand <sup className='text-pink-200'>*</sup>
                        </p>
                        <select
                            required
                            value={brand}
                            onChange={handleBrandChange}
                            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                        >
                            <option value="">Select</option>
                            {brandOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>

                    <label className='w-full'>
                        <p className='text-sm text-gray-800 mb-1'>
                            Model <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            value={model}
                            onChange={handleModelChange}
                            placeholder="Enter model"
                            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                        />
                    </label>
                </div>

                <div className='flex flex-row gap-4'>
                    <label className='w-full'>
                        <p className='text-sm text-gray-800 mb-1'>
                            Price (INR) <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder="Enter price"
                            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='text-sm text-gray-800 mb-1'>
                            Kilometer Traveled <sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="number"
                            value={totalkm}
                            onChange={handletotalKmChange}
                            placeholder="Enter Total Kilometer"
                            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='text-sm text-gray-800 mb-1'>
                            Negotiable <sup className='text-pink-200'>*</sup>
                        </p>
                        <select
                            required
                            value={negotiable}
                            onChange={handleNegotiableChange}
                            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                </div>

                <label className='w-full'>
                    <p className='text-sm text-gray-800 mb-1'>
                        Description <sup className='text-pink-200'>*</sup>
                    </p>
                    <textarea
                        required
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description"
                        className='bg-gray-100 rounded-md text-gray-800 w-full h-32 px-4 py-2'
                    />
                </label>

                <label className='w-full'>
                    <p className='text-sm text-gray-800 mb-1'>
                        Tags <sup className='text-pink-200'>*</sup>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <div key={index} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                                <span>{tag}</span>
                                <button onClick={() => handleRemoveTag(tag)} type="button" className="ml-2 text-red-500">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add new tag"
                            className='bg-gray-100 rounded-md text-gray-800 px-4 py-2 flex-grow'
                        />
                        <button onClick={handleAddTag} type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                            Add
                        </button
                        ></div>
                </label>
                <hr></hr>


                <lable>Add Images</lable>
                {/* <div className="flex flex-wrap gap-4">
                    {[...Array(6)].map((_, index) => (
                        <label key={index} className="w-1/2 sm:w-1/3">
                            <p className="text-sm text-gray-800 mb-1">Image {index + 1}:</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, index)}
                                className="bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2"
                            />
                            {images[index] && (
                                <img src={images[index]} alt={`Preview ${index + 1}`} className="mt-2 w-full h-auto object-cover" />
                            )}
                        </label>
                    ))}
                </div> */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="relative overflow-hidden bg-gray-100 rounded-md text-gray-800">
                            <div className="h-40 aspect-w-1 aspect-h-1 relative">
                                {images[index] && (
                                    <div>
                                        <img src={images[index]} alt={`Preview ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                                        <button onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 text-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                {!images[index] && (
                                    <>
                                        <div className="flex justify-center items-center h-full">
                                            <span className="text-5xl text-gray-400">+</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, index)}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                    </>
                                )}
                                {imageLoadings[index] && (
                                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-8 w-8"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>


                <hr></hr>

                <div className='flex flex-col-reverse sm:flex-row justify-between items-baseline'>
                    
                    <div className='flex sm:flex-row gap-4'>
                        <button onClick={handlePreviousClick} className='border-4 rounded-md text-gray-800 h-14 w-36 sm:w-40 font-semibold py-2 mt-6'>
                            previous
                        </button>
                        <button
                            onClick={handleNextClick}
                            className="border-4 bg-green-500 rounded-md text-gray-800 h-14 w-36 sm:w-40 font-semibold py-2 mt-6"
                        >
                            Next →
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md">
                            <p className="text-red-500">{error}</p>
                            <button onClick={() => setError('')} className="text-blue-500 underline mt-2">Close</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default VehiclesForm;
