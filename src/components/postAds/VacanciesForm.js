import React from 'react'
import { Checkbox } from 'flowbite-react';
import { useState } from 'react';
import { auth, db } from '../../pages/firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, getDocs, collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

function VacanciesForm({ nextStep, previousStep, selectedCategory }) {

  const [category, setCategory] = useState('');
  const [saleryPeriod, setSaleryPeriod] = useState('');
  const [positionType, setPositionType] = useState('');

  const [subcategory, setSubcategory] = useState('');
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [negotiable, setNegotiable] = useState('');


  const [salery, setSalery] = useState('');
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

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    switch (selectedCategory) {

      case 'Data entry & Back office':
        setSubcategoryOptions(['Data entry & Back office']);
        break;
      case 'Sales & Marketing':
        setSubcategoryOptions(['Sales & Marketing']);
        break;
      case 'BPO & Telecaller':
        setSubcategoryOptions(['BPO & Telecaller']);
        break;
      case 'Driver':
        setSubcategoryOptions(['Driver']);
        break;
      case 'Office Assistant':
        setSubcategoryOptions(['Office Assistant']);
        break;
      case 'Teacher':
        setSubcategoryOptions(['Teacher']);
        break;
      case 'Delivery & Collection':
        setSubcategoryOptions(['Delivery & Collection']);
        break;
      case 'Cook':
        setSubcategoryOptions(['Cook']);
        break;
      case 'Receptionist & Front office':
        setSubcategoryOptions(['Receptionist & Front office']);
        break;
      case 'Operator & Technician':
        setSubcategoryOptions(['Operator & Technician']);
        break;
      case 'IT Engineer & Developer':
        setSubcategoryOptions(['IT Engineer & Developer']);
        break;
      case 'Hotel & Travel Executive':
        setSubcategoryOptions(['Hotel & Travel Executive']);
        break;


      default:
        setSubcategoryOptions([]);
        break;
    }
  };



  // const handleBrandChange = (event) => {
  //     const selectedSubcategory = event.target.value;
  //     setSubcategory(selectedSubcategory);
  // };

  const handleSaleryChange = (event) => {
    const saleryValue = event.target.value;
    setSalery(saleryValue);
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
      if (!category || !adName || !salery || !negotiable || !description || !saleryPeriod || !positionType) {
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
      const vacanciesDocRef = await addDoc(adsCollectionRef, {
        selectedCategory,
        userId,
        category,
        subcategory,
        saleryPeriod,
        positionType,

        adName,
        tags,
        description,
        salery,
        negotiable,
        images: images.filter(image => image !== null),
        timestamp: serverTimestamp(),
      });

      setIsSubmitting(false);
      setError('');
      console.log("Form data submitted successfully:");

      const collectionId = adsCollectionRef.id;
      const docId = vacanciesDocRef.id;
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
            Category <sup className='text-pink-200'>*</sup>
          </p>
          <select
            required
            value={category}
            onChange={handleCategoryChange}
            className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
          >
            <option value="">Select</option>
            <option value="Data entry & Back office">Data entry & Back office</option>
            <option value="Data entry & Back office">Data entry & Back office</option>
            <option value="Sales & Marketing">Sales & Marketing</option>
            <option value="BPO & Telecaller">BPO & Telecaller</option>
            <option value="Driver">Driver</option>
            <option value="Office Assistant">Office Assistant</option>
            <option value="Teacher">Teacher</option>
            <option value="Delivery & Collection">Delivery & Collection</option>
            <option value="Cook">Cook</option>
            <option value="Receptionist & Front office">Receptionist & Front office</option>
            <option value="Operator & Technician">Operator & Technician</option>
            <option value="IT Engineer & Developer">IT Engineer & Developer</option>
            <option value="Hotel & Travel Executive">Hotel & Travel Executive</option>


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
              Salery Period <sup className='text-pink-200'>*</sup>
            </p>
            <select
              required
              value={saleryPeriod}
              onChange={(e) => setSaleryPeriod(e.target.value)}
              className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
            >
              <option value="">Select</option>
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </label>


          <label className='w-full'>
            <p className='text-sm text-gray-800 mb-1'>
              Position Type
            </p>
            <select
              value={positionType}
              onChange={(e) => setPositionType(e.target.value)}
              className='bg-gray-100 rounded-md text-gray-800 w-full px-4 py-2'
            >
              <option value="Contract">Contract</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Tempory">Tempory</option>
            </select>
          </label>
        </div>




        <div className='flex flex-row gap-4'>
          <label className='w-full'>
            <p className='text-sm text-gray-800 mb-1'>
              Salery (INR) <sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type="number"
              value={salery}
              onChange={handleSaleryChange}
              placeholder="Enter Salery Given"
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
              Previous
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
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center items-center gap-4">
              <p className="text-red-600 font-semibold text-center">{error}</p>
              <button onClick={() => setError('')} className="text-white font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-6 py-3 transition duration-300 ease-in-out">Close</button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default VacanciesForm