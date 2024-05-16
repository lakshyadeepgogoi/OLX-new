import React from "react";
// import AllCards from '../components/AllCards.js';
import { FaLaptop, FaMobileAlt, FaPhone, FaDesktop, FaHeadphones } from 'react-icons/fa';
import { IoWatchOutline } from "react-icons/io5";
import { FaTabletScreenButton } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";
import SportsAdCards from "../../components/NavAds/SportsAdCards";

function SpareParts(){
    return(
        <div>
            {/* <div className="grid grid-cols-4 justify-center w-11/12 m-auto gap-2 mb-4 ">
                <SubCategoryCard icon={<FaLaptop />} name="Refrigerators" />
                <SubCategoryCard icon={<FaMobileAlt />} name="AC" />
                <SubCategoryCard icon={<FaTabletScreenButton />} name="Washing Machines" />
                <SubCategoryCard icon={<FaDesktop />} name="Cooler" />
                <SubCategoryCard icon={<IoWatchOutline />} name="Geyser" />
                <SubCategoryCard icon={<FaHeadphones />} name="Fans & Bulbs" />
                <SubCategoryCard icon={<GoCpu />} name="Kitchen Appliances" />
                <SubCategoryCard icon={<FaHeadphones />} name="Others" />

            </div> */}
            <div className="my-6">
                <SportsAdCards/>
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

export default SpareParts;
