import React from 'react'
import { Checkbox } from 'flowbite-react';
import { useState } from 'react';
import { auth, db } from '../../pages/firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, getDocs, collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

function MobilesForm({ nextStep, previousStep, selectedCategory }) {
    const [subcategory, setSubcategory] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [brand, setBrand] = useState('');
    const [negotiable, setNegotiable] = useState('');
    const [model, setModel] = useState('');
    const [modelOptions, setModelOptions] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [adName, setAdName] = useState('');

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [documentId, setDocumentId] = useState('');
    const [collectionId, setCollectionId] = useState('');
    const [images, setImages] = useState(Array(6).fill(null));


    const navigate = useNavigate();

    const handleSubcategoryChange = (event) => {
        const selectedSubcategory = event.target.value;
        setSubcategory(selectedSubcategory);
        // Set brand options based on selected subcategory
        switch (selectedSubcategory) {
            case 'Phone':
                setBrandOptions(['Apple', 'Google Pixel', 'Samsung', 'Redmi', 'Vivo', 'Oppo', 'Nokia']);
                break;
            case 'Tablet':
                setBrandOptions(['Lenovo', 'Apple Ipad', 'Redmi', 'Samsung']);
                break;
            case 'Laptop':
                setBrandOptions(['Dell', 'Asus', 'Macbook', 'Hp']);
                break;
            case 'Smart Watch':
                setBrandOptions(['Dell', 'Asus', 'Macbook', 'Hp']);
                break;
            case 'Earbuds':
                setBrandOptions(['Boat', 'Mivi', 'Apple', 'One Plus']);
                break;
            default:
                setBrandOptions([]);
                break;
        }
    };

    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;
        setBrand(selectedBrand);


        setModel('');
        switch (selectedBrand) {
            case 'Apple':
                setModelOptions(['iPhone 13', 'iPhone 12', 'iPhone SE']);
                break;
            case 'Samsung':
                setModelOptions(['Galaxy S21', 'Galaxy Note 20', 'Galaxy A52']);
                break;


            default:
                setModelOptions([]);
                break;
        }
    };

    const handleModelChange = (event) => {
        const selectedModel = event.target.value;
        setModel(selectedModel);
    };

    const handleNegotiableChange = (event) => {
        const selectedNegotiable = event.target.value;
        setNegotiable(selectedNegotiable);
    };
    const handlePriceChange = (event) => {
        const priceValue = event.target.value;
        setPrice(priceValue);
    };

    const handleDescriptionChange = (event) => {
        const descriptionValue = event.target.value;
        setDescription(descriptionValue);
    };
    const handleAddTag = () => {
        if (tags.length < 5 && newTag.trim() !== '') {
            setTags(prevTags => [...prevTags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };




    const handleadNameChange = (event) => {
        const adNameValue = event.target.value;
        setAdName(adNameValue);
    };

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImages(prevImages => {
                const newImages = [...prevImages];
                newImages[index] = newImageUrl;
                return newImages;
            });
        }
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

            const mobileDocRef = await addDoc(adsCollectionRef, {
                userId,
                subcategory,
                brand,
                model,
                adName,
                tags,
                description,
                price,
                negotiable,
                images: images.filter(image => image !== null),
                timestamp: serverTimestamp(),
            });
            setIsSubmitting(false);
            setError('');
            console.log("Form data submitted successfully:");

            const collectionId = 'category';
            const docId = selectedCategory;
            setCollectionId(collectionId);
            setDocumentId(docId);

            // Proceed to the next step
            nextStep(selectedCategory,collectionId, docId);
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error adding form data to Firestore:", error);
            setError('Error submitting form. Please try again.');
        }
    };





    return (
        <div>
            <form onSubmit={''} className="flex flex-col w-full gap-y-4 mt-6">


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
                        <option value="Phone">Phone</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Smart Watch">Smart Watch</option>
                        <option value="Earbuds">Earbuds</option>


                    </select>
                </label>

                <label className='w-full'>
                    <p className='text-sm text-gray-800 mb-1'>
                        Ads Name <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        value={adName}
                        onChange={handleadNameChange}
                        placeholder="Enter Ad Name"
                        name="adName"
                        className=' rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2' />
                </label>
                {/* section 2  */}
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
                            {brandOptions.map((brandOption, index) => (
                                <option key={index} value={brandOption}>{brandOption}</option>
                            ))}
                        </select>
                    </label>

                    <label className='w-full'>
                        <p className='text-sm text-gray-800 mb-1'>
                            Model <sup className='text-pink-200'>*</sup>
                        </p>
                        <select
                            required
                            value={model}
                            onChange={handleModelChange}
                            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                        >
                            <option value="">Select</option>
                            {modelOptions.map((modelOption, index) => (
                                <option key={index} value={modelOption}>{modelOption}</option>
                            ))}
                        </select>
                    </label>
                    {/* <label className='w-full'>
                    <p className='text-sm text-gray-800 mb-1'>
                    Conditions <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                    required
                    type={''}
                    value={''}
                    onChange={''}
                    placeholder="Select"
                    name="Conditions"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                </label>

                <label className='w-full '>
                    <p className='text-sm text-gray-800 mb-1'>
                    Authenticityy <sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                    required
                    type={''}
                    value={''}
                    onChange={''}
                    placeholder="Select"
                    name="Authenticity"
                    className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'/>
                </label> */}
                </div>

                <label className='w-full'>
                    <p className='text-sm text-gray-800 mb-1'>
                        Tags <sup className='text-pink-200'>*</sup>
                    </p>
                    <div className="flex flex-wrap gap-2 ">
                        {tags.map((tag, index) => (
                            <div key={index} className="flex items-center w-fit bg-gray-200 px-2 py-1 rounded ">
                                <span>{tag}</span>
                                <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500 w-fit">
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
                            placeholder="Enter a new tag"
                            className='bg-gray-100 rounded-md text-gray-800 px-4 py-2 flex-grow'
                        />
                        <button onClick={handleAddTag} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Add</button>
                    </div>
                </label>
                {/* price and negotiable */}

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
                            name="price"
                            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
                        />
                    </label>
                    <label className='w-full '>
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
                <label className='w-full '>
                    <p className='text-sm text-gray-800 mb-1'>
                        Description <sup className='text-pink-200'>*</sup>
                    </p>
                    <textarea
                        required
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description"
                        name="description"
                        className='bg-gray-100 rounded-md text-gray-800 w-full h-32 px-4 py-2'
                    />
                </label>

                <hr></hr>


                <lable>Add Images</lable>

                <div className="flex flex-wrap gap-4">
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
                                <img src={images[index]} alt={`Preview ${index + 1}`} className="mt-2 w-full h-auto object-cover"/>
                            )}
                        </label>
                    ))}
                </div>
                <hr></hr>






                <div className='flex  flex-col-reverse sm:flex-row justify-between items-baseline'>
                    <p className='text-[#636A80]'> <Checkbox className='m-2'></Checkbox>Save my contact information for faster posting</p>
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
            </form>
            {error && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p className="text-red-500">{error}</p>
                        <button onClick={() => setError('')} className="text-blue-500 underline mt-2">Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MobilesForm