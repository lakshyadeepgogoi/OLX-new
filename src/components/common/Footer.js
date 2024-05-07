import React from 'react';
import { useState } from 'react';
import { IoLogoTwitter } from "react-icons/io";
import { FaInstagram, FaYoutube, FaFacebookF, FaLinkedin, FaWhatsapp, FaApple, FaGooglePlay } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import logo from "../../assets/logoDark.jpeg";

function Footer() {
  const [isAppleHovered, setIsAppleHovered] = useState(false);
  const [isGooglePlayHovered, setIsGooglePlayHovered] = useState(false);
  return (
    <div className='z-10'>
      <div className='h-auto md:h-[36rem] w-full bg-[#191F33] flex flex-col m-auto mt-4  '>
        {/* Newsletter */}
        <div className='flex flex-col md:flex-row lg:h-40 md:h-52 w-4/5 justify-between my-2 mx-auto items-center gap-4'>
          <div className='flex flex-col gap-2 text-white w-full md:w-[36rem] pt-4 pb-4'>
            <h1 className='text-2xl font-inter'>Subscribe to our newsletter</h1>
            <p className='text-md text-gray-400 font-inter'>Vestibulum consectetur placerat tellus. Sed faucibus fermentum purus, at facilisis.</p>
          </div>
          <div className='flex flex-row bg-gray-800 rounded-lg h-16 w-full md:w-[36rem]'>
            <div className='flex items-center pl-4 space-x-2 flex-grow'>
              <MdOutlineEmail className='text-green-500 text-2xl' />
              <input
                placeholder='Email Address'
                className='w-full border-none bg-transparent outline-none text-white placeholder-gray-300 font-inter'
                type='email'
              />
            </div>
            <button className='bg-green-500 m-2 px-4 py-2 text-white rounded-md font-inter'>Subscribe</button>
          </div>
        </div>


        {/* Section divide line */}
        <div className='w-full bg-black h-1 mt-4'></div>

        {/* Middle section of footer*/}
        <div className='flex flex-col md:flex-row w-full text-gray-400 justify-evenly items-center bg-black h-full '>
          <div className='text-gray-400 flex flex-col gap-4  md:items-center lg:items-start font-inter mb-2'>
            <img src={logo} alt="Logo" className="w-32 h-full scale-110" loading="lazy" />
            <p className='text-sm'>4517 Washington Ave. Manchester, Kentucky 39495</p>
            <p className='text-sm'>Phone: (405) 555-0128</p>
            <p className='text-sm'>Email: Adfinity@gmail.com</p>
          </div>
          <div className='flex  md:flex-row md:items-center  lg:items-start  gap-6'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg text-white mb-2'>Supports</h1>
              <ul className='leading-7'>
                <li><a href='/'>Contact</a></li>
                <li>FAQs</li>
                <li>Pricing Plans</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg text-white mb-2'>Quick Links</h1>
              <ul className='leading-7'>
                <li>About</li>
                <li>Get Membership</li>
                <li>Post a Ad</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg text-white mb-2'>Category</h1>
              <ul className='leading-7'>
                <li>Mobile</li>
                <li>Electronics</li>
                <li>Vehicles</li>
                <li>Property</li>
              </ul>
            </div>
          </div>

          <div className='text-center md:text-left'>
            <h1 className='mb-4 text-lg'>Download our app</h1>
            <div className='flex flex-col sm:flex-row gap-2 my-4 w-full sm:w-auto'>
              <div
                className='flex bg-gray-800 border-2 border-gray-400 rounded-lg overflow-hidden cursor-pointer'
                onMouseEnter={() => setIsAppleHovered(true)}
                onMouseLeave={() => setIsAppleHovered(false)}
              >
                <div className='p-3 flex items-center justify-center'>
                  <FaApple className={`text-4xl ${isAppleHovered ? 'text-green-500' : 'text-white'} transition duration-300`} />
                </div>
                <div className='flex flex-col justify-center p-2'>
                  <p className='text-[#767E94] text-sm sm:text-sm font-semibold'>Get it Now</p>
                  <span className='text-white text-xl sm:text-lg'>App Store</span>
                </div>
              </div>

              <div
                className='flex bg-gray-800 border-2 border-gray-400 rounded-lg overflow-hidden cursor-pointer'
                onMouseEnter={() => setIsGooglePlayHovered(true)}
                onMouseLeave={() => setIsGooglePlayHovered(false)}
              >
                <div className='p-3 flex items-center justify-center'>
                  <FaGooglePlay className={`text-3xl ${isGooglePlayHovered ? 'text-green-500' : 'text-white'} transition duration-300`} />
                </div>
                <div className='flex flex-col justify-center p-2'>
                  <p className='text-[#767E94] text-sm sm:text-sm font-semibold'>Get it Now</p>
                  <span className='text-white text-xl sm:text-lg'>Google Play</span>
                </div>
              </div>
            </div>

            <div className='flex flex-row gap-3 text-xl justify-center md:justify-start'>
              <div className='p-2 rounded-full hover:bg-green-500 hover:scale-110 transition-transform duration-300 cursor-pointer'>
                <FaFacebookF className='text-white' />
              </div>
              <div className='p-2 rounded-full hover:bg-green-500 hover:scale-110 transition-transform duration-300 cursor-pointer'>
                <IoLogoTwitter className='text-white' />
              </div>
              <div className='p-2 rounded-full hover:bg-green-500 hover:scale-110 transition-transform duration-300 cursor-pointer'>
                <FaInstagram className='text-white' />
              </div>
              <div className='p-2 rounded-full hover:bg-green-500 hover:scale-110 transition-transform duration-300 cursor-pointer'>
                <FaYoutube className='text-white' />
              </div>
              <div className='p-2 rounded-full hover:bg-green-500 hover:scale-110 transition-transform duration-300 cursor-pointer'>
                <FaLinkedin className='text-white' />
              </div>
              <div className='p-2 rounded-full hover:bg-green-500 hover:scale-110 transition-transform duration-300 cursor-pointer'>
                <FaWhatsapp className='text-white' />
              </div>
            </div>
          </div>
        </div>

        {/* Last section company promotion */}
        <div className='max-h-[68px] h-full w-full bg-gray-800 flex flex-col md:flex-row justify-between p-4  items-center text-gray-500 text-center md:text-left font-inter'>
          <div><p>ROWX - Classified Listing ©️ 2024. Design by RowX</p></div>
          <div className='flex flex-row gap-3'>
            <p>Privacy Policy</p>
            <div className='w-2 h-full'></div>
            <p>Terms & Condition</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
