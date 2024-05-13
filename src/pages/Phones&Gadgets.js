import React from "react";
import MobileadsCard from '../components/MobileadsCard.js';
import { FaLaptop, FaMobileAlt, FaPhone, FaDesktop, FaHeadphones } from 'react-icons/fa';
import { IoWatchOutline } from "react-icons/io5";
import { FaTabletScreenButton } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";

function PhonesGadgets(){
    return(
        <div>
            <div className="grid grid-cols-4 justify-center w-11/12 m-auto gap-2 mb-4 ">
                <SubCategoryCard icon={<FaLaptop />} name="Laptops" />
                <SubCategoryCard icon={<FaMobileAlt />} name="Mobiles" />
                <SubCategoryCard icon={<FaTabletScreenButton />} name="Tablets" />
                <SubCategoryCard icon={<FaDesktop />} name="PCs" />
                <SubCategoryCard icon={<IoWatchOutline />} name="Smartwatches" />
                <SubCategoryCard icon={<FaHeadphones />} name="Headsets" />
                <SubCategoryCard icon={<GoCpu />} name="CPU & Accesories" />
                <SubCategoryCard icon={<FaHeadphones />} name="Headsets" />

            </div>
            <div>
                <MobileadsCard/>
            </div>
        </div>
    )
}

const SubCategoryCard = ({ icon, name }) => (
    <div className="p-4 bg-white rounded-md border-1 shadow-md border hover:bg-green-400  ">
        <div className="flex items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-200 mr-4">
                {icon }
            </div>
            <span className="text-lg font-bold">{name}</span>
        </div>
    </div>
);

export default PhonesGadgets;
