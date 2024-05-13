import React from 'react';
// import house from "../assets/house.png";
import Cards from '../components/Cards';
import { FaArrowRight } from 'react-icons/fa';
import { CiMobile1 } from "react-icons/ci";
import { CiMonitor } from "react-icons/ci";
import { FaCarAlt } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaHouse } from "react-icons/fa6";
import { PiHandshake } from "react-icons/pi";
import { PiGraduationCapDuotone } from "react-icons/pi";

import { IoMdPeople } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { TbSofa } from "react-icons/tb";
import { PiPants } from "react-icons/pi";
import { PiBooksLight } from "react-icons/pi";
import { MdOutlineSportsBaseball } from "react-icons/md";
import { PiDog } from "react-icons/pi";

import { FaBox } from "react-icons/fa";
import phoneimg from "../assets/phoneimg.png"
import { FaGooglePlay } from "react-icons/fa";
import { GrApple } from "react-icons/gr";
import { motion } from 'framer-motion';
import AdsCard from '../components/MobileadsCard';


import mobileIcon from "../assets/gadgets.png"
import electronicIcon from "../assets/electronics.png"
import vehicleIcon from "../assets/eco-car.png"
import propertyIcon from "../assets/assets.png"
import sparepartsIcon from "../assets/spare-parts.png"
import furnitureIcon from "../assets/furniture.png"
import fashionIcon from "../assets/fashion.png"
import bookIcon from "../assets/stationery.png"
import sportsIcon from "../assets/gym.png"
import servicesIcon from "../assets/customer-service.png"
import jobForm from '../assets/promotion.png'
import petForm from "../assets/dog.png"

// Reusable CategoryCard Component
function CategoryCard({ iconSrc, title, ads }) {
  const [hover, setHover] = React.useState(false); // Local state for hover effect

  return (
    <div className="category-card flex flex-col items-center justify-center bg-white rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg p-6"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className={`rounded-full bg-[#E8F7FF] ${hover ? 'bg-green-600 shadow-lg shadow-gray-600' : ''} p-4`}>
      <img src={iconSrc} alt="Category Icon" className="w-12 h-12" />
      </div>
      <p className="mt-4 text-center text-lg font-medium text-gray-800">{title}</p>
      {
        hover
          ? <span className="text-center text-green-600 cursor-pointer hover:underline">View Ads →</span>
          : <p className="text-center text-gray-600">{ads} Ads</p>
      }
    </div>
  );
}



