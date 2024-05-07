import React from 'react'
import { CiMobile1 } from "react-icons/ci";
import { CiMonitor } from "react-icons/ci";
import { FaCarAlt } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaHouse } from "react-icons/fa6";
import { PiBooksLight, PiDog, PiHandshake, PiPants } from "react-icons/pi";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { useState } from 'react';
import MobilesForm from './MobilesForm';
import ElectronicsForm from './ElectronicsForm';
import VehiclesForm from './VehiclesForm';
import PropertiesForm from './PropertiesForm';
// import Form_step2 from "./Form_step2"
import CategoryCard from "./CategoryCard"
import ContactUser from './ContactUser';
import { TbSofa } from 'react-icons/tb';
import { MdOutlineSportsBaseball } from 'react-icons/md';

function Form() {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [docId, setDocId] = useState(null);
    const [collectionId, setCollectionId] = useState(null);


    const handleNextStep = (collectionId, docId) => {
        setDocId(docId);
        setCollectionId(collectionId);
        setStep(3); 
    };
    
    const handlePreviousStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const categoryForms = {
        Mobiles: MobilesForm,
        Electronics: ElectronicsForm,
        Vehicles: VehiclesForm,
        Properties: PropertiesForm,
        // Map other categories to their forms here
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setStep(2); // Proceed to the form related to the category
    };
    

    const renderForm = () => {
        const FormComponent = categoryForms[selectedCategory];
        if (!FormComponent) return <p>No form available for this category</p>;
        return <FormComponent nextStep={() => setStep(3)} />;
    };

    const renderStep = (number, title, details) => {
        const isActive = number === step;
        const isCompleted = number < step;

        return (
            <div className={`flex flex-col sm:flex-row justify-center items-center ${isCompleted ? 'text-blue-600' : 'text-gray-500'} space-x-2.5`}>
                <span className="flex items-center justify-center w-14 h-14 border rounded-full"
                    style={{ borderColor: isActive || isCompleted ? '#3182ce' : '#cbd5e0', backgroundColor: isActive ? '#3182ce' : 'transparent' }}>
                    {isCompleted ? '✓' : number}
                </span>
                <div>
                    <h3 className="font-medium text-lg">{title}</h3>
                    <p className="text-sm">{details}</p>
                </div>
            </div>
        );
    };

    return (
        <div className='sm:w-2/3 h-max shadow-xl m-auto my-8 p-6'>
            <div className="flex items-center justify-evenly space-x-8 py-8 w-full h-44 sm:h-28 border-b-2">
                {renderStep(1, 'Step 01', 'Choose Category')}
                {renderStep(2, 'Step 02', 'Fill Out Form')}
                {renderStep(3, 'Step 03', 'Review Contact & Submit')}
            </div>

            {step === 1 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <CategoryCard Icon={CiMobile1} title="Phones & Gadgets" ads="69,580" onClick={() => handleCategoryClick('Mobiles')} />
                    <CategoryCard Icon={CiMonitor} title="Electronics & Appliances" ads="69,580" onClick={() => handleCategoryClick('Electronics')} />
                    <CategoryCard Icon={FaCarAlt} title="Vehicles" ads="69,580" onClick={() => handleCategoryClick('Vehicles')} />
                    <CategoryCard Icon={CiShop} title="Properties" ads="69,580" onClick={() => handleCategoryClick('Properties')} />
                    
                    <CategoryCard Icon={HiOutlineWrenchScrewdriver} title="Spare Parts" ads="69,580" onClick={() => handleCategoryClick('Spare Parts')} />
                    <CategoryCard Icon={TbSofa} title="Furnitures" ads="69,580" onClick={() => handleCategoryClick('Furnitures')} />
                    <CategoryCard Icon={PiPants} title="Fashion & Clothing" ads="69,580" onClick={() => handleCategoryClick('Fashion')} />
                    <CategoryCard Icon={PiBooksLight} title="Books & Stationery" ads="69,580" onClick={() => handleCategoryClick('Books & Stationery')} />


                    <CategoryCard Icon={MdOutlineSportsBaseball} title="Sports & Gyms" ads="69,580" onClick={() => handleCategoryClick('Sports & Gyms')} />

                    <CategoryCard Icon={PiBooksLight} title="Books & Stationery" ads="69,580" onClick={() => handleCategoryClick('Books & Stationery')} />

                    <CategoryCard Icon={PiHandshake} title="Services" ads="69,580" onClick={() => handleCategoryClick('Services')} />
                    <CategoryCard Icon={PiGraduationCapDuotone} title="Vacancies" ads="69,580" onClick={() => handleCategoryClick('Vacancies')} />
                    <CategoryCard Icon={PiDog} title="Pets" ads="69,580" onClick={() => handleCategoryClick('Pets')} />

                
                </div>
            )}

            {step === 2 && selectedCategory && (
                <div>
                    {categoryForms[selectedCategory] === MobilesForm && <MobilesForm nextStep={handleNextStep} previousStep={handlePreviousStep} />}
                    {categoryForms[selectedCategory] === ElectronicsForm && <ElectronicsForm nextStep={handleNextStep} />}
                    {categoryForms[selectedCategory] === VehiclesForm && <VehiclesForm nextStep={handleNextStep} />}
                    {categoryForms[selectedCategory] === PropertiesForm && <PropertiesForm nextStep={handleNextStep} />}
                    {/* Add more forms here */}
                </div>
            )}
            
            {step === 3 && collectionId && <ContactUser collectionId={collectionId} docId={docId}  />}
        </div>
    );
}

export default Form;
