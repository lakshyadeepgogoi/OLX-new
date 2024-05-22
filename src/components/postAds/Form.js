import React from 'react'

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
import SparepartsForm from './SparepartsForm';
import FurnituresForm from './FurnituresForm';
import FashionForm from './FashionForm';
import BooksStatiForm from './BooksStatiForm';
import SportsgymsForm from './SportsgymsForm';
import ServicesForm from './ServicesForm';
import VacanciesForm from './VacanciesForm';
import PetsForm from './PetsForm';

import mobileIcon from "../../assets/gadgets.png"
import electronicIcon from "../../assets/electronics.png"
import vehicleIcon from "../../assets/eco-car.png"
import propertyIcon from "../../assets/assets.png"
import sparepartsIcon from "../../assets/spare-parts.png"
import furnitureIcon from "../../assets/furniture.png"
import fashionIcon from "../../assets/fashion.png"
import bookIcon from "../../assets/stationery.png"
import sportsIcon from "../../assets/gym.png"
import servicesIcon from "../../assets/customer-service.png"
import jobForm from '../../assets/promotion.png'
import petForm from "../../assets/dog.png"
import { AiOutlineCheckCircle } from 'react-icons/ai';


function Form() {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [docId, setDocId] = useState(null);
    const [collectionId, setCollectionId] = useState(null);


    const handleNextStep = (selectedCategory, collectionId, docId) => {
        setDocId(docId);
        setCollectionId(collectionId);
        setStep(3);
        console.log('Selected Category:', selectedCategory); // Corrected log statement
        console.log("docId:", docId);
        console.log("collectionId:", collectionId);
    };


    const handlePreviousStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const categoryForms = {
        Mobiles: MobilesForm,
        Electronics: ElectronicsForm,
        Vehicles: VehiclesForm,
        Properties: PropertiesForm,
        Spare_Parts: SparepartsForm,
        Furnitures: FurnituresForm,
        Fashion: FashionForm,
        BooksStati: BooksStatiForm,
        Sports_Gyms: SportsgymsForm,
        Services: ServicesForm,
        Vacancies: VacanciesForm,
        Pets: PetsForm
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
                <div className="flex items-center justify-center w-12 h-12 border rounded-full bg-white"
                    style={{ borderColor: isActive || isCompleted ? '#3182ce' : '#cbd5e0' }}>
                    {isCompleted ? <AiOutlineCheckCircle className="w-6 h-6 text-blue-600" /> : number}
                </div>
                <div className="mt-2 sm:mt-0">
                    <h3 className="font-medium text-lg">{title}</h3>
                    <p className="text-sm">{details}</p>
                </div>
            </div>
        );
    };



    return (
        <div className='sm:w-2/3 h-max shadow-xl m-auto my-8 p-6'>
            <div className="flex items-center justify-evenly space-x-8 py-8 w-full h-44 sm:h-28 border-b-2 ">
                {renderStep(1, 'Step 01', 'Choose Category')}
                {renderStep(2, 'Step 02', 'Fill Out Form')}
                {renderStep(3, 'Step 03', 'Review Contact & Submit')}
            </div>

            {step === 1 && (
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <CategoryCard iconSrc={mobileIcon} title="Phones & Gadgets" ads="69,580" onClick={() => handleCategoryClick('Mobiles')} />
                    <CategoryCard iconSrc={electronicIcon} title="Electronics & Appliances" ads="69,580" onClick={() => handleCategoryClick('Electronics')} />
                    <CategoryCard iconSrc={vehicleIcon} title="Vehicles" ads="69,580" onClick={() => handleCategoryClick('Vehicles')} />
                    <CategoryCard iconSrc={propertyIcon} title="Properties" ads="69,580" onClick={() => handleCategoryClick('Properties')} />

                    <CategoryCard iconSrc={sparepartsIcon} title="Spare Parts" ads="69,580" onClick={() => handleCategoryClick('Spare_Parts')} />
                    <CategoryCard iconSrc={furnitureIcon} title="Furnitures" ads="69,580" onClick={() => handleCategoryClick('Furnitures')} />
                    <CategoryCard iconSrc={fashionIcon} title="Fashion & Clothing" ads="69,580" onClick={() => handleCategoryClick('Fashion')} />
                    <CategoryCard iconSrc={bookIcon} title="Books & Stationery" ads="69,580" onClick={() => handleCategoryClick('BooksStati')} />


                    <CategoryCard iconSrc={sportsIcon} title="Sports & Gyms" ads="69,580" onClick={() => handleCategoryClick('Sports_Gyms')} />



                    <CategoryCard iconSrc={servicesIcon} title="Services" ads="69,580" onClick={() => handleCategoryClick('Services')} />
                    <CategoryCard iconSrc={jobForm} title="Vacancies" ads="69,580" onClick={() => handleCategoryClick('Vacancies')} />
                    <CategoryCard iconSrc={petForm} title="Pets" ads="69,580" onClick={() => handleCategoryClick('Pets')} />


                </div>
            )}

            {step === 2 && selectedCategory && (
                <div>
                    {categoryForms[selectedCategory] === MobilesForm && <MobilesForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === ElectronicsForm && <ElectronicsForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === VehiclesForm && <VehiclesForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === PropertiesForm && <PropertiesForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === SparepartsForm && <SparepartsForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === FurnituresForm && <FurnituresForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === FashionForm && <FashionForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === BooksStatiForm && <BooksStatiForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === SportsgymsForm && <SportsgymsForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === ServicesForm && <ServicesForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === VacanciesForm && <VacanciesForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {categoryForms[selectedCategory] === PetsForm && <PetsForm nextStep={handleNextStep} previousStep={handlePreviousStep} selectedCategory={selectedCategory} />}
                    {/* Add more forms here */}
                </div>
            )}

            {step === 3 && collectionId && <ContactUser selectedCategory={selectedCategory} collectionId={collectionId} docId={docId} />}
        </div>
    );
}

export default Form;