const Home = ({ isLoggedIn }) => {
  return (
    <div className='flex flex-col'>

      {/* First section */}
      <div className='w-full border h-[500px] p-8 lg:p-20  flex items-center justify-center relative'
        style={{ backgroundImage: 'linear-gradient(to right bottom, #777777, #65656a, #53535d, #414351, #2f3345, #262d40, #1b273b, #102136, #0c2136, #072235, #032234, #002233)' }}>
        <div className='lg:ml-8 max-w-container'>
          <motion.p
            className='text-sm lg:text-base mb-4 text-white font-inter flex justify-center w-[289px] mx-auto bg-green-600 rounded-lg p-3'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            OVER 95,00,000 LIVE ADS
          </motion.p>
          <motion.h1
            className='text-3xl lg:text-5xl font-semibold mb-1 font-inter flex justify-center text-center text-white'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Buy, Sell & Find <br></br>Just About Anything & Everything
          </motion.h1>

          <div className='flex items-stretch w-full mt-4'>

            {/* Input, Search */}
            <div className='flex flex-wrap w-full'>
              <input
                type='text'
                placeholder='Search in All Categories'
                className='py-2 px-4 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none flex-grow font-inter bg-transparent'
              />
              <button
                className='bg-green-600 text-white py-2 px-4  rounded-r-lg border border-l-0 border-gray-300 hover:bg-blue-600 transition duration-300 font-inter '
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className='text-2xl font-semibold mt-12 mb-4 text-center'>Fresh Ads</h1>
      <AdsCard/>



      {/* Second Section */}
      <div className='mt-8 w-full px-4 md:w-6/12 lg:w-8/12 xl:w-10/12 mx-auto '>
        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <h2 className="text-2xl font-semibold m-4 col-span-full font-inter text-center">Fresh recommended Ads </h2>
          {/* <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards /> */}
          {/* <AdsCard/> */}
        </div>

        <motion.a
          href="/all-ads"
          className="mt-10 mx-auto mb-4 w-[120px] text-center bg-green-600 text-white p-2 rounded-md flex justify-center items-center gap-2 font-inter text-sm md:text-base shadow-md"
          whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }} // blue-600 equivalent in Tailwind CSS
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <span>View All</span>
          <FaArrowRight className="text-sm" />
        </motion.a>


      </div>

      {/* Third section */}
      <div className='m-8 w-full px-4 md:w-6/12 lg:w-8/12 xl:w-10/12 mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          <h2 className="text-2xl font-semibold m-4 col-span-full font-inter text-center tracking-wide">Popular Categories</h2>
          {/* Categories */}
          <CategoryCard iconSrc={mobileIcon}  title="Phones & Gadgets" ads="69,580" />
          <CategoryCard iconSrc={electronicIcon} title="Electronics & Appliances" ads="69,580" />
          <CategoryCard iconSrc={vehicleIcon} title="Vehicles" ads="69,580" />
          <CategoryCard iconSrc={propertyIcon} title="Properties" ads="69,580" />
          <CategoryCard iconSrc={sparepartsIcon} title="Spare Parts" ads="69,580" />
          <CategoryCard iconSrc={furnitureIcon} title="Furnitures" ads="69,580" />
          <CategoryCard iconSrc={fashionIcon}  title="Fashion & Clothings" ads="69,580" />
          <CategoryCard iconSrc={bookIcon} title="Books & Stationery" ads="69,580" />
          <CategoryCard iconSrc={sportsIcon}  title="Sports & Gyms" ads="69,580" />

          <CategoryCard iconSrc={servicesIcon}title="Services" ads="69,580" />

          <CategoryCard iconSrc={jobForm} title="Vacancies" ads="69,580" />
          <CategoryCard iconSrc={petForm} title="Pets" ads="69,580" />

          {/* Repeat similar divs for other categories */}
        </div>
      </div>

      {/* fourth section  */}
      <div className='hidden md:block'>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[298px] mt-12 mb-12 " style={{ backgroundImage: 'radial-gradient(circle, #a1b8da, #7e9bcb, #5d7ebc, #3b62ab, #10479a)' }}>

          <div className="flex flex-row items-center justify-center gap-2 ">
            <FaBox className="text-4xl mb-2 text-green-400 " />
            <div className=''>
              <h1 className="text-2xl  font-inter text-gray-50 ">95,0k+</h1>
              <p className='font-inter text-sm'>Published Ads</p>
            </div>

          </div>
          <div className="flex flex-row items-center justify-center gap-2 ">
            <PiHandshake className="text-5xl mb-2 text-green-400 " />
            <div className=''>
              <h1 className="text-2xl  font-inter text-gray-50 ">361k+</h1>
              <p className='font-inter text-sm'>Verified User</p>
            </div>

          </div>
          <div className="flex flex-row items-center justify-center gap-2 ">
            <IoMdPeople className="text-5xl mb-2 text-green-400 " />
            <div className=''>
              <h1 className="text-2xl  font-inter text-gray-50 ">67k+</h1>
              <p className='font-inter text-sm'>Pro Members</p>
            </div>

          </div>
          <div className="flex flex-row items-center justify-center gap-2 ">
            <IoLocationOutline className="text-4xl mb-2 text-green-400 " />
            <div className=''>
              <h1 className="text-2xl  font-inter text-gray-50 ">150k+</h1>
              <p className='font-inter text-sm'>City Location</p>
            </div>

          </div>
        </div>
      </div>

      {/* fifth section */}
      <div className='hidden md:block'>

        <div className='mt-2 h-[450px] relative z-0 flex justify-between '>
          <div className='absolute -bottom-96 left-0 hidden md:block '>
            <img src={phoneimg} alt='phone' />
            <img src={phoneimg} alt='phone' className='absolute left-24 -bottom-20' />
          </div>

          <div className='absolute  w-[500px] flex flex-col right-36 mt-10 md:mx-auto'>
            <h1 className="text-2xl font-semibold mb-4 font-inter">Download our mobile app</h1>
            <p className="text-sm text-gray-700 font-inter">Sed luctus nibh at consectetur tempor. Proin et ipsum tincidunt, maximus turpis id, mollis lacus. Maecenas nec risus a urna sollicitudin aliquet. Maecenas pretium tristique sapien</p>

            <div className='flex gap-4 mt-5 cursor-pointer'>
              {/* Google Playstore Button */}
              <button className="flex items-center justify-center gap-2 bg-gray-100 text-black py-2 px-4 rounded-lg hover:bg-green-200 transition duration-300">
                <FaGooglePlay className="text-xl" />
                <div>
                  <p className="text-lg font-semibold cursor-pointer">Get it Now</p>
                  <p p className='cursor-pointer'>Google Play</p>
                </div>
              </button>

              {/* Apple Store Button */}
              <button className="flex items-center justify-center gap-2 bg-gray-100 text-black py-2 px-4 rounded-lg hover:bg-green-200 transition duration-300">
                <GrApple className="text-xl" />
                <div>
                  <p className="text-lg font-semibold cursor-pointer">Get it Now</p>
                  <p className='cursor-pointer'>App Store</p>
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>









    </div>
  );
};

export default Home;
