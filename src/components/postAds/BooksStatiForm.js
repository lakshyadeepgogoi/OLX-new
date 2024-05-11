import React from 'react'
import { Checkbox } from 'flowbite-react';
import { useState } from 'react';
import { auth, db } from '../../pages/firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, getDocs, collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';





function BooksStatiForm({ nextStep, previousStep, selectedCategory }) {

  const [subcategory, setSubcategory] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    // const [brand, setBrand] = useState('');
    const [negotiable, setNegotiable] = useState('');
    const [age, setAge] = useState('');
    // const [modelOptions, setModelOptions] = useState([]);
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
    const [imageLoadings, setImageLoadings] = useState(Array(6).fill(false));




    const navigate = useNavigate();

    const handleSubcategoryChange = (event) => {
        const selectedSubcategory = event.target.value;
        setSubcategory(selectedSubcategory);
        switch (selectedSubcategory) {

            case 'Academic':
                setBrandOptions(['Academic']);
                break;
            case 'Magazine':
                setBrandOptions(['Magazine']);
                break;
            case 'Kids Book':
                setBrandOptions(['Kids Book']);
                break;
            case 'Comics':
                setBrandOptions(['Comics']);
                break;
            default:
                setBrandOptions([]);
                break;
        }
    };



    // const handleBrandChange = (event) => {
    //     const selectedBrand = event.target.value;
    //     setBrand(selectedBrand);
    // };

    const handlePriceChange = (event) => {
        const priceValue = event.target.value;
        setPrice(priceValue);
    };

    const handleNegotiableChange = (event) => {
        const selectedNegotiable = event.target.value;
        setNegotiable(selectedNegotiable);
    };

    const handleDescriptionChange = (event) => {
        const descriptionValue = event.target.value;
        setDescription(descriptionValue);
    };

    const handleadNameChange = (event) => {
        const adNameValue = event.target.value;
        setAdName(adNameValue);
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

    // const handleImageChange = async (e, index) => {
    //     const file = e.target.files[0];
    //     const storage = getStorage();
    //     const storageRef = ref(storage, `AdImages/${file.name}`);

    //     try {
    //         // Upload image to Firebase Storage
    //         await uploadBytes(storageRef, file);

    //         // Get download URL of the uploaded image
    //         const downloadURL = await getDownloadURL(storageRef);

    //         // Update images state with the new URL
    //         setImages(prevImages => {
    //             const newImages = [...prevImages];
    //             newImages[index] = downloadURL;
    //             return newImages;
    //         });
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }
    // };

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

    const handlePreviousClick = async (event) => {
        previousStep();
    };

    if (!selectedCategory) {
        throw new Error('Category is required.');
    }

    const handleNextClick = async (event) => {
        event.preventDefault();

        try {
            if (!subcategory || !age || !adName || !price || !negotiable || !description) {
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
            const booksDocRef = await addDoc(adsCollectionRef, {
                selectedCategory,
                userId,
                subcategory,
                age,
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

            const collectionId = adsCollectionRef.id;
            const docId = booksDocRef.id;
            setCollectionId(collectionId);
            setDocumentId(docId);



            nextStep(selectedCategory, collectionId, docId);

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
                <option value="Academic">Academic Books</option>
                <option value="Magazine">Magazine</option>
                <option value="Kids Book">Kids Book</option>
                <option value="Comics">Comics</option>
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
                onChange={handleadNameChange}
                placeholder="Enter Ad Name"
                className='rounded-md bg-gray-100 text-gray-800 w-full px-4 py-2'
            />
        </label>

        <div className='grid grid-cols-2 gap-4'>
        

            <label className='w-full'>
                <p className='text-sm text-gray-800 mb-1'>
                    Age of Item <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
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
                    {imageLoadings[index] && <div className="flex justify-center items-center">
                        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-8 w-8"></div>
                    </div>}
                    {!imageLoadings[index] && images[index] && (
                        <img src={images[index]} alt={`Preview ${index + 1}`} className="mt-2 w-full h-auto object-cover" />
                    )}
                </label>
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
  )
}

export default BooksStatiForm