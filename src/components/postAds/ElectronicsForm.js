import React, { useState } from 'react';
import { Checkbox } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../pages/firebase';  // Make sure this path is correct for your Firebase setup
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ElectronicsForm({ nextStep }) {
    const [subcategory, setSubcategory] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [negotiable, setNegotiable] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [adName, setAdName] = useState('');

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [collectionId, setCollectionId] = useState('');
    const [documentId, setDocumentId] = useState('');

    const navigate = useNavigate();

    const handleSubcategoryChange = (event) => {
        const selectedSubcategory = event.target.value;
        setSubcategory(selectedSubcategory);
        switch (selectedSubcategory) {
            
                    
            case 'Television':
                setBrandOptions(['LG', 'Sony', 'Samsung', 'Panasonic']);
                break;
                case 'Washing Machine':
                setBrandOptions(['LG', 'Whirpool', 'TATA', 'Samsung']);
                break;
            case 'Refrigerator':
                setBrandOptions(['LG', 'Whirpool', 'TATA', 'Samsung']);
                break;
            case 'Mixer Grinder':
                    setBrandOptions(['LG', 'Prestige', 'Bajaj', 'Pigeon']);
                    break;
            case 'Camera':
                    setBrandOptions(['Canon', 'Nikon', 'Sony', 'Panasonic']);
                    break;
            default:
                setBrandOptions([]);
                break;
        }
    };

    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;
        setBrand(selectedBrand);
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

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag) && tags.length < 5) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!subcategory || !brand || !model || !adName || !price || !negotiable || !description) {
            setError('All fields are required.');
            return;
        }

        setIsSubmitting(true);

        try {
            const electronicsCollection = collection(db, "electronics");
            const electronicsDocRef = await addDoc(electronicsCollection, {
                subcategory,
                brand,
                model,
                adName,
                tags,
                description,
                price,
                negotiable,
                timestamp: serverTimestamp(),
            });

            setIsSubmitting(false);
            setError('');
            console.log("Form data submitted successfully :", electronicsDocRef.id);
    
            const docId = electronicsDocRef.id;
            const collectionId = electronicsCollection.id;
    
            setCollectionId(collectionId);
            setDocumentId(docId);
            
            
            nextStep(collectionId, docId);

        } catch (error) {
            setIsSubmitting(false);
            console.error("Error adding form data to Firestore: ", error);
            setError('Error submitting form. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-y-4 mt-6">
               
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
                        <option value="Laptop">Laptop</option>
                        <option value="Camera">Camera</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Television">Television</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </label>

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
                            onChange={(e) => setModel(e.target.value)}
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
                        </button>
                    </div>
                </label>

                <div className='flex flex-col-reverse sm:flex-row justify-between items-baseline'>
                    <p className='text-[#636A80]'> <Checkbox className='m-2'></Checkbox>Save my contact information for faster posting</p>
                    <div className='flex sm:flex-row gap-4'>
                        <button type="button" className='border-4 rounded-md text-gray-800 h-14 w-36 sm:w-40 font-semibold py-2 mt-6'>
                            Previous
                        </button>
                        <button
                            onClick={handleSubmit}
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

export default ElectronicsForm;
